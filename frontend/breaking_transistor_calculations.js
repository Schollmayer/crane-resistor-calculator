// Function to determine if the allowable braking torque at the ed/brakeTime operation point for the selected CR700 is higher than application requirements
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