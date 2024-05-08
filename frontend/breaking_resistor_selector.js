import { ga700_data } from "./ga700_data.js"

const calculateResistorButton = document.getElementById('calculateResistorButton');
const dutyCycle = document.getElementById('dutyCycle');
const peakPower = document.getElementById('peakPower');
const power = document.getElementById('power');
const dutyCycleDuration = document.getElementById('dutyCycleDuration');
const driveSelect = document.getElementById('driveSelect');


calculateResistorButton.addEventListener('click', calculate);


function calculate() {
    if (hasBuildInBreakingTranssitor()){
        getBestResistorCombination(getRmin(),calculateRmax(),power.value)
    }
}

function hasBuildInBreakingTranssitor() {
    const selectedIndex = driveSelect.selectedIndex;
    return ga700_data[selectedIndex].internalBrakeTransistor;
}

function calculateRmax() {
    const selectedIndex = driveSelect.selectedIndex;
    const Rmax = (ga700_data[selectedIndex].brakeActivationVoltage * ga700_data[selectedIndex].brakeActivationVoltage) / peakPower.value;
    return Rmax;
}

function getRmin() {
    const selectedIndex = driveSelect.selectedIndex;
    const Rmin = ga700_data[selectedIndex].minBrakeResistance;
    return Rmin;
}

function getBestResistorCombination(minR, maxR, power) {
    var x = 2;
    return;
}