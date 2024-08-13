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
  storeFormInput();
});

const loadInputsButton = document.getElementById('loadInputsButton');
loadInputsButton.addEventListener('click', loadFormData);

const resetInputsButton = document.getElementById('resetInputsButton');
resetInputsButton.addEventListener('click', resetForm);

//Functions to store last form input values
function storeFormInput() {
  // Get all inputs in the form
  const form = document.getElementById('brakingDataInputForm');
  const inputs = form.querySelectorAll('input');
  // Create an object to hold form data
  const formData = {};
  // Loop through inputs and store their values
  inputs.forEach(input => {
    formData[input.id] = input.value;
  });

  // Store form data as a JSON string in local storage
  localStorage.setItem('InputFormDataCR700Calc', JSON.stringify(formData));
}

// Function to load form data from local storage
function loadFormData() {
  // Retrieve the data from local storage
  const formData = JSON.parse(localStorage.getItem('InputFormDataCR700Calc'));

  // If formData is null, there is no saved data
  if (!formData) {
    alert('No saved data found!');
    return;
  }

  // Get all inputs in the form
  const form = document.getElementById('brakingDataInputForm');
  const inputs = form.querySelectorAll('input');

  // Loop through inputs and set their values from local storage
  inputs.forEach(input => {
    if (formData[input.id] !== undefined) {
      input.value = formData[input.id];
    }
  });
}
// Function to reset all form inputs to empty strings
function resetForm() {
  const form = document.getElementById('brakingDataInputForm');
  const inputs = form.querySelectorAll('input');

  inputs.forEach(input => {
    input.value = '';
  });
}

//Tooltip
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTrigger = document.getElementById('tooltipLabel');
  var tooltip = new bootstrap.Tooltip(tooltipTrigger, {
    title: "<img src='../sharedFiles/graphics/rn-dutyCycle.svg' alt='Duty circle explanation' />",
    html: true,
    placement: 'top' // You can change the placement as needed
  });
});

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
function displayResistorTransistorSelection(cr700Result, transistorResults, resistorResults, minR, maxR, power, hoist) {
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
    if (transistorResults.qtty>1){
      transistorFlexContainer.innerHTML += `<br><br><strong>Please select the displayed resistor values for each braking transistor. `
    }
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

//Display calculated application data in accordion
var accordion = document.createElement("div");
accordion.classList.add("accordion", "mb-3");

var accordionCard = document.createElement("div");
accordionCard.classList.add("accordion-item");

var accordionHeader = document.createElement("h3");
accordionHeader.classList.add("accordion-header");

var headerButton = document.createElement("button");
headerButton.classList.add("accordion-button", "collapsed");  // Start with collapsed
headerButton.style.outline = "none";
headerButton.setAttribute("type", "button");
headerButton.setAttribute("data-bs-toggle", "collapse");
headerButton.setAttribute("data-bs-target", "#resistorAccordion");
headerButton.setAttribute("aria-expanded", "false");
headerButton.setAttribute("aria-controls", "resistorAccordion");

// Make the text bold and increase the font size
headerButton.innerHTML = `<strong style="font-size: 1.1rem;">Calculated application values.</strong>`;

accordionHeader.appendChild(headerButton);
accordionCard.appendChild(accordionHeader);

var accordionCollapse = document.createElement("div");
accordionCollapse.classList.add("accordion-collapse", "collapse");  // Start with collapse
accordionCollapse.id = "resistorAccordion";

var accordionBody = document.createElement("div");
accordionBody.classList.add("accordion-body");
accordionBody.innerHTML = `<strong>Average braking power:</strong> ${hoist.averageBrakePower().toFixed(2)} kW<br>
<strong>Maximum braking power:</strong> ${hoist.maxBrakePower().toFixed(2)} kW<br>
<strong>Maximum continuous braking time:</strong> ${hoist.maxBrakeTime().toFixed(2)} s`;

accordionCollapse.appendChild(accordionBody);
accordionCard.appendChild(accordionCollapse);
accordion.appendChild(accordionCard);

outputDiv.appendChild(accordion);


//Display resistor network options
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

// Details section
var detailsContainer = document.createElement("div");
detailsContainer.classList.add("collapse"); // Add the "well" class here
detailsContainer.id = `details-${index}`;

// Create a wrapper div with margin inside detailsContainer
var detailsContent = document.createElement("div");
detailsContent.classList.add("mt-3");
detailsContent.innerHTML = `
  <div style="display: flex; justify-content: left; margin: 0; padding: 0;">
    <div style="margin-right: 20px; padding: 0;"> 
      <strong style="font-size: 1.1em">Option details:</strong><br>
      <strong>Rtotal:</strong> ${obj.totalResistance.toFixed(2)} Ω<br>
      <strong>Total power:</strong> ${obj.totalPower.toFixed(2)} kW<br>
      <strong>Total quantity:</strong> ${obj.quantity}<br>
    </div>
  </div>
`;

detailsContainer.appendChild(detailsContent); // Append detailsContent (with margin) inside detailsContainer

var detailButton = document.createElement("button");
detailButton.classList.add("btn", "btn-yask-blue", "mt-3");
detailButton.setAttribute("type", "button");
detailButton.setAttribute("data-bs-toggle", "collapse");
detailButton.setAttribute("data-bs-target", `#details-${index}`);
detailButton.setAttribute("aria-expanded", "false");
detailButton.setAttribute("aria-controls", `details-${index}`);
detailButton.textContent = "Show details";

// Event listener for Bootstrap collapse events
detailsContainer.addEventListener("show.bs.collapse", function () {
  detailButton.textContent = "Show less";
});

detailsContainer.addEventListener("hide.bs.collapse", function () {
  detailButton.textContent = "Show details";
});

cardBody.appendChild(detailButton);
cardBody.appendChild(detailsContainer); // Append detailsContainer (with collapsible content) to cardBody

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
      let resistorResults = calculateResistors(CR700selection.minBrakeResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower(), hoist.dutyCycle, getdutyCyleTime(hoist.maxBrakeTime(), hoist.dutyCycle))
      displayResistorTransistorSelection(CR700selection, null, resistorResults, CR700selection.minBrakeResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower(),hoist);
    }

    else {
      let resistorResults = calculateResistors(hoist.selectedCDBR().cdbr.minResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower(), hoist.dutyCycle, getdutyCyleTime(hoist.maxBrakeTime(), hoist.dutyCycle))
      displayResistorTransistorSelection(CR700selection, hoist.selectedCDBR(), resistorResults, hoist.selectedCDBR().cdbr.minResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower(),hoist);
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