import { cdbr_data, ed_interpolate } from "./cdbr_data.js";
import { Hoist } from "./hoist_data.js";
import Prompt from './input_helpers.cjs';

// Declarations
// Array containing all Hoist class instances
const hoists = [];


// Routine Start
// Define new hoist by user
hoists.push(new Hoist(Prompt.get_string_from_user("Hoist Name", 1, 16)))

console.log(`\nAverage Braking Power = ${hoists[0].averageBrakePower().toFixed(1)} kW`);
console.log(`Maximum Braking Power = ${hoists[0].maxBrakePower().toFixed(1)} kW`);
//console.log(`Maximum Braking Resistance = ${hoists[0].maxBrakeResistance().toFixed(1)} Ω`);
console.log(`Maximum Braking Time = ${hoists[0].maxBrakeTime()} s`);

let CR700selection = hoists[0].selectedCR700();
if ( typeof(CR700selection) != 'undefined') {
  print_cr700_selection(CR700selection, hoists[0].maxBrakeResistance(), hoists[0].averageBrakePower(), hoists[0].maxBrakePower());
}

/*let CDBRselection = hoists[0].selectedCDBR();
print_cdbr_selection(CDBRselection.cdbr, CDBRselection.qtty, CDBRselection.maxResistance, hoists[0].averageBrakePower(), hoists[0].maxBrakePower());*/

// Function to print the CR700 selection results to the console
function print_cr700_selection(cr700, maxR, aveP, maxP) {
  if ( (cr700.internalBrakeTransistor) && (maxR > cr700.minBrakeResistance) ) console.log(`\nCR700 Drive and Braking Resistor Selection`);
  else console.log(`\nCR700 Drive Selection`);
  console.log(`  Model: ${cr700.type}`);
  console.log(`  Rated Current: ${cr700.hdCurrent}A`);
  if ( (cr700.internalBrakeTransistor) && (maxR > cr700.minBrakeResistance) ) {
    console.log(`  Minimum Braking Resistance = ${(cr700.minBrakeResistance).toFixed(1)} Ω`);
    console.log(`  Maximum Braking Resistance = ${(maxR).toFixed(1)} Ω`);
    console.log(`  Continuous Resistor Power Rating = ${aveP.toFixed(1)} kW`);
    console.log(`  Peak Resistor Power Rating = ${maxP.toFixed(1)} kW`);
  }
}

// Function to print the CDBR selection results to the console
function print_cdbr_selection(cdbr, qtty, maxR, aveP, maxP) {
  console.log(`\nExternal Braking Transistor and Resistor Selection`);
  console.log(`  Model: ${cdbr.type}`);
  console.log(`  Quantity: ${qtty}`)
  console.log(`  Minimum Braking Resistance = ${(cdbr.minResistance).toFixed(1)} Ω`);
  console.log(`  Maximum Braking Resistance = ${(maxR).toFixed(1)} Ω`);
  console.log(`  Continuous Resistor Power Rating = ${aveP.toFixed(1)} kW`);
  console.log(`  Peak Resistor Power Rating = ${maxP.toFixed(1)} kW`);
}

