//define braking resistor
//Some resistors have the same values in their -UL-T version and in der their standard version
//These resistors have been left out 
//All prices are the list prices in Euro
//resistance in Ohm
//contPower/power in kW

const DEBUG = false;

const EDTime = 120;
//TODO find price
/*
Resistor is not listed in sales tool
const RH_0100W050 = {
  type: "RH-0100W050-10-UL",
  resistance: 50,
  tolerance: 0.1,
  contPower: 0.050,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 0.450
    },
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 0.300
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 0.250
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.150
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.100
    },
  ],
}
*/
const RH_0100W330 = {
  type: "RH-0100W330 [SAP-No. 10011408]",
  resistance: 330,
  tolerance: 0.1,
  contPower: 0.050,
  price: 102,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 0.450
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 0.250
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.150
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.100
    },
  ],
}

const RH_0100W830 = {
  type: "RH-0100W830 [SAP-No. 10004341]",
  resistance: 830,
  tolerance: 0.1,
  contPower: 0.050,
  price: 65,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 0.450
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 0.250
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.150
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.100
    },
  ],
}

//Not in NonConfigurableProducts
const RH_0200W045 = {
  type: "RH-0200W045 [SAP-No. 10011412]",
  resistance: 45,
  tolerance: 0.1,
  contPower: 0.140,
  price: 104,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 1.260
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 0.700
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.420
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.280
    },
  ],
}

//Not in NonConfigurableProducts
const RH_0200W045_UL_T = {
  type: "RH-0200W045-UL-T [SAP-No. 10011413]",
  resistance: 45,
  tolerance: 0.1,
  contPower: 0.110,
  price: 108,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 0.990
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 0.550
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.330
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.220
    },
  ],
}

const RH_0260W120 = {
  type: "RH-0260W120 [SAP-No. 10004342]",
  resistance: 120,
  tolerance: 0.1,
  contPower: 0.250,
  price: 102,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.500
    },
  ],
}

const RH_0260W135 = {
  type: "RH-0260W135 [SAP-No. 10004343]",
  resistance: 135,
  tolerance: 0.1,
  contPower: 0.250,
  price: 102,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.500
    },
  ],
}
//TODO find price
/*
Resistor is not listed in sales tool
const RH_0260W220 = {
  type: "RH-0260W220",
  resistance: 220,
  tolerance: 0.1,
  contPower: 0.250,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.500
    },
  ],
}
*/
const RH_0260W270 = {
  type: "RH-0260W270 [SAP-No. 10004345]",
  resistance: 270,
  tolerance: 0.1,
  contPower: 0.250,
  price: 57,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.500
    },
  ],
}

const RH_0390W070 = {
  type: "RH-0390W070 [SAP-No. 10004346]",
  resistance: 70,
  tolerance: 0.1,
  contPower: 0.300,
  price: 79,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.700,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.900
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.600
    },
  ],
}
//Not in NonConfigurableProducts
const RH_0400W024 = {
  type: "RH-0400W024 [SAP-No. 10011424]",
  resistance: 24,
  tolerance: 0.1,
  contPower: 0.400,
  price: 119, //Price of RH-0400W024-UL-T as only this one was listed.
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3.600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.800
    },
  ],
}

const RH_0400W032_UL_T = {
  type: "RH-0400W032-UL-T [SAP-No. 10011425]",
  resistance: 32,
  tolerance: 0.1,
  contPower: 0.400,
  price: 131,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3.600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.800
    },
  ],
}

const RH_0400W045_UL_T = {
  type: "RH-0400W045-UL-T [SAP-No. 10011426]",
  resistance: 45,
  tolerance: 0.1,
  contPower: 0.400,
  price: 108,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3.600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.800
    },
  ],
}

