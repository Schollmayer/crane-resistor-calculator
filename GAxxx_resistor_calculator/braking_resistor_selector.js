import { calculateResistors } from "../sharedFiles/braking_resistor_calculations.js";
import { getResistorGraphic } from "../sharedFiles/calculation_output.js";
import { displayResistorTransistorSelection } from "../sharedFiles/calculation_output.js";
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


// Button Event Listener
const calculateButton = document.getElementById('calculateResistorButton');
calculateButton.addEventListener('click', function () {
    // Clear previous calculation results
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "";

    const Pb = document.getElementById('power');
    const PBmax = document.getElementById('peakPower');
  
    const PbValue = parseFloat(Pb.value);
    const PBmaxValue = parseFloat(PBmax.value);
  
    // Reset custom validity messages
    Pb.setCustomValidity('');
    PBmax.setCustomValidity('');
  
    // Resistor validation check
    if (PbValue > PBmaxValue) {
      Pb.setCustomValidity('Rmax must be higher than Rmin!');
      PBmax.setCustomValidity('Rmax must be higher than Rmin!');
      PBmax.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const form = document.getElementById('brakingDataInputForm');
    if (validateForm(form)) {
        calculate(); // Call your calculation function
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
  performAndDisplayCalculations(getRmin(ga700_data), calculateRmax(ga700_data), parseFloat(power.value), parseFloat(dutyCycle.value), parseFloat(dutyCycleDuration.value));
}

function calculateRmax(driveData) {
  const Rmax = (getSelectedDrive(driveData).brakeActivationVoltage * getSelectedDrive(driveData).brakeActivationVoltage) / (parseFloat(peakPower.value) * 1000);
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
        displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), null, resistorResults, minR, maxR, power, parseFloat(peakPower.value),
          getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
      }
      else {
        displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), null, null, minR, maxR, power, parseFloat(peakPower.value),
          getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
      }
    }
    else {
      if (hasTheBiggerDriveABrakingTransistor(selectedDrive)) {
        outputBrakingTransistorError()
      }
      else {
        var selectedCDBR = findCDBR(cdbr_data, maxR, getMaxBreakTime(dutyCycle, dutyCycleDuration), getSelectedDrive(selectedDrive).brakeActivationVoltage, dutyCycle)
        if (selectedCDBR) {
          let Rmax = maxR;
          let AvgPower = power;
          if (selectedCDBR.qtty > 1) {
            Rmax = Rmax * selectedCDBR.qtty;
            AvgPower = AvgPower / selectedCDBR.qtty;
          }
          outputSameDriveWithBrakingTransistor();
          var resistorResults = calculateResistors(selectedCDBR.cdbr.minResistance, Rmax, AvgPower, dutyCycle, dutyCycleDuration);
          if (resistorResults) {
            displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), selectedCDBR, resistorResults, selectedCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
              getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
          }
          else {
            var biggerCDBR = getBiggerCDBR(selectedCDBR, cdbr_data);
            if (biggerCDBR) {
              let Rmax = maxR;
              let AvgPower = power;
              if (selectedCDBR.qtty > 1) {
                Rmax = Rmax * selectedCDBR.qtty;
                AvgPower = AvgPower / selectedCDBR.qtty;
              }
              resistorResults = calculateResistors(biggerCDBR.cdbr.minResistance, Rmax, AvgPower, dutyCycle, dutyCycleDuration);
              if (resistorResults) {
                displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), biggerCDBR, resistorResults, biggerCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
                  getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
              }
              else {
                displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), biggerCDBR, null, biggerCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
                  getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
              }
            }
            else {
              displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), selectedCDBR, resistorResults,selectedCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
                getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
            
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
    let Rmax = maxR;
    let AvgPower = power;
    if (selectedCDBR.qtty > 1) {
      Rmax = Rmax * selectedCDBR.qtty;
      AvgPower = AvgPower / selectedCDBR.qtty;
    }
    outputExternalBrakingTransistor()
    var resistorResults = calculateResistors(selectedCDBR.cdbr.minResistance, Rmax, AvgPower, dutyCycle, dutyCycleDuration);
    if (resistorResults) {
      displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), selectedCDBR, resistorResults, selectedCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
        getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
    }
    else {
      var biggerCDBR = getBiggerCDBR(selectedCDBR, cdbr_data);
      if (biggerCDBR) {
        resistorResults = calculateResistors(biggerCDBR.cdbr.minResistance, Rmax, AvgPower, dutyCycle, dutyCycleDuration);
        if (resistorResults) {
          displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), biggerCDBR, resistorResults, biggerCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
            getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
        }
        else {
          displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), selectedCDBR, null, selectedCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
          getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
        }
      }
      else {
        displayResistorTransistorSelection("output", getSelectedDrive(selectedDrive), selectedCDBR, null, selectedCDBR.cdbr.minResistance, Rmax, AvgPower, parseFloat(peakPower.value),
        getMaxBreakTime(dutyCycle, dutyCycleDuration), dutyCycleDuration);
      }
    }
  }
  else {
    noTransistorFound();
  }
}
}

function noTransistorFound() {
  var outputDiv = document.getElementById("outputMessage");
  outputDiv.innerHTML = `
  <h4>No product found which matches the desired specifications.</h4>
  <h5>Unfortunately there is no product in our catalog which matches the desired specifications.</h5>`
}

function outputSameDriveWithBrakingTransistor() {
  var outputDiv = document.getElementById("outputMessage");
  outputDiv.innerHTML = `
  <h4>The internal braking transistor is not sufficient for desired braking power.</h4>
  <h5>The next higher dimensioned drive does not have an internal braking transistor.
  Please use an external braking transistor with the suggested resistor combination.</h5>`
}

function outputExternalBrakingTransistor() {
  var outputDiv = document.getElementById("outputMessage");
  outputDiv.innerHTML = `
  <h4>The selected drive does not have a integrated braking transistor.</h4>
  <h5>Please use an external braking transistor with the suggested resistor combination.</h5>`
}

function outputBrakingTransistorError() {
  var outputDiv = document.getElementById("outputMessage");
  outputDiv.innerHTML = `
  <h4>Internal braking transistor not sufficient for desired braking power.</h4>
  <h5>Please pick a higher dimensioned drive.</h5>`
}

function clearOutput() {
  var outputDiv = document.getElementById("output");
  // Clear previous output
  outputDiv.innerHTML = "";

  var outputDiv = document.getElementById("outputMessage");
  // Clear previous output
  outputDiv.innerHTML = "";
}








