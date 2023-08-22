// Imports
import { cdbr_data, ed_interpolate } from "./cdbr_data.js";
import { cr700_data, cr700OLCurves, getAllowableED, findBrakeCurveSegment, cr700OLLinear } from "./cr700_data.js";
import { pointBelowLine } from "./helpers.js";
import Prompt from './input_helpers.cjs';

// Declarations
export class Hoist {
  constructor(hoistName) {
    this.hoistName = hoistName;

    this.voltageClass = 400;            // Drive voltage class
    this.brakeActivateVoltage = 760;    // Braking transistor activation voltage (DC)

    // Get motor rated current in Ampere. Range [1 - 2000] A
    this.motorRatedCurrent = Prompt.get_variable_from_user(`Motor Rated Current`, `A`, 1, 605);

    // Get average mechanical power in kilowatt. Range [1-1000] kW
    this.averageMechPower = Prompt.get_variable_from_user(`Average Mechanical Power`, `kW`, 1, 315);

    // Get motor efficiency in percent. Range [70-99] %
    this.motorEfficiency = Prompt.get_variable_from_user(`Motor Efficiency`, `%`, 70, 99) / 100;

    // Get gearbox efficiency in percent. Range [70-99] %
    this.gearboxEfficiency = Prompt.get_variable_from_user(`Gearbox Efficiency`, `%`, 70, 99) / 100;

    // Get duty cycle in percent. Range [10 - 40] %
    this.dutyCycle = Prompt.get_variable_from_user(`Duty Cycle`, `%`, 10, 40);

    // Get hoist height in meters. Range [1 - 200] m
    this.hoistHeight = Prompt.get_variable_from_user(`Hoist Height`, `m`, 1, 200);

    // Get hoist speed in meters per minute. Range [1 - 50] m/min
    this.hoistSpeed = Prompt.get_variable_from_user(`Hoist Speed`, `m/min`, 1, 50);
  }
  averageBrakePower() {
    return this.averageMechPower * this.motorEfficiency * this.gearboxEfficiency;
  }
  maxBrakePower() {
    return this.averageBrakePower() * 2;
  }
  maxBrakeTime() {
    return Math.round((this.hoistHeight / this.hoistSpeed) * 60);
  }
  maxBrakeResistance() {
    return (this.brakeActivateVoltage ** 2) / (this.maxBrakePower() * 1000);
  }
  selectedCDBR() {
    return findCDBR(this.maxBrakeResistance(), this.maxBrakeTime(), this.brakeActivateVoltage, this.dutyCycle);
  }
  selectedCR700() {
    return findCR700(this.motorRatedCurrent, this.averageBrakePower(), this.maxBrakeResistance(), this.maxBrakeTime(), this.dutyCycle);
  }
}

// Functions

