import { calculateResistors, getResistorGraphic } from "../sharedFiles/braking_resistor_calculations.js";
import { checkBrakingTorque, findCDBR } from "./braking_transistor_calculations.js";
import { drive_OLCurves_higher_0_75_kW, drive_OLLinear_higher_0_75_kW, drive_OLCurves_smaller_0_75_kW, drive_OLLinear_smaller_0_75_kW } from "../sharedFiles/internal_braking_transistor_data.js";
import { cdbr_data } from "../sharedFiles/cdbr_data.js";
import { ga700_data } from "./ga700_data.js";
import { ga500_data } from "./ga500_data.js";
import { cr700_data } from "../CR700_calculator/cr700_data.js";
import { la500_data } from "./la500_data.js";


const calculateResistorButton = document.getElementById('calculateResistorButton');
const dutyCycle = document.getElementById('dutyCycle');
const peakPower = document.getElementById('peakPower');
const power = document.getElementById('power');
const dutyCycleDuration = document.getElementById('dutyCycleDuration');
const driveSelect = document.getElementById('driveSelect');

//Populate "Select Drive Model"
const radios = document.getElementsByName('driveSelectRadios');
let selectedValue;
for (const radio of radios) {
  if (radio.checked) {
    selectedValue = radio.value;
    break;
  }
}

var selectedDrive = ga700_data;
if (selectedValue == "GA700") {
  selectedDrive = ga700_data;
}
else if (selectedValue == "GA500") {
  selectedDrive = ga500_data;
}

else if (selectedValue == "LA500") {
  selectedDrive = la500_data;
}

else if (selectedValue == "CR700") {
  selectedDrive = cr700_data;
}
const selectElement = document.getElementById('driveSelect');
selectedDrive.forEach((drive, index) => {
  const option = document.createElement('option');
  option.text = drive.type;
  option.value = drive;
  selectElement.appendChild(option);
});


