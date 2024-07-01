import { braking_resistor_data, getEDFilteredResistors } from "./braking_resistor_data.js";

//As all resistors in the portfolio have 10% tolerance, a fixed value will be used to reduce computation time
const LowerResistorTolerance = 0.9;
const UpperResistorTolerance = 1.1;
const DEBUG = false;

function calculateResistorNetworkValues(resistorArray) {
    let totalQuantity = 0;
    let totalPower = 0;
    let totalResistance = 0;
    let totalPrice = 0;
    resistorArray.forEach(resistorBlock => {
        totalQuantity += resistorBlock.quantity;
        totalPower += resistorBlock.totalPower;
        totalResistance += resistorBlock.totalResistance;
        totalPrice += resistorBlock.totalPrice;
    });

    return {
        quantity: totalQuantity,
        resistor: resistorArray[0].resistor,
        resistorNetwork: resistorArray,
        totalResistance: totalResistance,
        totalPower: totalPower,
        totalPrice: totalPrice,
    }
}

function findUniqueCombinations(items, maxItemCount) {
    const uniqueCombinations = [];
    //Add all resistors combinations for resistors in series
    items.forEach(resistor => {
        for (let i = 1; i < maxItemCount + 1; i++) {
            const resistorBlocks = [];
            let resistorInSeries = {
                quantity: i,
                resistor: resistor,
                inSeries: true,
                totalResistance: resistor.resistance * i,
                totalPower: resistor.power * i,
                totalPrice: resistor.price * i,
            }
            resistorBlocks.push(resistorInSeries);
            uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks));
        }
    });
    //Add all resistors combinations for resistors in parallel
    items.forEach(resistor => {
        for (let i = 2; i < maxItemCount + 1; i++) {
            const resistorBlocks = [];
            let resistorInParallel = {
                quantity: i,
                resistor: resistor,
                inSeries: false,
                totalResistance: resistor.resistance / i,
                totalPower: resistor.power * i,
                totalPrice: resistor.price * i,
            }
            resistorBlocks.push(resistorInParallel);
            uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks));
        }
    });

    uniqueCombinations.forEach(resistorNetwork => {
        const resistorBlocks = [];
        if (resistorNetwork.quantity == 2 && resistorNetwork.resistorNetwork[0].inSeries == false) {
            resistorBlocks.push(resistorNetwork.resistorNetwork[0]);
            resistorBlocks.push(resistorNetwork.resistorNetwork[0]);
            uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks));
            resistorBlocks.push(resistorNetwork.resistorNetwork[0]);
            uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks));
        }

        const resistorBlocks2 = [];
        if (resistorNetwork.quantity == 3 && resistorNetwork.resistorNetwork[0].inSeries == false) {
            resistorBlocks2.push(resistorNetwork.resistorNetwork[0]);
            resistorBlocks2.push(resistorNetwork.resistorNetwork[0]);
            uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks2));
        }
    });
    return uniqueCombinations;
}

function filterForResistorRequirements(resistors, minResistance, maxResistance, power) {
    const filteredResistors = resistors.filter(item => {
        if (item.totalResistance * LowerResistorTolerance < minResistance || item.totalResistance * UpperResistorTolerance > maxResistance) {
            return false;
        }
        if (item.totalPower < power) {
            return false;
        }
        return true;
    });

    if (filteredResistors.length == 0) {
        return null
    }

    filteredResistors.sort((a, b) => {
        if (a.totalPrice !== b.totalPrice) {
            return a.totalPrice - b.totalPrice;
        }
        return a.totalPower - b.totalPower;
    });
    return filteredResistors.slice(0, 3);
}

export function calculateResistors(minR, maxR, power, dutyCycle, dutyCycleDuration) {
    const items = getEDFilteredResistors(braking_resistor_data, dutyCycle, dutyCycleDuration);
    const uniqueCombinations = findUniqueCombinations(items, 6);
    return filterForResistorRequirements(uniqueCombinations, minR, maxR, power);
}

if (DEBUG) {
    const items = getEDFilteredResistors(braking_resistor_data, 40, 100);
    let uniqueCombinations = findUniqueCombinations(items, 6);
    console.log(uniqueCombinations);
    console.log(filterForResistorRequirements(uniqueCombinations, 8, 17, 35));
}

export function getResistorGraphic(resistor) {
    let picturePath="../sharedFiles/graphics/"
    if (resistor.resistorNetwork.length == 1) {
      switch (resistor.quantity) {
        case 1:
          return picturePath + "rn-S1.svg"
        case 2:
          if (resistor.resistorNetwork[0].inSeries) {
            return picturePath + "rn-S2.svg"
          }
          else {
            return "./graphics/rn-P2.svg"
          }
        case 3:
          if (resistor.resistorNetwork[0].inSeries) {
            return picturePath +"rn-S3.svg"
          }
          else {
            return picturePath +"rn-P3.svg"
          }
        case 4:
          if (resistor.resistorNetwork[0].inSeries) {
            return picturePath +"rn-S4.svg"
          }
          else {
            return picturePath +"rn-P4.svg"
          }
        case 5:
          if (resistor.resistorNetwork[0].inSeries) {
            return picturePath +"rn-S5.svg"
          }
          else {
            return picturePath +"rn-P5.svg"
          }
        case 6:
          if (resistor.resistorNetwork[0].inSeries) {
            return picturePath +"rn-S6.svg"
          }
          else {
            return picturePath +"rn-P6.svg"
          }
        default: return null;
      }
    }
    else if (resistor.resistorNetwork.length == 2) {
      if (resistor.resistorNetwork.quantity == 2) {
        return picturePath +"rn-P2S2.svg"
      }
      else {
        return picturePath +"rn-P2S3.svg"
      }
    }
    else if (resistor.resistorNetwork.length == 3) {
      return picturePath +"rn-P3S2.svg"
    }
    return null;
  }