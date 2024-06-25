// Function to determine if the allowable braking torque at the ed/brakeTime operation point for the selected CR700 is higher than application requirements
import { ed_interpolate } from "./cdbr_data.js";

export function checkBrakingTorque(ed, brakeTime, brakePower, driveObject, driveCurves, driveCurvesLinearAprox) {
    let tbLineAbove;
  
    let brakingTorquePercent = Math.round((brakePower / driveObject.hdPower) * 100);
    console.log(`\nRequired braking torque: ${brakingTorquePercent}% of drive rating`);
  
    // Continue verification only if the braking torque at the operation point 
    // is less than the braking torque of the lowest overload curve (Tb[%] <= 155% in case of CR700)
    if (brakingTorquePercent <= driveCurves[0].brakingTorque) {
  
      // If the braking torque at the operation point is less than the braking 
      // torque of the highest overload curve, selection is OK (Tb [%] < 70% in case of CR700)
      if (brakingTorquePercent < driveCurves[driveCurves.length - 1].brakingTorque) {
        console.log(`Allowable braking torque at operation point: >${driveCurves[driveCurves.length - 1].brakingTorque}%`);
        console.log(`Selection OK`);
        return true;
      }
  
      tbLineAbove = driveCurvesLinearAprox.find(line => {
        //console.log(`Line to be tested: tb_${line.brakingTorque}P`);
        let lineFound = false;
        lineFound = pointBelowLine(brakeTime, ed, line.slope, line.yCrossing);
        //console.log(`Line found: ${lineFound}`);
        return lineFound;
      });
      console.log(`Allowable Braking Torque: ${tbLineAbove.brakingTorque}%`);
      //return tbLineAbove.brakingTorque;
      if (brakingTorquePercent < tbLineAbove.brakingTorque) return true;
      else return false;
    }
    else return false;
  }

  // Function to select one or more CDBR braking units according to application requirements
export function findCDBR  (cdbr_data, maxBrakeResistance, maxBrakeTime, brakeActivationV, dutyCycle) {
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
    //console.log(`\nPreliminary Selection: ${selectedCDBR.type} \n\tMin Connectable Resistance = ${selectedCDBR.minResistance}`);
    maxBrakingCurrent = brakeActivationV / selectedCDBR.minResistance;
    minBrakingCurrent = brakeActivationV / maxBrakeResistance;

    Ix = ed_interpolate(selectedEDCurve, maxBrakeTime);

    // Ensure minBrakingCurrent < Ix < maxBrakingCurrent
    if ((maxBrakingCurrent > Ix) && (minBrakingCurrent < Ix)) {
      maxBrakingCurrent = Ix;
      // Ensure resistance still possible if 10% tolerance is considered
      if ((maxBrakeResistance - selectedCDBR.minResistance) > maxBrakeResistance * 0.1) {
        selectionCompleted = true;
        //console.log(`\nCDBR found on first attempt.`);
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

// Get slope and y-crossing for a given line defined by 2 points
export const getLineParameters = (x1, y1, x2, y2) => {
  const m = (y2 - y1) / (x2 - x1);     // Slope
  return {
    m,
    b: y1 - m * x1                     // Y-Crossing
  }
}

// Determine if a given point (xPoint, yPoint) is below a given line (y = mx + b)
export const pointBelowLine = (xPoint, yPoint, m, b) => {
  let yLine = m*xPoint + b;
  let deltaY = yLine - yPoint;
  //console.log(`Slope = ${m}, deltaY = ${deltaY}`);
  if (( m < 0) && (deltaY > 0)) return true;
  else if (( m > 0) && (deltaY > 0)) return true;
  else return false;
}