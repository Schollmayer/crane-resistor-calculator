import { cdbr_data, ed_interpolate } from "./cdbr_data.js";
import {HoistFrontend } from "./hoist_data.js";
import {getEDFilteredResistors} from "./breaking_resistor_data.js";

//Define output fields

const avBrakingPowerOutput = document.getElementById('avBrakingPowerOutput');
const maxBrakingPowerOutput = document.getElementById('maxBrakingPowerOutput');
const maxBrakingResOutput = document.getElementById('maxBrakingResOutput');
const maxContBreakTimeOutput = document.getElementById('maxContBreakTimeOutput');
const cdbrOutput1 = document.getElementById('cdbrOutput1');
const cdbrOutputQuantity1 = document.getElementById('cdbrOutputQuantity1');
const minResOutput1 = document.getElementById('minResOutput1');
const maxResOutput1 = document.getElementById('maxResOutput1');
const ResQuantityOutput1 = document.getElementById('ResQuantityOutput1');
const cdbrOutput2 = document.getElementById('cdbrOutput2');
const cdbrOutputQuantity2 = document.getElementById('cdbrOutputQuantity2');
const minResOutput2 = document.getElementById('minResOutput2');
const maxResOutput2 = document.getElementById('maxResOutput2');
const ResTypOutput2 = document.getElementById('ResTypOutput2');
const ResQuantityOutput2 = document.getElementById('ResQuantityOutput2');
const calculateButton = document.getElementById('calculateButton');

function calculateResult(){
    let hoist = new HoistFrontend("Hoist1");
    let CR700selection = hoist.selectedCR700();
    let CDBRselection = hoist.selectedCDBR();
    avBrakingPowerOutput.value = hoist.averageBrakePower().toFixed(1)
    maxBrakingPowerOutput.value = hoist.maxBrakePower().toFixed(1)
    maxContBreakTimeOutput.value = hoist.maxBrakeTime().toFixed(1)

    maxBrakingResOutput.value = CDBRselection.maxResistance.toFixed(2)
    cdbrOutput1.value = CDBRselection.cdbr.type
    cdbrOutputQuantity1.value = CDBRselection.qtty

}

calculateButton.addEventListener('click', calculateResult);
// Routine Start
// Define new hoist by user

function getBestResistorCombination (minR, maxR, power, resistorList) {
    return;
  }