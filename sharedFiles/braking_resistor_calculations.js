import { braking_resistor_data, getEDFilteredResistors } from "./braking_resistor_data.js";

//As all resistors in the portfolio have 10% tolerance, a fixed value will be used to reduce computation time
const LowerResistorTolerance = 0.9;
const UpperResistorTolerance = 1.1;
const DEBUG = false;

function calculateResistorNetworkValues(resistorArray, resistorInSeries) {
  let totalQuantity = 0;
  let totalPower = 0;
  let totalResistance = 0;
  let totalPrice = 0;


  if (resistorInSeries) {
    resistorArray.forEach(resistorBlock => {
      totalQuantity += resistorBlock.quantity;
      totalPower += resistorBlock.totalPower;
      totalResistance += resistorBlock.totalResistance;
      totalPrice += resistorBlock.totalPrice;
    });
  }
  else {
    resistorArray.forEach(resistorBlock => {
      totalQuantity += resistorBlock.quantity;
      totalPower += resistorBlock.totalPower;
      totalResistance = (totalResistance * resistorBlock.totalResistance) / (totalResistance + resistorBlock.totalResistance);
      totalPrice += resistorBlock.totalPrice;
    });
  }

  let result = {
    quantity: totalQuantity,
    resistor: resistorArray[0].resistor,
    resistorNetwork: resistorArray,
    totalResistance: totalResistance,
    totalPower: totalPower,
    totalPrice: totalPrice
  };

  if (resistorInSeries) {
    result.inSeries = true;
  } else {
    result.inSeries = false;
  }

  return result;
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
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks, true));
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
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks, true));
    }
  });

  uniqueCombinations.forEach(resistorNetwork => {
    const resistorBlocks = [];
    if (resistorNetwork.quantity == 2 && resistorNetwork.resistorNetwork[0].inSeries == false) {
      resistorBlocks.push(resistorNetwork.resistorNetwork[0]);
      resistorBlocks.push(resistorNetwork.resistorNetwork[0]);
      //rn-P2S2
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks.slice(), true));
      resistorBlocks.push(resistorNetwork.resistorNetwork[0]);
      //rn-P2S3
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks, true));
    }

    const resistorBlocks2 = [];
    if (resistorNetwork.quantity == 3 && resistorNetwork.resistorNetwork[0].inSeries == false) {
      resistorBlocks2.push(resistorNetwork.resistorNetwork[0]);
      resistorBlocks2.push(resistorNetwork.resistorNetwork[0]);
      //rn-P3S2
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks2, true));
    }
    /*
    //Obsolete as P3S2 and P2S2 have the same resistance
    const resistorBlocks3 = [];
    if (resistorNetwork.quantity == 2 && resistorNetwork.resistorNetwork[0].inSeries == true) {
      resistorBlocks3.push(resistorNetwork.resistorNetwork[0]);
      resistorBlocks3.push(resistorNetwork.resistorNetwork[0]);
      //rn-S2P2
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks3, false));
      resistorBlocks3.push(resistorNetwork.resistorNetwork[0]);
      //rn-S2P3
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks3, false));
    }
      */
     //rn-S3P2 obsolete as S3P2 and P2S3 have the same resistance
    
    /* const resistorBlocks4 = [];
    if (resistorNetwork.quantity == 3 && resistorNetwork.resistorNetwork[0].inSeries == true) {
      resistorBlocks4.push(resistorNetwork.resistorNetwork[0]);
      resistorBlocks4.push(resistorNetwork.resistorNetwork[0]);
      uniqueCombinations.push(calculateResistorNetworkValues(resistorBlocks4, false));
    }

    */
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