// Function to select one or more CDBR braking units according to application requirements
const findCDBR = (maxBrakeResistance, maxBrakeTime, brakeActivationV, dutyCycle) => {
  let selectedCDBR;
  let selectedEDCurve;
  let maxBrakingCurrent;
  let minBrakingCurrent;
  let Ix;
  let selectionCompleted = false;

  // Is there a CDBR with the min connectable resistance less than the maximum allowable braking resistance?
  if (cdbr_data.some(cdbr => cdbr.minResistance < maxBrakeResistance)) {
    // Select CDBR and verify if it is suitable for the application
    selectedCDBR = cdbr_data.find(cdbr => cdbr.minResistance < maxBrakeResistance);
    selectedEDCurve = selectedCDBR.overloadCurves.find(curve => dutyCycle <= curve.dutyCycle);
    console.log(`\nPreliminary Selection: ${selectedCDBR.type} \n\tMin Connectable Resistance = ${selectedCDBR.minResistance}`);
    maxBrakingCurrent = brakeActivationV / selectedCDBR.minResistance;
    minBrakingCurrent = brakeActivationV / maxBrakeResistance;

    Ix = ed_interpolate(selectedEDCurve, maxBrakeTime);

    // Ensure minBrakingCurrent < Ix < maxBrakingCurrent
    if ((maxBrakingCurrent > Ix) && (minBrakingCurrent < Ix)) {
      maxBrakingCurrent = Ix;
      // Ensure resistance still possible if 10% tolerance is considered
      if ((maxBrakeResistance - selectedCDBR.minResistance) > maxBrakeResistance * 0.1) {
        selectionCompleted = true;
        console.log(`\nCDBR found on first attempt.`);
        return {
          cdbr: selectedCDBR,
          qtty: 1,
          maxResistance: maxBrakeResistance
        };
      }
    }

    // Preliminary CDBR selection too small
    if (!selectionCompleted) {
      console.log(`\nPreliminary selection too small, calculating alternative`);
      // Check if a larger CDBR is available
      if (cdbr_data.some(cdbr => cdbr.minResistance < selectedCDBR.minResistance)) {
        selectedCDBR = cdbr_data.find(cdbr => cdbr.minResistance < selectedCDBR.minResistance);
        selectedEDCurve = selectedCDBR.overloadCurves.find(curve => dutyCycle <= curve.dutyCycle);
        console.log(`\nAlternative Selection: ${selectedCDBR.type} \n\tMin Connectable Resistance = ${selectedCDBR.minResistance}`);
        maxBrakingCurrent = brakeActivationV / selectedCDBR.minResistance;
        minBrakingCurrent = brakeActivationV / maxBrakeResistance;
        Ix = ed_interpolate(selectedEDCurve, maxBrakeTime);
        // Ensure minBrakingCurrent < Ix < maxBrakingCurrent
        if ((maxBrakingCurrent > Ix) && (minBrakingCurrent < Ix)) {
          maxBrakingCurrent = Ix;
          // Ensure resistance still possible if 10% tolerance is considered
          if ((maxBrakeResistance - selectedCDBR.minResistance) > maxBrakeResistance * 0.1) {
            selectionCompleted = true;
            console.log(`\nCDBR found on second attempt.`);
            return {
              cdbr: selectedCDBR,
              qtty: 1,
              maxResistance: maxBrakeResistance
            };
          }
        }
      }
      else console.log(`\nNo alternative found, multiple CDBR units required\n`);
    }
  }

  // Multiple CDBRs required
  if (!selectionCompleted) {
    selectedCDBR = cdbr_data.find(cdbr => cdbr.type === "CDBR-4220D");
    selectedEDCurve = selectedCDBR.overloadCurves.find(curve => dutyCycle <= curve.dutyCycle);
    Ix = ed_interpolate(selectedEDCurve, maxBrakeTime);
    let resistance = brakeActivationV / Ix;
    let cdbrQuantity = Math.ceil(resistance / maxBrakeResistance);
    maxBrakeResistance = cdbrQuantity * maxBrakeResistance;
    selectionCompleted = true;
    console.log(`\nMultiple CDBRs selected.`);
    return {
      cdbr: selectedCDBR,
      qtty: cdbrQuantity,
      maxResistance: maxBrakeResistance
    };
  }
}