const RH_0520W120 = {
  type: "RH-0520W120 [SAP-No. 10004347]",
  resistance: 120,
  tolerance: 0.1,
  contPower: 0.400,
  price: 62,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3.600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.800
    },
  ],
}
//TODO find price
/*
Resistor is not listed in sales tool
const RH_0780W032 = {
  type: "RH-0780W032",
  resistance: 32,
  tolerance: 0.1,
  contPower: 0.500,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 4.500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.500
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1.000
    },
  ],
}
*/
const RH_0780W040 = {
  type: "RH-0780W040 [SAP-No. 10004348]",
  resistance: 40,
  tolerance: 0.1,
  contPower: 0.500,
  price: 189,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 4.500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.500
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1.000
    },
  ],
}

const RH_0780W040_10 = {
  type: "RH-0780W040-10 [SAP-No. 10011431]",
  resistance: 40,
  tolerance: 0.1,
  contPower: 0.250,
  price: 78,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.250,
    },
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 1.500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.500
    },
  ],
}

const RH_0780W040_UL_T = {
  type: "RH-0780W040-UL-T [SAP-No. 10011430]",
  resistance: 40,
  tolerance: 0.1,
  contPower: 0.400,
  price: 270,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3.600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.800
    },
  ],
}

const RH_1000W120 = {
  type: "RH-1000W120 [SAP-No. 10004349]",
  resistance: 120,
  tolerance: 0.1,
  contPower: 0.900,
  price: 199,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.700,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.400,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.100
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1.000
    },
  ],
}

const RH_1560W040 = {
  type: "RH-1560W040 [SAP-No. 10004350]",
  resistance: 40,
  tolerance: 0.1,
  contPower: 1.500,
  price: 215,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 8.200,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 3.800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 2.600
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 2.000
    },
  ],
}

const RH_1560W040_UL_T = {
  type: "RH-1560W040-UL-T [SAP-No. 10011437]",
  resistance: 40,
  tolerance: 0.1,
  contPower: 1.000,
  price: 364,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 5.500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2.500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1.700
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1.300
    },
  ],
}

const RH_1560W040_10 = {
  type: "RH-1560W040-10 [SAP-No. 10011438]",
  resistance: 40,
  tolerance: 0.1,
  contPower: 0.300,
  price: 110,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2.700,
    },
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 1.800,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1.500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 0.900
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 0.600
    },
  ],
}

const RH_2700W025 = {
  type: "RH-2700W025 [SAP-No. 10004351]",
  resistance: 25,
  tolerance: 0.1,
  contPower: 2.600,
  price: 340,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 11.200,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 5.500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 4.000
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 3.200
    },
  ],
}

const RH_2700W025_UL_T = {
  type: "RH-2700W025-UL-T [SAP-No. 10011442]",
  resistance: 25,
  tolerance: 0.1,
  contPower: 1.800,
  price: 416,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 7.800,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 3.800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 2.800
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 2.200
    },
  ],
}


const RH_29000W3P8_10 = {
  type: "RH-29000W3P8-10 [SAP-No. 10011443]",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 8.000,
  price: 1117,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 29.000,
    },
  ],
}

const RH_3700W025 = {
  type: "RH-3700W025 [SAP-No. 10004352]",
  resistance: 25,
  tolerance: 0.1,
  contPower: 3.600,
  price: 438,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 18.000,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 8.600,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 6.000
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 4.700
    },
  ],
}

const RH_3700W025_UL_T = {
  type: "RH-3700W025-UL-T [SAP-No. 10011446]",
  resistance: 25,
  tolerance: 0.1,
  contPower: 2.500,
  price: 476,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 12.500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 6.000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 4.200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 3.300
    },
  ],
}

const RH_38500W3P8_10 = {
  type: "RH-38500W3P8-10 [SAP-No. 10011447]",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 9.500,
  price: 1207,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 38.500,
    },
  ],
}

const RH_38500W3P8_10_UL_T = {
  type: "RH-38500W3P8-10-UL-T",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 8.500,
  price: 1293,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 38.500,
    },
  ],
}

