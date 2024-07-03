import { calculateResistors, getResistorGraphic } from "../sharedFiles/braking_resistor_calculations.js";
import { checkBrakingTorque, findCDBR } from "./braking_transistor_calculations.js";
import { ga700_data } from "./ga700_data.js";
import { drive_OLCurves_higher_0_75_kW, drive_OLLinear_higher_0_75_kW, drive_OLCurves_smaller_0_75_kW, drive_OLLinear_smaller_0_75_kW } from "../sharedFiles/internal_braking_transistor_data.js";
import { cdbr_data } from "../sharedFiles/cdbr_data.js";

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

//Tooltip
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTrigger = document.getElementById('tooltipLabel');
  var tooltip = new bootstrap.Tooltip(tooltipTrigger, {
    title: "<img src='../sharedFiles/graphics/dutyCycle.svg' alt='Duty circle explanation' />",
    html: true,
    placement: 'top' // You can change the placement as needed
  });

  var tooltipTrigger2 = document.getElementById('tooltipLabel2');
  var tooltip2 = new bootstrap.Tooltip(tooltipTrigger2, {
    title: "<img src='../sharedFiles/graphics/dutyCycle.svg' alt='Duty circle explanation' />",
    html: true,
    placement: 'top' // You can change the placement as needed
  });
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
    return drive_OLCurves_smaller_0_75_kW;
  }

  else { return drive_OLCurves_higher_0_75_kW; }
}

function getTransistorLinearCurves(outputPower) {
  if (outputPower < 0.75) {
    return drive_OLLinear_smaller_0_75_kW;
  }
  else {
    return drive_OLLinear_higher_0_75_kW;
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
        displayResistorTransistorSelection(resistorResults, null, minR, maxR, power);
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
            displayResistorTransistorSelection(resistorResults, selectedCDBR, selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power);
          }
          else {
            var biggerCDBR = getBiggerCDBR(selectedCDBR, cdbr_data);
            if (biggerCDBR) {
              resistorResults = calculateResistors(biggerCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, dutyCycle, dutyCycleDuration);
              if (resistorResults) {
                displayResistorTransistorSelection(resistorResults, biggerCDBR, biggerCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power);
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
        displayResistorTransistorSelection(resistorResults, selectedCDBR,selectedCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power);
      }
      else {
        var biggerCDBR = getBiggerCDBR(selectedCDBR, cdbr_data);
        if (biggerCDBR) {
          resistorResults = calculateResistors(biggerCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power, dutyCycle, dutyCycleDuration);
          if (resistorResults) {
            displayResistorTransistorSelection(resistorResults, biggerCDBR,biggerCDBR.cdbr.minResistance, selectedCDBR.maxResistance, power);
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

function displayNoResistorFoundError(minR, maxR, power, transistorResults) {
  var outputDiv = document.getElementById("output");
  var card = document.createElement("div");
  card.classList.add("card", "mb-3", "col-12");

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
    if (transistorResults.qtty > 1) {
      transistorDetail.innerHTML += '<br>Please use the displayed resistor values for each braking transistor.'
    }
    transistorContainer.appendChild(transistorDetail);

    cardBody.appendChild(transistorContainer);
  }

  card.appendChild(cardBody);
  outputDiv.appendChild(card);
}

function displayResistorTransistorSelection(resistorResults, transistorResults, minR, maxR, power) {
  var outputDiv = document.getElementById("output");
  resistorResults.forEach(function (obj, index) {
    var card = document.createElement("div");
    card.classList.add("card", "mb-3");

    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    var cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.style.fontWeight = "bold";
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
      resistorImageContainer.style.marginLeft = "20px"; // Adjust the space between text and image

      var resistorImage = document.createElement("img");
      resistorImage.src = resistorImageFile; // Replace with the actual image URL
      resistorImage.alt = "Resistor network";
      resistorImage.style.maxWidth = "100%"; // Set maximum width to ensure it fits within the container
      resistorImage.style.height = "auto"; // Maintain aspect ratio

      // Optionally, you can limit the maximum height of the image
      resistorImage.style.maxHeight = "200px"; // Adjust the max height as per your design

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
      if (transistorResults.qtty > 1) {
        transistorDetail.innerHTML += '<br>Please use the displayed resistor network for each braking transistor.'
      }

      cardBody.appendChild(transistorContainer);
    }

    var detailButton = document.createElement("button");
    detailButton.classList.add("btn", "btn-yask-blue", "mt-3");
    detailButton.textContent = "Show details";
    detailButton.addEventListener("click", function () {
      var details = document.getElementById(`details-${index}`);
      if (!details) {
        details = document.createElement("div");
        details.classList.add("mt-3", "d-flex", "justify-content-left");
        details.id = `details-${index}`;
        details.innerHTML = `
          <div style="margin-right: 20px;">
            <strong style = "font-size: 1.1em">Option details:</strong><br>
            <strong>Rtotal:</strong> ${obj.totalResistance.toFixed(2)} Ω<br>
            <strong>Total Power:</strong> ${obj.totalPower.toFixed(2)} kW<br>
            <strong>Total Quantity:</strong> ${obj.quantity}<br>
          </div>
          <div>
            <strong style = "font-size: 1.1em">Resistor requirements:</strong><br>
            <strong>Rmin:</strong> ${minR.toFixed(2)}&#8486;<br>
            <strong>Rmax:</strong> ${maxR.toFixed(2)}&#8486;<br>
            <strong>Power:</strong> ${power}kW
          </div>
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
