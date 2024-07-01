import { cdbr_data, ed_interpolate } from "../sharedFiles/cdbr_data.js";
import { HoistFrontend } from "./hoist_data.js";
import { getEDFilteredResistors } from "../sharedFiles/braking_resistor_data.js";

//Button-EventListener
const calculateButton = document.getElementById('calculateButton');
calculateButton.addEventListener('click', calculateResult);

//Define output fields

function calculateResult() {
    let hoist = new HoistFrontend("Hoist1");
    let [CR700selection, useInternalBreakingTransistor] = hoist.selectedCR700(); 
    console.log(`Use Internal : ${useInternalBreakingTransistor}%`);
    console.log(`CR700 : ${CR700selection}%`);

    if (CR700selection) {
        if (useInternalBreakingTransistor){
            
        }
        
        else {
            
        }
    }
    else {
        //TODO Add Error message for no CR700 found
    }


    /*avBrakingPowerOutput.value = hoist.averageBrakePower().toFixed(1)
    maxBrakingPowerOutput.value = hoist.maxBrakePower().toFixed(1)
    maxContBreakTimeOutput.value = hoist.maxBrakeTime().toFixed(1)
    maxBrakingResOutput.value = CDBRselection.maxResistance.toFixed(2)
    cdbrOutput1.value = CDBRselection.cdbr.type
    */
    //cdbrOutputQuantity1.value = CDBRselection.qtty

}


// Routine Start
// Define new hoist by user

function getBestResistorCombination(minR, maxR, power, resistorList) {
    return;
}