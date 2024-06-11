import { ga700_data } from "./ga700_data.js"
import { calculateResistors } from "./breaking_resistor_calculations.js";
import { checkBrakingTorque } from "./breaking_transistor_calculations.js";
import { cr700_data, cr700OLCurves, getAllowableED, findBrakeCurveSegment, cr700OLLinear } from "./cr700_data.js";

const calculateResistorButton = document.getElementById('calculateResistorButton');
const dutyCycle = document.getElementById('dutyCycle');
const peakPower = document.getElementById('peakPower');
const power = document.getElementById('power');
const dutyCycleDuration = document.getElementById('dutyCycleDuration');
const driveSelect = document.getElementById('driveSelect');

calculateResistorButton.addEventListener('click', function(){
  var form = document.getElementById('breakingDataInputForm');
  if (form.checkValidity()) {
      calculate();
  }
  else {
    form.reportValidity(); // This will trigger the browser's built-in validation messages
}
});

function calculate() {
  performAndDisplayCalculations(getRmin(ga700_data), calculateRmax(ga700_data), power.value, dutyCycle.value, dutyCycleDuration.value);
}

function calculateRmax(driveData) {
  const Rmax = (getSelectedResistor(driveData).brakeActivationVoltage * getSelectedResistor(driveData).brakeActivationVoltage) / peakPower.value;
  return Rmax;
}

function getRmin(driveData) {
  const Rmin = getSelectedResistor(driveData).minBrakeResistance;
  return Rmin;
}

function getSelectedResistor(driveData) {
  return driveData[driveSelect.selectedIndex];
}

function hasTheBiggerDriveABreakingTransistor(driveData) {
  return driveData[driveSelect.selectedIndex + 1].internalBrakeTransistor;
}

function performAndDisplayCalculations(minR, maxR, power, dutyCycle, dutyCycleDuration) {
  clearOutput();
  showSpinner();

  if (getSelectedResistor(ga700_data).internalBrakeTransistor) {
    if (checkBrakingTorque(dutyCycle, dutyCycleDuration, power, getSelectedResistor(ga700_data), cr700OLCurves, cr700OLLinear)) {
      setTimeout(() => {
        var resistorResults = calculateResistors(minR, maxR, power, dutyCycle, dutyCycleDuration);
        hideSpinner();
        displayResistorSelection(resistorResults);
      }, 20);
    }
    else {
      if (hasTheBiggerDriveABreakingTransistor(ga700_data)) {
        outputBreakingTransistorError()
        hideSpinner();
      }
      else {
        outputSameDriveWithBreakingResistor();
      }
    }
  }
  outputExternalBreakingTransistor()
}

function outputSameDriveWithBreakingResistor() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>Internal breaking transisor not sufficient for desired breaking power.</h3>
  <h4>The next higher dimensioned drive does not have an internal breaking transistor.
  Please use an external breaking transistor with the suggested resistor combination.</h4>`
}

function outputExternalBreakingTransistor() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>The selected drive does not have a integrated breaking transistor.</h3>
  <h4>Please use an external breaking transistor with the suggested resistor combination.</h4>`
}

function outputBreakingTransistorError() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>Internal breaking transisor not sufficient for desired breaking power.</h3>
  <h4>Please pick a higher dimensioned drive.</h4>`
}

function clearOutput() {
  var outputDiv = document.getElementById("output");
  // Clear previous output
  outputDiv.innerHTML = "";
}

/**Show spinner animation to indicate loading. */
function showSpinner() {
  document.getElementById('spinner').style.display = 'block';
}

/**Hide spinner animation. */
function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
}

function displayResistorSelection(objects) {
  var outputDiv = document.getElementById("output");
  objects.forEach(function (obj, index) {
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
    detailButton.addEventListener("click", function () {
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