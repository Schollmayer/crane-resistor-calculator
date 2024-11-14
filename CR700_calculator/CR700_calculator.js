import { cdbr_data, ed_interpolate } from "../sharedFiles/cdbr_data.js";
import { HoistFrontend } from "./hoist_data.js";
import { calculateResistors} from "../sharedFiles/braking_resistor_calculations.js";
import {displayResistorTransistorSelection} from "../sharedFiles/calculation_output.js";

// Button Event Listener
const calculateButton = document.getElementById('calculateButton');
calculateButton.addEventListener('click', function () {
    // Clear previous calculation results
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

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
  const inputs = form.querySelectorAll('input');
  let isFormValid = true;

  inputs.forEach(input => {
      if (!input.checkValidity()) {
          applyValidationClasses(input, false);
          isFormValid = false;
      } else {
          applyValidationClasses(input, true);
      }
  });

  //form.classList.add('was-validated');
  return isFormValid;
}

// Helper function to apply Bootstrap validation classes
function applyValidationClasses(input, isValid) {
  if (isValid) {
      input.classList.remove('is-invalid');
      //input.classList.add('is-valid');
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

function getdutyCyleTime(maxBrakeTime, dutyCycle) {
  return (maxBrakeTime / (dutyCycle / 100));
}

function calculateResult() {
  let hoist = new HoistFrontend("Hoist1");
  let [CR700selection, useInternalbrakingTransistor] = hoist.selectedCR700();

  if (CR700selection) {
    if (useInternalbrakingTransistor) {
      let resistorResults = calculateResistors(CR700selection.minBrakeResistance, hoist.maxBrakeResistance(), hoist.averageBrakePower(), hoist.dutyCycle, getdutyCyleTime(hoist.maxBrakeTime(), hoist.dutyCycle))
      displayResistorTransistorSelection("output",CR700selection, null, resistorResults, CR700selection.minBrakeResistance, hoist.maxBrakeResistance(),hoist.averageBrakePower(), hoist.maxBrakePower(), hoist.maxBrakeTime(), getdutyCyleTime(hoist.maxBrakeTime(), hoist.dutyCycle));
    }

    else {
      let Rmax = hoist.maxBrakeResistance();
      let Pavg = hoist.averageBrakePower();
      if (hoist.selectedCDBR().qtty > 1){
        Rmax = Rmax * hoist.selectedCDBR().qtty;
        Pavg = Pavg / hoist.selectedCDBR().qtty;
      }
      let resistorResults = calculateResistors(hoist.selectedCDBR().cdbr.minResistance, Rmax, Pavg, hoist.dutyCycle, getdutyCyleTime(hoist.maxBrakeTime(), hoist.dutyCycle))
      displayResistorTransistorSelection("output", CR700selection, hoist.selectedCDBR(), resistorResults, hoist.selectedCDBR().cdbr.minResistance, Rmax, Pavg, hoist.maxBrakePower(), hoist.maxBrakeTime(), getdutyCyleTime(hoist.maxBrakeTime(), hoist.dutyCycle));
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