import { breaking_resistor_data, getEDFilteredResistors, testResistorList } from "./breaking_resistor_data.js";

//As all resistors in the portfolio have 10% tolerance, a fixed value will be used to reduce computation time
const LowerResistorTolerance = 0.9;
const UpperResistorTolerance = 1.1;

function findUniqueCombinations(items, maxItemCount) {
    const uniqueCombinations = [];
    const combination = [];

    function generateCombinations(startIndex) {
        if (combination.length > 0 && combination.length <= maxItemCount) {
            uniqueCombinations.push([...combination]);
        }
        if (combination.length === maxItemCount) {
            return;
        }
        for (let i = startIndex; i < items.length; i++) {
            combination.push(items[i]);
            generateCombinations(i); // Allow repetitions
            combination.pop();
        }
    }

    generateCombinations(0);
    return uniqueCombinations;
}

function addInformationToSet(combinations) {
    return combinations.map(item => {
        let totalResistance = 0.0;
        let totalPower = 0.0;
        let totalPrice = 0.0;
        let powerResistorRatioAcceptable = true;

        item.forEach(resistor => {
            totalResistance += resistor.resistance;
            totalPower += resistor.power;
            totalPrice += resistor.price;
        });

        item.forEach(resistor => {
            let resistorRatio = resistor.resistance / totalResistance;
            let powerRatio = resistor.power / totalPower;
            if (resistorRatio > powerRatio) {
                powerResistorRatioAcceptable = false;
            }
        });

        return {
            totalResistance,
            totalPower,
            quantity: item.length,
            resistors: item,
            totalPrice,
            powerResistorRatioAcceptable,
        };
    });
}

function filterForResistorRequirements(resistors, minResistance, maxResistance, power) {
    const filteredResistors = resistors.filter(item => {
        if (item.totalResistance * LowerResistorTolerance < minResistance || item.totalResistance * UpperResistorTolerance > maxResistance) {
            return false;
        }
        if (item.totalPower < power) {
            return false;
        }
        return item.powerResistorRatioAcceptable;
    });

    filteredResistors.sort((a, b) => {
        if (a.totalPrice !== b.totalPrice) {
            return a.totalPrice - b.totalPrice;
        }
        return a.totalPower - b.totalPower;
    });

    return filteredResistors.slice(0, 3);
}

export function calculateResistors(minR, maxR, power, dutyCycle, dutyCycleDuration) {
    const items = getEDFilteredResistors(breaking_resistor_data, dutyCycle, dutyCycleDuration);
    const uniqueCombinations = findUniqueCombinations(items, 5);
    console.log(uniqueCombinations)
    const resistorsWithInformation = addInformationToSet(uniqueCombinations);
    return filterForResistorRequirements(resistorsWithInformation, minR, maxR, power);
}
