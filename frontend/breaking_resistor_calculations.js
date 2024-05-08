import { breaking_resistor_data, getEDFilteredResistors } from "./breaking_resistor_data.js";

//As all resistors in the portfolio have 10% tolerance, a fixed value will be used to reduce computation time
const LowerresistorTolerance = 0.9;
const upperResistorTolerance = 1.1;

function findUniqueCombinations(items, maxItemCount) {
    const uniqueCombinations = new Set();
    // Generate all combinations of up to maxItemCount items
    function generateCombinations(currentCombination, startIndex) {
        if (currentCombination.length <= maxItemCount) {
            uniqueCombinations.add(currentCombination.slice()); // Add a copy of the combination
        }
        if (currentCombination.length === maxItemCount) {
            return; // Reached maximum count, stop recursion
        }
        for (let i = startIndex; i < items.length; i++) {
            currentCombination.push(items[i]);
            generateCombinations(currentCombination, i + 1); // Recursive call with next index
            currentCombination.pop(); // Backtrack
        }
    }
    generateCombinations([], 0); // Start with an empty combination at index 0
    //return Array.from(uniqueCombinations);
    return uniqueCombinations;
}

function addInformationToSet(set) {
    var setWithAdditionalInformation = new Set();
    for (var item of set) {
        var totalResistanceLocal = 0.0;
        var totalPowerLocal = 0.0;
        var totalPriceLocal = 0.0;
        var powerResistorRatioAcceptable = true;
        for (let i = 0; i < item.length; i++) {
            totalResistanceLocal += item[i].resistance;
            totalPowerLocal += item[i].power;
            //totalPriceLocal += item[i].price;
        }

        for (let i = 0; i < item.length; i++) { 
            let resistorRatio = item[i].resistance / totalResistanceLocal;
            let powerRatio  = item[i].power / totalPowerLocal;
            if (resistorRatio > powerRatio){
                powerResistorRatioAcceptable = false;
            }
        }

        setWithAdditionalInformation.add({
            totalResistance: totalResistanceLocal,
            totalPower: totalPowerLocal,
            quantity: item.length,
            resistors: item,
            totalPrice: totalPriceLocal,
            powerResistorRatioAcceptable : powerResistorRatioAcceptable,
        })
    }
    return setWithAdditionalInformation;
}

function filterforResistorRequirements(set, minResistance, maxResistance, power) {
    function testRequirements(item){
        if (item.totalResistance * LowerresistorTolerance < minResistance || item.totalResistance * upperResistorTolerance > maxResistance ){
            return false;
        }
        if (item.totalPower < power){
            return false;
        }
        if (!item.powerResistorRatioAcceptable)
            {return false;}

        return true;
    }
    set.forEach(item => {
        if (!testRequirements(item)) {
            set.delete(item);
        }
    });
}

// Example usage
const items = getEDFilteredResistors(breaking_resistor_data, 40, 100)
const uniqueCombinations = findUniqueCombinations(items, 4);
var setWithInformation = addInformationToSet(uniqueCombinations);
filterforResistorRequirements(setWithInformation, 35, 50,14000);
console.log(uniqueCombinations);
console.log(setWithInformation);
