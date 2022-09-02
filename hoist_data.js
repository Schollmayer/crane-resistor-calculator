// Imports
import { cdbr_data, ed_interpolate } from "./cdbr_data.js";
import { cr700_data, cr700OLCurves } from "./cr700_data.js";
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

    // Get duty cycle in percent. Range [1 - 40] %
    this.dutyCycle = Prompt.get_variable_from_user(`Duty Cycle`, `%`, 1, 40);

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
    return ((this.brakeActivateVoltage ** 2) / (this.maxBrakePower() * 1000)).toFixed(1);
  }
  selectedCDBR() {
    return findCDBR(this.maxBrakeResistance(), this.maxBrakeTime(), this.brakeActivateVoltage, this.dutyCycle);
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
const findCR700 = (motorRatedCurrent, avMechPower, maxBrakeResistance, maxBrakeTime, dutyCycle) => {
  let tbCurveAbove;
  let tbCurveBelow;

  // Initial CR700 selection according to motor rated current
  let selectedCR700 = cr700_data.find(cr700 => cr700.hdCurrent >= motorRatedCurrent);
  console.log(`Initial selection is ${selectedCR700.type}`);

  let brakingTorquePercent = Math.round((avMechPower / selectedCR700.hdPower) * 100);
  console.log(brakingTorquePercent);

  // Ensure that minimum connectable resistance is less than then max allowed resistance
  if ((selectedCR700.minBrakeResistance < maxBrakeResistance) && (brakingTorquePercent <= 150)) {
    if (cr700OLCurves.some(curve => !(curve.brakingTorque <= brakingTorquePercent))) {
      console.log(`Initial selection OK`);
      return selectedCR700;
    }
    else {
      tbCurveBelow = cr700OLCurves.find(curve => curve.brakingTorque >= brakingTorquePercent);
      tbCurveAbove = cr700OLCurves.find(curve => curve.brakingTorque <= brakingTorquePercent);
      console.log(tbCurveBelow, tbCurveAbove);
    }
  }

}

findCR700(100, 37, 10, 50, 30);