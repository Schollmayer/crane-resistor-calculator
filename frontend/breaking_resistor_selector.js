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
  
  // Clear previous output
  outputDiv.innerHTML = "";

  objects.forEach(function(obj, index) {
      var card = document.createElement("div");
      card.classList.add("card", "mb-3");

      var cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      var cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.textContent = `Option ${index + 1}`;
      cardBody.appendChild(cardTitle);

      var resistorTitle = document.createElement("h6");
      resistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
      resistorTitle.textContent = obj.resistors.length > 1 ? "Breaking Resistors" : "Breaking Resistor";
      cardBody.appendChild(resistorTitle);

      // Format resistors output
      var resistorCount = {};
      obj.resistors.forEach(resistor => {
          resistorCount[resistor.type] = (resistorCount[resistor.type] || 0) + 1;
      });

      for (let [type, count] of Object.entries(resistorCount)) {
          var resistorDetail = document.createElement("div");
          resistorDetail.innerHTML = `${count}x ${type}`;
          cardBody.appendChild(resistorDetail);
      }

      var detailButton = document.createElement("button");
      detailButton.classList.add("btn", "btn-primary", "mt-3");
      detailButton.textContent = "Show details";
      detailButton.addEventListener("click", function() {
          var details = document.getElementById(`details-${index}`);
          if (!details) {
              details = document.createElement("div");
              details.classList.add("mt-2");
              details.id = `details-${index}`;
              details.innerHTML = `
                  <strong>Total Resistance:</strong> ${obj.totalResistance} Ω<br>
                  <strong>Total Power:</strong> ${obj.totalPower.toFixed(2)} W<br>
                  <strong>Total Quantity:</strong> ${obj.resistors.length}
              `;
              cardBody.appendChild(details);
              detailButton.textContent = "Show less";
          } else {
              cardBody.removeChild(details);
              detailButton.textContent = "Show details";
          }
      });
      cardBody.appendChild(detailButton);

      card.appendChild(cardBody);
      outputDiv.appendChild(card);
  });
}