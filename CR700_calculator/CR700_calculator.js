import { cdbr_data, ed_interpolate } from "../sharedFiles/cdbr_data.js";
import { HoistFrontend } from "./hoist_data.js";
import { calculateResistors, getResistorGraphic } from "../sharedFiles/braking_resistor_calculations.js";

//Button-EventListener
const calculateButton = document.getElementById('calculateButton');
calculateButton.addEventListener('click', function () {
  var form = document.getElementById('brakingDataInputForm');
  if (form.checkValidity()) {
    calculateResult();
  }
  else {
    form.reportValidity(); // This will trigger the browser's built-in validation messages
  }
});

//Define output fields


function noCR700found() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
    <h3>Unfortunately there is no drive which meets the given requirements.</h3>`
}

function clearOutput() {
  var outputDiv = document.getElementById("output");
  // Clear previous output
  outputDiv.innerHTML = "";
}
function displayResistorTransistorSelection(cr700Result, transistorResults, resistorResults, minR, maxR, power) {
  var outputDiv = document.getElementById("output");

  // Clear previous content
  outputDiv.innerHTML = "";

  var borderThickness = "2px";
  // Create a card group
  var cardGroup = document.createElement("div");
  cardGroup.classList.add("card-group");

  // Create card for Drive model
  var driveCard = document.createElement("div");
  driveCard.classList.add("card", "mb-3");
  driveCard.style.borderColor = "var(--yask-blue)";
  driveCard.style.borderWidth = borderThickness;

  var driveCardBody = document.createElement("div");
  driveCardBody.classList.add("card-body");

  var driveCardTitle = document.createElement("h5");
  driveCardTitle.classList.add("card-title");
  driveCardTitle.style.fontWeight = "bold";
  driveCardTitle.textContent = `Drive model:`;
  driveCardBody.appendChild(driveCardTitle);

  var driveFlexContainer = document.createElement("div");
  driveFlexContainer.style.display = "flex";
  driveFlexContainer.style.flexDirection = "column"; // Ensure column direction for line breaks
  driveFlexContainer.innerHTML = `<strong>Type:</strong> ${cr700Result.type}<br>
                                       <strong>HD-current:</strong> ${cr700Result.hdCurrent} A<br>
                                       <strong>HD-power:</strong> ${cr700Result.hdPower} kW`;
  driveCardBody.appendChild(driveFlexContainer);

  driveCard.appendChild(driveCardBody);
  cardGroup.appendChild(driveCard);

  if (transistorResults) {
    // Create card for Braking transistor
    var transistorCard = document.createElement("div");
    transistorCard.classList.add("card", "mb-3");
    transistorCard.style.borderColor = "var(--yask-blue)";
    transistorCard.style.borderWidth = borderThickness;

    var transistorCardBody = document.createElement("div");
    transistorCardBody.classList.add("card-body");

    var transistorCardTitle = document.createElement("h5");
    transistorCardTitle.classList.add("card-title");
    transistorCardTitle.style.fontWeight = "bold";
    transistorCardTitle.textContent = `Braking transistor:`;
    transistorCardBody.appendChild(transistorCardTitle);

    var transistorFlexContainer = document.createElement("div");
    transistorFlexContainer.style.display = "flex";
    transistorFlexContainer.style.flexDirection = "column"; // Ensure column direction for line breaks
    transistorFlexContainer.innerHTML = `<strong>Type:</strong> ${transistorResults.cdbr.type} <br>
                                       <strong>Quantity:</strong> ${transistorResults.qtty}`;
    transistorCardBody.appendChild(transistorFlexContainer);

    transistorCard.appendChild(transistorCardBody);
    cardGroup.appendChild(transistorCard);
  }
  // Create card for Braking Resistor
  var resistorCard = document.createElement("div");
  resistorCard.classList.add("card", "mb-3");
  resistorCard.style.borderColor = "var(--yask-blue)";
  resistorCard.style.borderWidth = borderThickness;

  var resistorCardBody = document.createElement("div");
  resistorCardBody.classList.add("card-body");

  var resistorCardTitle = document.createElement("h5");
  resistorCardTitle.classList.add("card-title");
  resistorCardTitle.style.fontWeight = "bold";
  resistorCardTitle.textContent = `Braking resistor:`;
  resistorCardBody.appendChild(resistorCardTitle);

  var resistorFlexContainer = document.createElement("div");
  resistorFlexContainer.style.display = "flex";
  resistorFlexContainer.style.flexDirection = "column"; // Ensure column direction for line breaks

  // Create the innerHTML with line breaks
  resistorFlexContainer.innerHTML = `<strong>Rmin:</strong> ${minR.toFixed(2)} Ω<br>
                                       <strong>Rmax:</strong> ${maxR.toFixed(2)} Ω<br>
                                       <strong>Power:</strong> ${power.toFixed(2)} kW`;

  resistorCardBody.appendChild(resistorFlexContainer);
  resistorCard.appendChild(resistorCardBody);
  cardGroup.appendChild(resistorCard);

  outputDiv.appendChild(cardGroup);


  if (resistorResults) {
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
      <div>
        <strong style = "font-size: 1.1em">Option details:</strong><br>
        <strong>Rtotal:</strong> ${obj.totalResistance.toFixed(2)} Ω<br>
        <strong>Total Power:</strong> ${obj.totalPower.toFixed(2)} kW<br>
        <strong>Total Quantity:</strong> ${obj.quantity}<br></div>`;
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

  else {
    var resistorError = document.createElement("div");
    resistorError.innerHTML = `<h3>Unfortunately there is no resistor network in our portfolio which fits the selected application.</h3>
    <br><h4>Please get a suitable resistor from a supplier.</h4>`

    outputDiv.appendChild(resistorError);
  }
}

function getdutyCyleTime(maxBrakeTime, dutyCycle) {
  return (maxBrakeTime / (dutyCycle / 100));
}

function calculateResult() {
  let hoist = new HoistFrontend("Hoist1");
  let [CR700selection, useInternalbrakingTransistor] = hoist.selectedCR700();
  console.log(`Use Internal : ${useInternalbrakingTransistor}%`);
  console.log(`CR700 : ${CR700selection}%`);

  if (CR700selection) {
    if (useInternalbrakingTransistor) {
      let resistorResults = calculateResistors(CR700selection.minBrakeResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower(), hoist.dutyCycle, getdutyCyleTime(hoist.maxBrakePower()), hoist.dutyCycle)
      displayResistorTransistorSelection(CR700selection, null, resistorResults, CR700selection.minBrakeResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower());
    }

    else {
      let resistorResults = calculateResistors(hoist.selectedCDBR().cdbr.minResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower(), hoist.dutyCycle, getdutyCyleTime(hoist.maxBrakePower()), hoist.dutyCycle)
      displayResistorTransistorSelection(CR700selection, hoist.selectedCDBR(), resistorResults, hoist.selectedCDBR().cdbr.minResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower());
    }
  }
  else {
    clearOutput()
    noCR700found()
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
  return null;
}