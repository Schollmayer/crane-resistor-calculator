import { cdbr_data, ed_interpolate } from "./cdbr_data.js";
import promptSync from 'prompt-sync';

// Declarations
const gearboxEfficiency = 0.9;
const motorEfficiency = 0.9;
const voltageClass = 400;           // Volts AC RMS
const brakeActivateVoltage = 760;   // Volts DC

// Get Input Data from User
const prompt = promptSync();
const averageMechPower = Number.parseInt(prompt('Average Mechanical Power [kW]: '));
const dutyCycle = Number.parseInt(prompt('Hoist Duty Cycle [%]: '));
const hoistHeight = Number.parseInt(prompt('Hoist Hieght [m]: '));
const hoistSpeed = Number.parseInt(prompt('Hoist Speed [m/min]: '));

let averageBrakePower = averageMechPower * gearboxEfficiency * motorEfficiency;
let maxBrakePower = averageBrakePower * 2;
let maxBrakeResistance;
let minBrakeResistance;
let maxBrakingCurrent;
let minBrakingCurrent;
let selectedCDBR;
let cdbrQuantity = 1;
let selectedEDCurve;
let Ix;                            // Allowable braking current for required time and ED%
let selectionCompleted = false;


// Routine Start
if (voltageClass === 400) maxBrakeResistance = (760 ** 2) / (maxBrakePower * 1000);
else if (voltageClass === 200) maxBrakeResistance = (380 ** 2) / (maxBrakePower * 1000);

let maxBrakeTime = (hoistHeight / hoistSpeed) * 60;

console.log(`\nAverage Braking Power = ${averageBrakePower} kW`);
console.log(`Maximum Braking Power = ${maxBrakePower} kW`);
//console.log(`Maximum Braking Resistance = ${maxBrakeResistance.toFixed(1)} Ω`);
console.log(`Maximum Braking Time = ${Math.round(maxBrakeTime)} s`);

// Is there a CDBR with the min connectable resistance less than the maximum allowable braking resistance?
if (cdbr_data.some(cdbr => cdbr.minResistance < maxBrakeResistance)) {
  // Select CDBR and verify if it is suitable for the application
  selectedCDBR = cdbr_data.find(cdbr => cdbr.minResistance < maxBrakeResistance);
  selectedEDCurve = selectedCDBR.overloadCurves.find(curve => dutyCycle <= curve.dutyCycle);
  console.log(`\nPreliminary Selection: ${selectedCDBR.type} \n\tMin Connectable Resistance = ${selectedCDBR.minResistance}`);
  maxBrakingCurrent = brakeActivateVoltage / selectedCDBR.minResistance;
  minBrakingCurrent = brakeActivateVoltage / maxBrakeResistance;

  Ix = ed_interpolate(selectedEDCurve, maxBrakeTime);
  // Ensure minBrakingCurrent < Ix < maxBrakingCurrent
  if ((maxBrakingCurrent > Ix) && (minBrakingCurrent < Ix)) {
      maxBrakingCurrent = Ix;
    // Ensure resistance still possible if 10% tolerance is considered
    if ((maxBrakeResistance - selectedCDBR.minResistance) > maxBrakeResistance * 0.1) {
      selectionCompleted = true;
      print_selection(selectedCDBR, cdbrQuantity, maxBrakeResistance, averageBrakePower, maxBrakePower);
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
      maxBrakingCurrent = brakeActivateVoltage / selectedCDBR.minResistance;
      minBrakingCurrent = brakeActivateVoltage / maxBrakeResistance;
      Ix = ed_interpolate(selectedEDCurve, maxBrakeTime);
      // Ensure minBrakingCurrent < Ix < maxBrakingCurrent
      if ((maxBrakingCurrent > Ix) && (minBrakingCurrent < Ix)) {
        maxBrakingCurrent = Ix;
        // Ensure resistance still possible if 10% tolerance is considered
        if ((maxBrakeResistance - selectedCDBR.minResistance) > maxBrakeResistance * 0.1) {
          selectionCompleted = true;
          print_selection(selectedCDBR, cdbrQuantity, maxBrakeResistance, averageBrakePower, maxBrakePower);
        }
      }
    }
    else console.log(`No alternative found, multiple CDBR units required\n`);
  }
}
// Multiple CDBRs required
if (!selectionCompleted) {
  console.log(`\nMultiple CDBR unit selection`);
  selectedCDBR = cdbr_data.find(cdbr => cdbr.type === "CDBR-4220D");
  selectedEDCurve = selectedCDBR.overloadCurves.find(curve => dutyCycle <= curve.dutyCycle);
  Ix = ed_interpolate(selectedEDCurve, maxBrakeTime);
  minBrakeResistance = brakeActivateVoltage / Ix;
  cdbrQuantity = Math.ceil(minBrakeResistance / maxBrakeResistance);
  maxBrakeResistance = cdbrQuantity * maxBrakeResistance;
  selectionCompleted = true;
  print_selection(selectedCDBR, cdbrQuantity, maxBrakeResistance, averageBrakePower, maxBrakePower);
}

// Function to select a CDBR unit according to input data
function find_cdbr(catalogue, maxBResist, maxBTime, dutyC) {
  
}


// Function to print the selection results to the console
function print_selection(cdbr, qtty, maxR, aveP, maxP) {
  console.log(`\nBraking Transistor and Resistor Selection`);
  console.log(`Type: ${cdbr.type}`);
  console.log(`Quantity: ${qtty}`)
  console.log(`Minimum Braking Resistance = ${(cdbr.minResistance * 1.05).toFixed(1)} Ω`);
  console.log(`Maximum Braking Resistance = ${(maxR * 0.95).toFixed(1)} Ω`);
  console.log(`Continuous Resistor Power Rating = ${aveP} kW`);
  console.log(`Peak Resistor Power Rating = ${maxP} kW`);
}