const RH_48000W3P8_10 = {
  type: "RH-48000W3P8-10 [SAP-No. 10004355]",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 12.000,
  price: 1198,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 48.000,
    },
  ],
}
const RH_48000W3P8_10_UL_T = {
  type: "RH-48000W3P8-10-UL-T [SAP-No. 10011453]",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 10.800,
  price: 1308,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 48.000,
    },
  ],
}

const RH_4800W022 = {
  type: "RH-4800W022 [SAP-No. 10004353]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 4.600,
  price: 426,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 20.000,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 9.800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 7.100
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 5.700
    },
  ],
}

const RH_4800W022_10 = {
  type: "RH-4800W022-10 [SAP-No. 10004354]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1.400,
  price: 278,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 5.200,
    },
  ],
}

const RH_4800W022_10_UL_T = {
  type: "RH-4800W022-10-UL-T [SAP-No. 10011451]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1.000,
  price: 371,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 3.700,
    },
  ],
}

const RH_4800W022_UL_T = {
  type: "RH-4800W022-UL-T [SAP-No. 10011449]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 3.200,
  price: 585,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 13.900,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 6.800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 4.900
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 4.000
    },
  ],
}

const RH_6000W022 = {
  type: "RH-6000W022 [SAP-No. 10004356]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 5.800,
  price: 497,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 27.400,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 13.200,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 9.400
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 7.400
    },
  ],
}

const RH_6000W022_10 = {
  type: "RH-6000W022-10 [SAP-No. 10011456]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1.600,
  price: 287,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 6.000,
    },
  ],
}

const RH_6000W022_10_UL_T = {
  type: "RH-6000W022-10-UL-T [SAP-No. 10011457]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1.200,
  price: 380,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 4.500,
    },
  ],
}

const RH_6000W022_UL_T = {
  type: "RH-6000W022-UL-T [SAP-No. 10011455]",
  resistance: 22,
  tolerance: 0.1,
  contPower: 4.000,
  price: 616,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 18.900,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 9.100,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 6.500
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 5.100
    },
  ],
}

const RH_7500W023 = {
  type: "RH-7500W023 [SAP-No. 10004357]",
  resistance: 23,
  tolerance: 0.1,
  contPower: 7.200,
  price: 790,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 28.500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 14.200,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 10.400
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 8.500
    },
  ],
}

const RH_7500W023_UL_T = {
  type: "RH-7500W023-UL-T [SAP-No. 10011459]",
  resistance: 23,
  tolerance: 0.1,
  contPower: 5.000,
  price: 781,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 19.800,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 9.900,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 7.200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 5.900
    },
  ],
}

const RH_9600W015 = {
  type: "RH-9600W015 [SAP-No. 10004358]",
  resistance: 15,
  tolerance: 0.1,
  contPower: 9.200,
  price: 826,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 39.600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 19.400,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 14.000
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 11.200
    },
  ],
}

const RH_9600W015_10 = {
  type: "RH-9600W015-10 [SAP-No. 10011463]",
  resistance: 15,
  tolerance: 0.1,
  contPower: 3.000,
  price: 470,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 11.400,
    },
  ],
}

const RH_9600W015_10_UL_T = {
  type: "RH-9600W015-10-UL-T [SAP-No. 10011464]",
  resistance: 15,
  tolerance: 0.1,
  contPower: 2.100,
  price: 497,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 8.000,
    },
  ],
}

const RH_9600W015_UL_T = {
  type: "RH-9600W015-UL-T [SAP-No. 10011462]",
  resistance: 15,
  tolerance: 0.1,
  contPower: 6.400,
  price: 876,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 27.500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 13.500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 9.700
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 7.800
    },
  ],
}

