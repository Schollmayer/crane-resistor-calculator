import { calculateResistors } from "./breaking_resistor_calculations.js";
import { checkBrakingTorque, findCDBR } from "./breaking_transistor_calculations.js";
import { ga700_data, ga700OLCurves, ga700OLLinear } from "./ga700_data.js";

const calculateResistorButton = document.getElementById('calculateResistorButton');
const dutyCycle = document.getElementById('dutyCycle');
const peakPower = document.getElementById('peakPower');
const power = document.getElementById('power');
const dutyCycleDuration = document.getElementById('dutyCycleDuration');
const driveSelect = document.getElementById('driveSelect');

calculateResistorButton.addEventListener('click', function () {
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
  const Rmax = (getSelectedResistor(driveData).brakeActivationVoltage * getSelectedResistor(driveData).brakeActivationVoltage) / (peakPower.value * 1000);
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

function getMaxBreakTime(dutyCycle, dutyCycleDuration) {
  return ((dutyCycle / 100) * dutyCycleDuration);
}

function performAndDisplayCalculations(minR, maxR, power, dutyCycle, dutyCycleDuration) {
  clearOutput();
  showSpinner();

  if (getSelectedResistor(ga700_data).internalBrakeTransistor) {
    if (checkBrakingTorque(dutyCycle, getMaxBreakTime(dutyCycle, dutyCycleDuration), power, getSelectedResistor(ga700_data), ga700OLCurves, ga700OLLinear)) {
      setTimeout(() => {
        var resistorResults = calculateResistors(minR, maxR, power, dutyCycle, dutyCycleDuration);
        hideSpinner();
        if (resistorResults) {
          displayResistorTransistorSelection(resistorResults, null);
        }
        else {
          displayNoResistorFoundError(minR, maxR, power, null);
        }
      }, 20);
    }
    else {
      if (hasTheBiggerDriveABreakingTransistor(ga700_data)) {
        outputBreakingTransistorError()
        hideSpinner();
      }
      else {
        var selectedCDBR = findCDBR(maxR, getMaxBreakTime(dutyCycle, dutyCycleDuration), getSelectedResistor(ga700_data).brakeActivationVoltage, dutyCycle)
        if (selectedCDBR) {
          outputSameDriveWithBreakingTransistor();
          setTimeout(() => {
            var resistorResults = calculateResistors(selectedCDBR.cdbr.minResistance, maxR, power, dutyCycle, dutyCycleDuration);
            hideSpinner();
            if (resistorResults) {
              displayResistorTransistorSelection(resistorResults, selectedCDBR);
            }
            else {
              displayNoResistorFoundError(minR, maxR, power, selectedCDBR);
            }
          }, 20);
        }
        else {
          noTransistorFound();
        }
      }
    }
  }
  else {
    var selectedCDBR = findCDBR(maxR, getMaxBreakTime(dutyCycle, dutyCycleDuration), getSelectedResistor(ga700_data).brakeActivationVoltage, dutyCycle)
    if (selectedCDBR) {
      outputExternalBreakingTransistor()
      setTimeout(() => {
        var resistorResults = calculateResistors(selectedCDBR.cdbr.minResistance, maxR, power, dutyCycle, dutyCycleDuration);
        hideSpinner();
        if (resistorResults) {
          displayResistorTransistorSelection(resistorResults, selectedCDBR);
        }
        else {
          displayNoResistorFoundError(selectedCDBR.cdbr.minResistance, maxR, power, selectedCDBR);
        }
      }, 20);
    }
    else {
      noTransistorFound();
    }
  }
}

function noTransistorFound() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>No product found which matches the desired specifications.</h3>
  <h4>Unfortunately there is no product in our catalog which matches the desired specifications.</h4>`
}

function outputSameDriveWithBreakingTransistor() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>The internal breaking transistor is not sufficient for desired breaking power.</h3>
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
  <h3>Internal breaking transistor not sufficient for desired breaking power.</h3>
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

function displayNoResistorFoundError(minR, maxR, power, transistorResults) {
  var outputDiv = document.getElementById("output");
  var card = document.createElement("div");
  card.classList.add("card", "mb-3");

  var cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  var cardTitle = document.createElement("h5");
  cardTitle.classList.add("card-title");
  cardTitle.textContent = `Unfortunately there is no fitting resistor combination in our portfolio.`;
  cardBody.appendChild(cardTitle);

  var resistorContainer = document.createElement("div");
  var resistorTitle = document.createElement("h6");
  resistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
  resistorTitle.textContent = "Please find a suitable resistor with the following specification from a supplier.";
  resistorContainer.appendChild(resistorTitle);
  var resistorDetail = document.createElement("div");
  resistorDetail.innerHTML = `<b>Rmin:</b> ${minR.toFixed(2)}&#8486;<br><b>Rmax:</b> ${maxR.toFixed(2)}&#8486;<br><b>Power:</b> ${power}kW`;
  resistorContainer.appendChild(resistorDetail);
  cardBody.appendChild(resistorContainer);

  // Transistor container
  if (transistorResults) {
    var transistorContainer = document.createElement("div");
    transistorContainer.style.marginTop = "20px"; // Adding some space between resistor and transistor details
    var transistorTitle = document.createElement("h6");
    transistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
    transistorTitle.textContent = "External breaking transistor";
    transistorContainer.appendChild(transistorTitle);

    var transistorDetail = document.createElement("div");
    transistorDetail.innerHTML = `${transistorResults.qtty}x ${transistorResults.cdbr.type}`;
    transistorContainer.appendChild(transistorDetail);

    cardBody.appendChild(transistorContainer);
  }

  card.appendChild(cardBody);
  outputDiv.appendChild(card);
}

function displayResistorTransistorSelection(resistorResults, transistorResults) {
  var outputDiv = document.getElementById("output");
  resistorResults.forEach(function (obj, index) {
    var card = document.createElement("div");
    card.classList.add("card", "mb-3");

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = `Option ${index + 1}`;
    cardBody.appendChild(cardTitle);

    var flexContainer = document.createElement("div");
    flexContainer.style.display = "flex";
    flexContainer.style.justifyContent = "flex-start";
    cardBody.appendChild(flexContainer);

    var resistorContainer = document.createElement("div");
    var resistorTitle = document.createElement("h6");
    resistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
    resistorTitle.textContent = obj.qtty > 1 ? "Breaking Resistors" : "Breaking Resistor";
    resistorContainer.appendChild(resistorTitle);

    // Format resistors output
    var resistorDetail = document.createElement("div");
    resistorDetail.innerHTML = `${obj.quantity}x ${obj.resistor.type}`;
    resistorContainer.appendChild(resistorDetail);

    flexContainer.appendChild(resistorContainer);

    // Transistor container
    if (transistorResults) {
      var transistorContainer = document.createElement("div");
      transistorContainer.style.marginLeft = "20px"; // Adding some space between resistor and transistor details
      var transistorTitle = document.createElement("h6");
      transistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
      transistorTitle.textContent = "External breaking transistor";
      transistorContainer.appendChild(transistorTitle);

      var transistorDetail = document.createElement("div");
      transistorDetail.innerHTML = `${transistorResults.qtty}x ${transistorResults.cdbr.type}`;
      transistorContainer.appendChild(transistorDetail);

      flexContainer.appendChild(transistorContainer);
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
                  <strong>Total Power:</strong> ${obj.totalPower.toFixed(2)} kW<br>
                  <strong>Total Quantity:</strong> ${obj.quantity}
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


