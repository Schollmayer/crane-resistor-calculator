import { calculateResistors } from "./braking_resistor_calculations.js";
import { checkBrakingTorque, findCDBR } from "./braking_transistor_calculations.js";
import { ga700_data, ga700OLCurves_higher_0_75_kW, ga700OLLinear, ga700OLCurves_smaller_0_75_kW, ga700OLLinear_smaller_0_75_kW } from "./ga700_data.js";
import { cdbr_data } from "./cdbr_data.js";

const calculateResistorButton = document.getElementById('calculateResistorButton');
const dutyCycle = document.getElementById('dutyCycle');
const peakPower = document.getElementById('peakPower');
const power = document.getElementById('power');
const dutyCycleDuration = document.getElementById('dutyCycleDuration');
const driveSelect = document.getElementById('driveSelect');

calculateResistorButton.addEventListener('click', function () {
  var form = document.getElementById('brakingDataInputForm');
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
  const Rmax = (getSelectedDrive(driveData).brakeActivationVoltage * getSelectedDrive(driveData).brakeActivationVoltage) / (peakPower.value * 1000);
  return Rmax;
}

function getRmin(driveData) {
  const Rmin = getSelectedDrive(driveData).minBrakeResistance;
  return Rmin;
}

function getSelectedDrive(driveData) {
  return driveData[driveSelect.selectedIndex - 1];
}

function getTransistorCurves(outputPower) {
  if (outputPower < 0.75) {
    return ga700OLCurves_smaller_0_75_kW;
  }

  else {return ga700OLCurves_higher_0_75_kW;} 
}

function getTransistorLinearCurves (outputPower){
  if (outputPower < 0.75) { 
    return ga700OLLinear_smaller_0_75_kW;
  }
  else {
    return ga700OLLinear;
  }
}

function hasTheBiggerDriveABrakingTransistor(driveData) {
  return driveData[driveSelect.selectedIndex + 1].internalBrakeTransistor;
}

function getMaxBreakTime(dutyCycle, dutyCycleDuration) {
  return ((dutyCycle / 100) * dutyCycleDuration);
}

function getBiggerCDBR(cdbr, cdbr_data) {
  // Find the index of the target element
  const index = cdbr_data.indexOf(cdbr.cdbr);
  // Check if the target element is found and if there is a next element
  if (index !== -1 && index < cdbr_data.length - 1) {
    return {
      cdbr: cdbr_data[index + 1],
      qtty: 1,
      maxResistance: cdbr.maxBrakeResistance
    };
  } else {
    return null;
  }
}


function performAndDisplayCalculations(minR, maxR, power, dutyCycle, dutyCycleDuration) {
  clearOutput();
  var gaCurves = getTransistorCurves(getSelectedDrive(ga700_data).hdPower);
  var gaLinearCurves = getTransistorLinearCurves(getSelectedDrive(ga700_data).hdPower);

  if (getSelectedDrive(ga700_data).internalBrakeTransistor) {
    if (checkBrakingTorque(dutyCycle, getMaxBreakTime(dutyCycle, dutyCycleDuration), power, getSelectedDrive(ga700_data), gaCurves, gaLinearCurves)) {
      var resistorResults = calculateResistors(minR, maxR, power, dutyCycle, dutyCycleDuration);
      if (resistorResults) {
        displayResistorTransistorSelection(resistorResults, null);
      }
      else {
        displayNoResistorFoundError(minR, maxR, power, null);
      }
    }
    else {
      if (hasTheBiggerDriveABrakingTransistor(ga700_data)) {
        outputBrakingTransistorError()
      }
      else {
        var selectedCDBR = findCDBR(cdbr_data, maxR, getMaxBreakTime(dutyCycle, dutyCycleDuration), getSelectedDrive(ga700_data).brakeActivationVoltage, dutyCycle)
        if (selectedCDBR) {
          outputSameDriveWithBrakingTransistor();
          var resistorResults = calculateResistors(selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, dutyCycle, dutyCycleDuration);
          if (resistorResults) {
            displayResistorTransistorSelection(resistorResults, selectedCDBR);
          }
          else {
            var biggerCDBR = getBiggerCDBR(selectedCDBR, cdbr_data);
            if (biggerCDBR) {
              resistorResults = calculateResistors(biggerCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, dutyCycle, dutyCycleDuration);
              if (resistorResults) {
                displayResistorTransistorSelection(resistorResults, biggerCDBR);
              }
              else {
                displayNoResistorFoundError(selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, selectedCDBR);
              }
            }
            else {
              displayNoResistorFoundError(selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, selectedCDBR);
            }
          }
        }
        else {
          noTransistorFound();
        }
      }
    }
  }
  else {
    var selectedCDBR = findCDBR(cdbr_data, maxR, getMaxBreakTime(dutyCycle, dutyCycleDuration), getSelectedDrive(ga700_data).brakeActivationVoltage, dutyCycle)
    if (selectedCDBR) {
      outputExternalBrakingTransistor()
      var resistorResults = calculateResistors(selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, dutyCycle, dutyCycleDuration);
      if (resistorResults) {
        displayResistorTransistorSelection(resistorResults, selectedCDBR);
      }
      else {
        var biggerCDBR = getBiggerCDBR(selectedCDBR, cdbr_data);
        if (biggerCDBR) {
          resistorResults = calculateResistors(biggerCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, dutyCycle, dutyCycleDuration);
          if (resistorResults) {
            displayResistorTransistorSelection(resistorResults, biggerCDBR);
          }
          else {
            displayNoResistorFoundError(selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, selectedCDBR);
          }
        }
        else {
          displayNoResistorFoundError(selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, selectedCDBR);
        }
      }
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

function outputSameDriveWithBrakingTransistor() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>The internal braking transistor is not sufficient for desired braking power.</h3>
  <h4>The next higher dimensioned drive does not have an internal braking transistor.
  Please use an external braking transistor with the suggested resistor combination.</h4>`
}

function outputExternalBrakingTransistor() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>The selected drive does not have a integrated braking transistor.</h3>
  <h4>Please use an external braking transistor with the suggested resistor combination.</h4>`
}

function outputBrakingTransistorError() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>Internal braking transistor not sufficient for desired braking power.</h3>
  <h4>Please pick a higher dimensioned drive.</h4>`
}

function clearOutput() {
  var outputDiv = document.getElementById("output");
  // Clear previous output
  outputDiv.innerHTML = "";
}

function getResistorGraphic(resistor) {
  if (resistor.resistorNetwork.length == 1) {
    switch (resistor.quantity) {
      case 1:
        return "./graphics/rn-S1.svg"
      case 2:
        if (resistor.resistorNetwork[0].inSeries) {
          return "./graphics/rn-S2.svg"
        }
        else {
          return "./graphics/rn-P2.svg"
        }
      case 3:
        if (resistor.resistorNetwork[0].inSeries) {
          return "./graphics/rn-S3.svg"
        }
        else {
          return "./graphics/rn-P3.svg"
        }
      case 4:
        if (resistor.resistorNetwork[0].inSeries) {
          return "./graphics/rn-S4.svg"
        }
        else {
          return "./graphics/rn-P4.svg"
        }
      case 5:
        if (resistor.resistorNetwork[0].inSeries) {
          return "./graphics/rn-S5.svg"
        }
        else {
          return "./graphics/rn-P5.svg"
        }
      case 6:
        if (resistor.resistorNetwork[0].inSeries) {
          return "./graphics/rn-S6.svg"
        }
        else {
          return "./graphics/rn-P6.svg"
        }
      default: return null;
    }
  }
  else if (resistor.resistorNetwork.length == 2) {
    if (resistor.resistorNetwork.quantity == 2) {
      return "./graphics/rn-P2S2.svg"
    }
    else {
      return "./graphics/rn-P2S3.svg"
    }
  }
  else if (resistor.resistorNetwork.length == 3) {
    return "./graphics/rn-P3S2.svg"
  }
  return null;
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
    transistorContainer.style.marginTop = "40px"; // Adding some space between resistor and transistor details
    var transistorTitle = document.createElement("h6");
    transistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
    transistorTitle.textContent = "External braking transistor";
    transistorContainer.appendChild(transistorTitle);

    var transistorDetail = document.createElement("div");
    transistorDetail.innerHTML = `${transistorResults.qtty}x ${transistorResults.cdbr.type}`;
    if (transistorResults.qtty>1){
      transistorDetail.innerHTML += '<br>Please use the displayed resistor values for each braking transistor.'
    }
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
    flexContainer.style.alignItems = "top";
    cardBody.appendChild(flexContainer);

    var resistorContainer = document.createElement("div");
    var resistorTitle = document.createElement("h6");
    resistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
    resistorTitle.textContent = obj.qtty > 1 ? "Braking Resistors" : "Braking Resistor";
    resistorContainer.appendChild(resistorTitle);

    // Format resistors output
    var resistorDetail = document.createElement("div");
    resistorDetail.innerHTML = `${obj.quantity}x ${obj.resistor.type}`;
    resistorContainer.appendChild(resistorDetail);

    flexContainer.appendChild(resistorContainer);


    let resistorImageFile = getResistorGraphic(obj);
    // Add image next to the resistor details
    if (resistorImageFile) {
      var resistorImageContainer = document.createElement("div");
      resistorImageContainer.style.marginLeft = "40px"; // Space between text and image
      var resistorImage = document.createElement("img");
      resistorImage.src = resistorImageFile; // Replace with the actual image URL
      resistorImage.alt = "Resistor network";
      resistorImage.style.width = "auto"; // Set the desired width
      resistorImage.style.height = "auto"; // Maintain aspect ratio
      resistorImageContainer.appendChild(resistorImage);

      flexContainer.appendChild(resistorImageContainer);
    }

    // Transistor container
    if (transistorResults) {
      var transistorContainer = document.createElement("div");
      transistorContainer.style.marginTop = "20px"; // Adding some space between resistor and transistor details
      var transistorTitle = document.createElement("h6");
      transistorTitle.classList.add("card-subtitle", "mb-2", "text-muted");
      transistorTitle.textContent = "External braking transistor";
      transistorContainer.appendChild(transistorTitle);

      var transistorDetail = document.createElement("div");
      transistorDetail.innerHTML = `${transistorResults.qtty}x ${transistorResults.cdbr.type}`;
      transistorContainer.appendChild(transistorDetail);
      if (transistorResults.qtty>1){
        transistorDetail.innerHTML += '<br>Please use the displayed resistor network for each braking transistor.'
      }

      cardBody.appendChild(transistorContainer);
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
                  <strong>Total Resistance:</strong> ${obj.totalResistance.toFixed(2)} Ω<br>
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