//46 Resistors
export const braking_resistor_data = [
  /*RH_0100W050,*/ RH_0100W330, RH_0100W830, RH_0200W045, RH_0200W045_UL_T, RH_0260W120,
  RH_0260W135, /*RH_0260W220,*/ RH_0260W270, RH_0390W070, RH_0400W024, RH_0400W032_UL_T,
  RH_0400W045_UL_T, RH_0520W120, /*RH_0780W032,*/ RH_0780W040, RH_0780W040_10,
  RH_0780W040_UL_T, RH_1000W120, RH_1560W040_UL_T, RH_1560W040_10,
  RH_1560W040, RH_2700W025, RH_2700W025_UL_T, RH_29000W3P8_10,
  RH_3700W025, RH_3700W025_UL_T, RH_38500W3P8_10,
  RH_38500W3P8_10_UL_T, RH_48000W3P8_10, RH_4800W022_10_UL_T,
  RH_48000W3P8_10_UL_T, RH_4800W022, RH_4800W022_10, RH_4800W022_UL_T,
  RH_6000W022, RH_6000W022_10, RH_6000W022_10_UL_T,
  RH_7500W023_UL_T, RH_7500W023, RH_6000W022_UL_T, RH_6000W022_UL_T,
  RH_9600W015, RH_9600W015_10, RH_9600W015_10_UL_T, RH_9600W015_UL_T
]
 
export const testResistorList = [RH_9600W015, RH_0100W330];

/**Filter or interpolate the correct power rating according to the braking time and edPercentage*/
function getPowerByEdPercentage(edPercentage, brakingResistor, brakingTime) {
  const { ratedPower, contPower } = brakingResistor;
  if (ratedPower.length == 1) {
    if (ratedPower[0].edPercentage == edPercentage)
      return ratedPower[0].power;
    else {
      return contPower;
    }
  }
  else if (brakingTime > EDTime) {
    return contPower;
  }
  else if (edPercentage <= 6) {
    return ratedPower[0].power;
  } else if (edPercentage > 40) {
    return contPower;
  } else {
    // Find the two closest points for interpolation
    let lowerIndex = 0;
    let upperIndex = 0;
    for (let i = 1; i < ratedPower.length; i++) {

      if (ratedPower[i].edPercentage == edPercentage){
        return ratedPower[i].power;
      }
      else if (ratedPower[i].edPercentage > edPercentage) {
        upperIndex = i;
        lowerIndex = i - 1;
        break;
      }
    }
    // Linear interpolation
    const x1 = ratedPower[lowerIndex].edPercentage;
    const x2 = ratedPower[upperIndex].edPercentage;
    const y1 = ratedPower[lowerIndex].power;
    const y2 = ratedPower[upperIndex].power;
    const interpolatedPower =
      y1 + ((edPercentage - x1) / (x2 - x1)) * (y2 - y1);
    return interpolatedPower;
  }
}

/**Returns a list of resistor with corresponding power values which have been filtered for the correct edPercentage and brakingTime*/
export function getEDFilteredResistors(braking_resistor_data, edPercentage, brakingTime) {
  var resistorArr = [];
  for (let i = 0; i < braking_resistor_data.length; i++) {
    let resistorPower = getPowerByEdPercentage(edPercentage, braking_resistor_data[i], brakingTime)
    const importantResistorData = {
      type: braking_resistor_data[i].type,
      resistance: braking_resistor_data[i].resistance,
      tolerance: braking_resistor_data[i].tolerance,
      power: resistorPower,
      price: braking_resistor_data[i].price,
    }
    resistorArr.push(importantResistorData);
  }
  return resistorArr;
}

if (DEBUG){
  // Example usage:
  //console.log(getPowerByEdPercentage(10,RH_9600W015_UL_T, 90));
  //console.log(getPowerByEdPercentage(30,RH_9600W015_UL_T, 130)); 
  //console.log(getPowerByEdPercentage(50,RH_9600W015_UL_T, 90));
  //console.log(getPowerByEdPercentage(22,RH_7500W023_UL_T, 100)); 
  console.log("getEDfilteredResistors");
  console.log( getEDFilteredResistors(braking_resistor_data, 30, 100));
}