calculateResistorButton.addEventListener('click', function () {
  var form = document.getElementById('brakingDataInputForm');
  if (form.checkValidity()) {
    calculate();
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
  const select = document.getElementById('driveSelect');

  // Create an object to hold form data
  const formData = {};

  // Loop through inputs and store their values
  inputs.forEach(input => {
    if (input.type === 'radio' && input.checked) {
      // Save the checked radio button
      formData[input.name] = input.value;
    } else if (input.type !== 'radio') {
      formData[input.id] = input.value;
    }
  });


  formData[select.id] = select.selectedIndex;


  // Store form data as a JSON string in local storage
  localStorage.setItem('InputFormDataGACalc', JSON.stringify(formData));
}

function loadFormData() {
  // Retrieve the data from local storage
  const formData = JSON.parse(localStorage.getItem('InputFormDataGACalc'));

  // If formData is null, there is no saved data
  if (!formData) {
    alert('No saved data found!');
    return;
  }

  // Get all inputs in the form
  const form = document.getElementById('brakingDataInputForm');
  const inputs = form.querySelectorAll('input');
  const select = document.getElementById('driveSelect');

  // First, set the radio buttons
  inputs.forEach(input => {
    if (input.type === 'radio') {
      // Check if the stored value matches the radio button's value
      if (formData[input.name] === input.value) {
        input.checked = true;
        // Trigger the change event to populate the select options
        input.dispatchEvent(new Event('change'));
      }
    }
    else if (formData[input.id] !== undefined) {
      input.value = formData[input.id];
    }
  });
  // Now, set the selects after the options have been populated
    if (formData[select.id] !== undefined) {
      setTimeout(() => {
        select.selectedIndex = formData[select.id];
      }, 0); // Delay to ensure options are populated first
    }
}



// Function to reset all form inputs to empty strings and reset radio buttons
function resetForm() {
  const form = document.getElementById('brakingDataInputForm');
  const inputs = form.querySelectorAll('input');
  const selects = form.querySelectorAll('select');

  inputs.forEach(input => {
    if (input.type === 'radio') {
      input.checked = input.defaultChecked;
    } else {
      input.value = '';
    }
  });

  selects.forEach(select => {
    select.selectedIndex = 0;
  });
}

//Tooltip and population of list
document.addEventListener('DOMContentLoaded', function () {
  var tooltipTrigger = document.getElementById('tooltipLabel');
  var tooltip = new bootstrap.Tooltip(tooltipTrigger, {
    title: "<img src='../sharedFiles/graphics/rn-dutyCycle.svg' alt='Duty circle explanation' />",
    html: true,
    placement: 'top' // You can change the placement as needed
  });

  var tooltipTrigger2 = document.getElementById('tooltipLabel2');
  var tooltip2 = new bootstrap.Tooltip(tooltipTrigger2, {
    title: "<img src='../sharedFiles/graphics/rn-dutyCycle.svg' alt='Duty circle explanation' />",
    html: true,
    placement: 'top' // You can change the placement as needed
  });

  var radioButtons = document.querySelectorAll('input[name="driveSelectRadios"]');
  radioButtons.forEach(function (radio) {
    radio.addEventListener('change', function () {
      let selectedValue;
      for (const radio of radios) {
        if (radio.checked) {
          selectedValue = radio.value;
          break;
        }
      }

      selectedDrive = ga700_data;
      if (selectedValue == "GA700") {
        selectedDrive = ga700_data;
      }
      else if (selectedValue == "GA500") {
        selectedDrive = ga500_data;
      }

      else if (selectedValue == "LA500") {
        selectedDrive = la500_data;
      }

      else if (selectedValue == "CR700") {
        selectedDrive = cr700_data;
      }

      const selectElement = document.getElementById('driveSelect');
      // Get all child elements of the select element
      const children = selectElement.children;
      // Remove all child elements except the first one
      while (selectElement.children.length > 1) {
        selectElement.removeChild(selectElement.lastChild);
      }

      selectedDrive.forEach((drive, index) => {
        const option = document.createElement('option');
        option.text = drive.type;
        option.value = drive;
        selectElement.appendChild(option);
      });
    });
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

function getTransistorCurves(outputPower, selectedDrive) {
  if (selectedDrive === ga700_data || selectedDrive === cr700_data) {
    if (outputPower < 0.75) {
      return drive_OLCurves_smaller_0_75_kW;
    }
    else { return drive_OLCurves_higher_0_75_kW; }
  }
  else if (selectedDrive === ga500_data || selectedDrive === la500_data) {
    if (outputPower < 0.4) {
      return drive_OLCurves_smaller_0_75_kW;
    }
    else { return drive_OLCurves_higher_0_75_kW; }
  }
}

function getTransistorLinearCurves(outputPower, selectedDrive) {
  if (selectedDrive === ga700_data || selectedDrive === cr700_data) {
    if (outputPower < 0.75) {
      return drive_OLLinear_smaller_0_75_kW;
    }
    else { return drive_OLLinear_higher_0_75_kW; }
  }
  else if (selectedDrive === ga500_data || selectedDrive === la500_data) {
    if (outputPower < 0.4) {
      return drive_OLLinear_smaller_0_75_kW;
    }
    else { return drive_OLLinear_higher_0_75_kW; }
  }
}

function hasTheBiggerDriveABrakingTransistor(driveData) {
  if (driveData[driveSelect.selectedIndex + 1]) {
    return driveData[driveSelect.selectedIndex + 1].internalBrakeTransistor;
  }
  else {
    return false;
  }
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

  var gaCurves = getTransistorCurves(getSelectedDrive(selectedDrive).hdPower, selectedDrive);
  var gaLinearCurves = getTransistorLinearCurves(getSelectedDrive(selectedDrive).hdPower, selectedDrive);

  if (getSelectedDrive(selectedDrive).internalBrakeTransistor) {
    if (checkBrakingTorque(dutyCycle, getMaxBreakTime(dutyCycle, dutyCycleDuration), power, getSelectedDrive(selectedDrive), gaCurves, gaLinearCurves)) {
      var resistorResults = calculateResistors(minR, maxR, power, dutyCycle, dutyCycleDuration);
      if (resistorResults) {
        displayResistorTransistorSelection(resistorResults, null, minR, maxR, power);
      }
      else {
        displayNoResistorFoundError(minR, maxR, power, null);
      }
    }
    else {
      if (hasTheBiggerDriveABrakingTransistor(selectedDrive)) {
        outputBrakingTransistorError()
      }
      else {
        var selectedCDBR = findCDBR(cdbr_data, maxR, getMaxBreakTime(dutyCycle, dutyCycleDuration), getSelectedDrive(selectedDrive).brakeActivationVoltage, dutyCycle)
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
    var selectedCDBR = findCDBR(cdbr_data, maxR, getMaxBreakTime(dutyCycle, dutyCycleDuration), getSelectedDrive(selectedDrive).brakeActivationVoltage, dutyCycle)
    if (selectedCDBR) {
      outputExternalBrakingTransistor()
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
    flexContainer.style.flexDirection = "column"; // Display children in column
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

    // Add images next to the resistor details if resistorImageFile is valid
    if (resistorImageFile) {
      var resistorImageContainer = document.createElement("div");
      resistorImageContainer.style.marginTop = "10px"; // Adjust the space between text and image
      resistorImageContainer.style.display = "flex"; // Display images in a row
      resistorImageContainer.style.gap = "10px"; // Add space between the images
      resistorImageContainer.style.flexWrap = "wrap"; // Wrap images on smaller screens
      resistorImageContainer.style.alignItems = "center"; // Align items vertically if needed
      resistorImageContainer.style.justifyContent = "flex-start"; // Align images to the left

      // Check if resistorImageFile is an array
      if (Array.isArray(resistorImageFile)) {
        // Loop through the array and create images for each element
        resistorImageFile.forEach((imageSrc, index) => {
          if (index < 2) { // Display up to two images
            var resistorImage = document.createElement("img");
            resistorImage.src = imageSrc;
            resistorImage.alt = `Resistor network ${index + 1}`;
            resistorImage.style.maxWidth = "100%"; // Ensure image fits within the container
            resistorImage.style.height = "auto"; // Maintain aspect ratio
            resistorImage.style.maxHeight = "200px"; // Limit the maximum height
            resistorImage.style.objectFit = "contain"; // Ensure image fits within its container
            resistorImage.style.margin = "0"; // Left-align the image
            resistorImage.style.marginTop = "10px"; // Left-align the image

            // Add a class to the second image for special mobile styling
            if (index === 1) {
              resistorImage.classList.add("second-image");
            }

            resistorImageContainer.appendChild(resistorImage);

            // Add the "or" text between the images
            if (index === 0 && resistorImageFile.length > 1) {
              var orText = document.createElement("span");
              orText.textContent = "OR";
              orText.style.margin = "0 10px"; // Add margin to space the "or" text from the images
              orText.style.fontSize = "1.3em"; // Make the text bigger
              orText.style.fontWeight = "bold"; // Make the text bold
              orText.style.color = "var(--yask-blue)"; // Use the --yask-blue color

              resistorImageContainer.appendChild(orText);
            }
          }
        });
      } else {
        // If resistorImageFile is not an array, handle it as a single image
        var resistorImage = document.createElement("img");
        resistorImage.src = resistorImageFile;
        resistorImage.alt = "Resistor network";
        resistorImage.style.maxWidth = "100%"; // Ensure image fits within the container
        resistorImage.style.height = "auto"; // Maintain aspect ratio
        resistorImage.style.maxHeight = "200px"; // Limit the maximum height
        resistorImage.style.objectFit = "contain"; // Ensure image fits within its container
        resistorImage.style.margin = "0"; // Left-align the image
        resistorImage.style.marginTop = "10px"; // Left-align the image

        resistorImageContainer.appendChild(resistorImage);
      }

      // Append the container with images to the cardBody
      cardBody.appendChild(resistorImageContainer);
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
        transistorDetail.innerHTML += '<br>Please use the displayed resistor network for each braking transistor.';
      }

      flexContainer.appendChild(transistorContainer);
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
    <div style="margin: 0; padding: 0;">
      <strong style="font-size: 1.1em">Resistor requirements:</strong><br>
      <strong>Rmin:</strong> ${minR.toFixed(2)} &#8486;<br>
      <strong>Rmax:</strong> ${maxR.toFixed(2)} &#8486;<br>
      <strong>Power:</strong> ${power} kW
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







