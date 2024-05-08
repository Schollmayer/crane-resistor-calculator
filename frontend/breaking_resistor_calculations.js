import { breaking_resistor_data, getEDFilteredResistors, testResistorList } from "./breaking_resistor_data.js";

//As all resistors in the portfolio have 10% tolerance, a fixed value will be used to reduce computation time
const LowerresistorTolerance = 0.9;
const upperResistorTolerance = 1.1;

function findUniqueCombinations(items, count) {
    var uniqueCombinations = new Set();

    // Generate all combinations of up to 'count' items
    for (let i = 0; i < items.length; i++) {
        uniqueCombinations.add([items[i]]);
        if (count >= 2) {
            for (let j = i; j < items.length; j++) {
                uniqueCombinations.add([items[i], items[j]]);
                if (count >= 3) {
                    for (let k = j; k < items.length; k++) {
                        uniqueCombinations.add([items[i], items[j], items[k]]);
                        if (count >= 4) {
                            for (let l = k; l < items.length; l++) {
                                uniqueCombinations.add([items[i], items[j], items[k], items[l]]);
                                if (count >= 5) {
                                    for (let m = l; m < items.length; m++) {
                                        uniqueCombinations.add([items[i], items[j], items[k], items[l], items[m]]);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
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
        if (!item.powerResistorRatioAcceptable){
            return false;
        }
        return true;
    }
    set.forEach(item => {
        if (!testRequirements(item)) {
            set.delete(item);
        }
    });

    var filteredArray = Array.from(set).sort((a, b) => {
        // First, compare by power
        if (a.totalPower < b.totalPower) return -1;
        if (a.totalPower > b.totalPower) return 1;
        // If power is the same, compare by quantity
        if (a.quantity < b.quantity) return -1;
        if (a.quantity > b.quantity) return 1;
        // If both power and quantity are equal, return 0
        return 0;
    });
    return filteredArray;
}

// Example usage
const items = getEDFilteredResistors(breaking_resistor_data, 40, 100)
var uniqueCombinations = findUniqueCombinations(items, 5);
var setWithInformation = addInformationToSet(uniqueCombinations);
console.log(uniqueCombinations);
//console.log(setWithInformation);
console.log(filterforResistorRequirements(setWithInformation, 25, 35,11200*1.9));

