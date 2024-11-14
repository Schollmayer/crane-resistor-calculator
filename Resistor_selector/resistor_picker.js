import { calculateResistors } from "../sharedFiles/braking_resistor_calculations.js";
import { getResistorGraphic } from "../sharedFiles/calculation_output.js";

const Rmin = document.getElementById('Rmin');
const Rmax = document.getElementById('Rmax');
const power = document.getElementById('power');
const dutyCycleDuration = document.getElementById('dutyCycleDuration');
const dutyCycle = document.getElementById('dutyCycle');

// Button Event Listener
const calculateButton = document.getElementById('calculateButton');
calculateButton.addEventListener('click', function () {
  // Clear previous calculation results
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  const Rmin = document.getElementById('Rmin');
  const Rmax = document.getElementById('Rmax');

  const RminValue = parseFloat(Rmin.value);
  const RmaxValue = parseFloat(Rmax.value);

  // Reset custom validity messages
  Rmin.setCustomValidity('');
  Rmax.setCustomValidity('');

  // Resistor validation check
  if (RminValue > RmaxValue) {
    Rmin.setCustomValidity('Rmax must be higher than Rmin!');
    Rmax.setCustomValidity('Rmax must be higher than Rmin!');
    Rmin.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  const form = document.getElementById('brakingDataInputForm');
  if (validateForm(form)) {
    calculateResult(); // Call your calculation function
    calculateButton.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    // Scroll to the first invalid input field
    const firstInvalidInput = form.querySelector('input.is-invalid');
    if (firstInvalidInput) {
      firstInvalidInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
  storeFormInput(); // Store the form inputs
});

// Custom form validation function
function validateForm(form) {
  // Select both inputs and selects within the form
  const elements = form.querySelectorAll('input, select');
  let isFormValid = true;

  elements.forEach(element => {
    // Check validity of each element
    if (!element.checkValidity()) {
      applyValidationClasses(element, false);
      isFormValid = false;
    } else {
      applyValidationClasses(element, true);
    }
  });

  // Return overall form validity status
  return isFormValid;
}

// Helper function to apply Bootstrap validation classes
function applyValidationClasses(input, isValid) {
  if (isValid) {
    input.classList.remove('is-invalid');
  } else {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
  }
}

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
  localStorage.setItem('InputFormDataResitorCalc', JSON.stringify(formData));
}

// Function to load form data from local storage
function loadFormData() {
  // Retrieve the data from local storage
  const formData = JSON.parse(localStorage.getItem('InputFormDataResitorCalc'));

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

  var tooltipTrigger2 = document.getElementById('tooltipLabel2');
  var tooltip2 = new bootstrap.Tooltip(tooltipTrigger2, {
    title: "<img src='../sharedFiles/graphics/rn-dutyCycle.svg' alt='Duty circle explanation' />",
    html: true,
    placement: 'top' // You can change the placement as needed
  });
});

function noResistorFound() {
  var outputDiv = document.getElementById("output");
  outputDiv.innerHTML = `
  <h3>No product found which matches the desired specifications.</h3>
  <h4>Unfortunately there is no product in our catalog which matches the desired specifications.</h4>`
}

function clearOutput() {
  var outputDiv = document.getElementById("output");
  // Clear previous output
  outputDiv.innerHTML = "";
}

function displayResistorTransistorSelection(resistorResults, minR, maxR, power) {
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

function calculateResult() {
  clearOutput()
  var resistorResults = calculateResistors(Number(Rmin.value), Number(Rmax.value), Number(power.value), Number(dutyCycle.value), Number(dutyCycleDuration.value));
  if (resistorResults) {
    displayResistorTransistorSelection(resistorResults, Number(Rmin.value), Number(Rmax.value), Number(power.value))
  }
  else {
    noResistorFound();
  }
}