// Function to select CR700 drive according to application motoring and braking requirements
const findCR700 = (motorRatedCurrent, avBrakePower, maxBrakeResistance, maxBrakeTime, dutyCycle) => {
let selectedCR700;
  
  // Initial CR700 selection according to motor rated current and mininmum connectable braking resistance (including 5% tolerance). Braking resistance considered only if CR700 has internal braking transistor
  if (motorRatedCurrent <= 150) {
    selectedCR700 = cr700_data.find(cr700 => { 
      if ((cr700.hdCurrent >= motorRatedCurrent) && ((cr700.minBrakeResistance*1.05) < maxBrakeResistance)) return true;
      /*if ( cr700.hdCurrent >= motorRatedCurrent ) return true;*/
    });
  }
  // If motor rated current is higher than largest CR700 with internal braking transistor, or if previous step did not find a suitable CR700 drive, do not use braking resistance as selection criteria
  if ((motorRatedCurrent > 150) || (typeof(selectedCR700) === 'undefined')) {
    selectedCR700 = cr700_data.find(cr700 => { 
      if (cr700.hdCurrent >= motorRatedCurrent) return true;
    });
    return selectedCR700;
  }
  console.log(`Initial selection is ${selectedCR700.type}`);

  if (selectedCR700.internalBrakeTransistor) {
  
    /*let brakingTorquePercent = Math.round((avBrakePower / selectedCR700.hdPower) * 100);
    console.log(`Required braking torque: ${brakingTorquePercent}% of drive rating`);
  
    // Continue verification only if the braking torque at the operation point 
      // is less than the braking torque of the lowest overload curve (Tb[%] <= 155% in case of CR700)
    if (brakingTorquePercent <= cr700OLCurves[0].brakingTorque) {
      
      // If the braking torque at the operation point is less than the braking 
        // torque of the highest overload curve, selection is OK (Tb [%] < 70% in case of CR700)
      if (brakingTorquePercent < cr700OLCurves[cr700OLCurves.length-1].brakingTorque) {
        console.log(`Initial selection OK`);
        return selectedCR700;
      }
      
      // Otherwise, check if allowable braking torque at operation torque is higher than the required braking torque
        // Determine the allowable braking torque at the operation point
      let allowedBrakingTorque = allowableBrakingTorque (dutyCycle, maxBrakeTime);
      console.log(`Allowed braking torque at operation point: ${allowedBrakingTorque}%`);
     
      // If the allowable braking torque at the operation point is in range, selection is OK
        // Backlog: verify that CR700 selection is still OK after considering resistor tolerance of 5%
      if (allowedBrakingTorque > brakingTorquePercent) {
        console.log(`Initial selection OK`);
        return selectedCR700;
      }*/

      if ( checkBrakingTorque(dutyCycle, maxBrakeTime, avBrakePower, selectedCR700) ) return selectedCR700;
      
      // Backlog: check if larger CR700 is available that can handle application requirements
      console.log(`Selected CR700 too small.`);
      return false;
  }
  else {
  console.log(`Selected CR700 too small.`);
  return false;
  }
}

// Function to determine if the allowable braking torque at the ed/brakeTime operation point for the selected CR700 is higher than application requirements
function checkBrakingTorque (ed, brakeTime, brakePower, cr700) {
  let tbLineAbove;

  let brakingTorquePercent = Math.round((brakePower / cr700.hdPower) * 100);
  console.log(`Required braking torque: ${brakingTorquePercent}% of drive rating`);

  // Continue verification only if the braking torque at the operation point 
      // is less than the braking torque of the lowest overload curve (Tb[%] <= 155% in case of CR700)
  if (brakingTorquePercent <= cr700OLCurves[0].brakingTorque) {
      
    // If the braking torque at the operation point is less than the braking 
      // torque of the highest overload curve, selection is OK (Tb [%] < 70% in case of CR700)
    if (brakingTorquePercent < cr700OLCurves[cr700OLCurves.length-1].brakingTorque) {
      console.log(`Allowable Braking Torque: >${cr700OLCurves[cr700OLCurves.length-1].brakingTorque}%`);
      console.log(`Initial selection OK`);
      return true;
    }
  
    tbLineAbove = cr700OLLinear.find ( line => {
      console.log(`Line to be tested: tb_${line.brakingTorque}P`);
      let lineFound = false;
      lineFound = pointBelowLine(brakeTime, ed, line.slope, line.yCrossing);
      console.log(`Line found: ${lineFound}`);
      return lineFound;
    });
    console.log(`Allowable Braking Torque; ${tbLineAbove.brakingTorque}%`);
    //return tbLineAbove.brakingTorque;
    if ( brakingTorquePercent < tbLineAbove.brakingTorque) return true;
    else return false;
  }
  else return false;
}

/*let cr700Select = findCR700(60, 33, 9, 200, 30);
console.log(cr700Select);*/