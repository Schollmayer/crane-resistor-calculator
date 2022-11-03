// Imports
import { cdbr_data, ed_interpolate } from "./cdbr_data.js";
import { cr700_data, cr700OLCurves, getAllowableED, findBrakeCurveSegment } from "./cr700_data.js";
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
  let tbCurveAbove;
  let tbCurveBelow;

  // Initial CR700 selection according to motor rated current and mininmum connectable braking resistance
  let selectedCR700 = cr700_data.find(cr700 => { 
    if ((cr700.hdCurrent >= motorRatedCurrent) && (cr700.minBrakeResistance < maxBrakeResistance)) return true;
  });
  console.log(`Initial selection is ${selectedCR700.type}`);

  let brakingTorquePercent = Math.round((avBrakePower / selectedCR700.hdPower) * 100);
  console.log(`Required Braking Torque: ${brakingTorquePercent}% of drive rating`);

  // Continue verification only if the braking torque at the operation point 
    // is less than the braking torque of the lowest overload curve
  if (brakingTorquePercent <= cr700OLCurves[0].brakingTorque) {
    // If the braking torque at the operation point is less than the braking 
      // torque of the highest overload curve, selection is OK
    if (brakingTorquePercent < cr700OLCurves[cr700OLCurves.length-1].brakingTorque) {
      console.log(`Initial selection OK`);
      return selectedCR700;
    }
    // Determine the allowable braking torque at the operation point
    tbCurveAbove = cr700OLCurves.find(curve => {
      console.log(`Curve to be tested: tb_${curve.brakingTorque}Percent`)
      let curveFound = false;
      for (let i = 0; i < curve.brakeTime.length; i++) {
        if ((maxBrakeTime < curve.brakeTime[i]) && (dutyCycle < curve.dutyCycle[i-1])) {
          let allowedDutyCycle = getAllowableED(curve, maxBrakeTime);
          if (dutyCycle < allowedDutyCycle) {
            curveFound = true;
            break;
          }
        }
      }
      console.log(`Curve found: ${curveFound}`);
      if (curveFound) return true;
      else return false;
    });
    console.log(tbCurveAbove);
    // Backlog: determine actual allowable braking torque at the ed/brakeTime operation point
    const allowedBrakingTorque = allowableBrakingTorque(tbCurveAbove, dutyCycle, maxBrakeTime);
    console.log(`Allowed Braking Torque = ${allowedBrakingTorque.toFixed(1)}`);
    // If the allowable braking torque at the operation point is in range, selection is OK
    if (allowedBrakingTorque < brakingTorquePercent) {
      console.log(`Initial selection OK`);
      return selectedCR700;
    }
    console.log(`Selected CR700 too small.`);
    return false;
  }
  else {
    console.log(`Selected CR700 too small.`);
    return false;
  }
}

// Function to determine the actual allowable braking torque at the ed/brakeTime operation point
function allowableBrakingTorque (tb_curveAbove, ed, brakeTime) {
  // Backlog: verify the line is not horizontal or vertical
  
  // (1)Get slope of closest segment of braking curve above operation point
  const brakeCurveSegment = findBrakeCurveSegment(tb_curveAbove, brakeTime);
  console.log(`Original line: y = ${brakeCurveSegment.slope.toFixed(2)}*x + ${brakeCurveSegment.yCrossing.toFixed(1)}`)
  // (2) Perpendicular line to braking curve segment that passes through operation point
  const perpendicularSlope = -(1/brakeCurveSegment.slope);      // perpendicularSlope = -1/m
  const yCrossPerpLine = ed - perpendicularSlope * brakeTime    // y = mx + b  ==> b = y - mx
  console.log(`Perpendicular line: y = ${perpendicularSlope.toFixed(1)}*x + ${yCrossPerpLine.toFixed(1)}`)
  // (3) Select point for parallel line from braking curve below operation point
  const tb_curveBelow = cr700OLCurves[cr700OLCurves.findIndex(curve => curve.brakingTorque === tb_curveAbove.brakingTorque) -1];
  const timeIndexCurveBelow = [tb_curveBelow.brakeTime.findIndex(time => time > brakeTime)];
  const closestPointCurveBelow = [tb_curveBelow.brakeTime[timeIndexCurveBelow], tb_curveBelow.dutyCycle[timeIndexCurveBelow]];
  console.log(`Closest point in braking curve below: [${closestPointCurveBelow}]`);
  // (4) Parallel line to braking curve segment that passes through closest point on braking curve below
  const yCrossParLine = closestPointCurveBelow[1] - brakeCurveSegment.slope * closestPointCurveBelow[0];
  console.log(`Parallel line: y = ${brakeCurveSegment.slope.toFixed(1)}*x + ${yCrossParLine.toFixed(1)}`)
  // (5) Distance between parallel lines
    // (5-1) Intersection between (1) and (2)
  const point1_x = (yCrossPerpLine - brakeCurveSegment.yCrossing) / (brakeCurveSegment.slope - perpendicularSlope);
  const point1_y = perpendicularSlope * point1_x + yCrossPerpLine;
  if (point1_y != brakeCurveSegment.slope * point1_x + brakeCurveSegment.yCrossing) console.log(`Calculation error`);
    // (5-2) Intersection between (2) and (4)
  const point2_x = (yCrossParLine - yCrossPerpLine) / (perpendicularSlope - brakeCurveSegment.slope);
  const point2_y = perpendicularSlope * point2_x + yCrossPerpLine;    // Solve y = mx + b
  if (point2_y != brakeCurveSegment.slope * point2_x + yCrossParLine) console.log(`Calculation error`);
    // (5-3) Use distance formula
  const distanceBetwBrakeCurves = Math.sqrt(Math.pow(point2_y - point1_y, 2) + Math.pow(point2_x - point1_x, 2));
  console.log(`Distance between curves ${distanceBetwBrakeCurves.toFixed(2)}`);
  // (6) Divide segment in parts depending on braking torque between curve below and above
  const brakeTorqueDifference = tb_curveBelow.brakingTorque - tb_curveAbove.brakingTorque;
  const distanceBetwPoints = distanceBetwBrakeCurves / brakeTorqueDifference;
  const brakingTorquePoints = [];
  for (let i = 0; i < brakeTorqueDifference; i++) {
    brakingTorquePoints.push(
      {
        brakingTorque: tb_curveAbove.brakingTorque + i,
        brakingTime: point1_x - ((distanceBetwPoints*i*(point1_x-point2_x)) / distanceBetwBrakeCurves),
        ed: point1_y - ((distanceBetwPoints*i*(point1_y-point2_y)) / distanceBetwBrakeCurves)
      });
  }
  console.log(brakingTorquePoints);
  return 80;
  
}