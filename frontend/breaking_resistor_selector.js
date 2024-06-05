import { ga700_data } from "./ga700_data.js"
import { calculateResistors } from "./breaking_resistor_calculations.js";

const calculateResistorButton = document.getElementById('calculateResistorButton');
const dutyCycle = document.getElementById('dutyCycle');
const peakPower = document.getElementById('peakPower');
const power = document.getElementById('power');
const dutyCycleDuration = document.getElementById('dutyCycleDuration');
const driveSelect = document.getElementById('driveSelect');


calculateResistorButton.addEventListener('click', calculate);


function calculate() {
    if (hasBuildInBreakingTranssitor()){
        getBestResistorCombination(getRmin(),calculateRmax(),power.value,dutyCycle.value,dutyCycleDuration.value)
    }
}

function hasBuildInBreakingTranssitor() {
    const selectedIndex = driveSelect.selectedIndex;
    return ga700_data[selectedIndex].internalBrakeTransistor;
}

function calculateRmax() {
    const selectedIndex = driveSelect.selectedIndex;
    const Rmax = (ga700_data[selectedIndex].brakeActivationVoltage * ga700_data[selectedIndex].brakeActivationVoltage) / peakPower.value;
    return Rmax;
}

function getRmin() {
    const selectedIndex = driveSelect.selectedIndex;
    const Rmin = ga700_data[selectedIndex].minBrakeResistance;
    return Rmin;
}

function getBestResistorCombination(minR, maxR, power,dutyCycle, dutyCycleDuration) {
   var results = calculateResistors(minR, maxR, power,dutyCycle, dutyCycleDuration);
   console.log("Results");
   console.log(results);
   displayObjects(results);
}

function displayObjects(objects) {
    var outputDiv = document.getElementById("output");
  
    objects.forEach(function(obj) {
      var container = document.createElement("div");
      container.classList.add("object-container");
  
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          var attribute = document.createElement("div");
          attribute.textContent = key + ": " + obj[key];
          attribute.classList.add("attribute");
          container.appendChild(attribute);
        }
      }
  
      outputDiv.appendChild(container);
    });
  }
  