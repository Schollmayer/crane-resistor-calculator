//define breaking resistor
//Some resistors have the same values in their -UL-T version and in der their standart version
//These resistors have been left out 
//All prices are the list prices in Euro

const DEBUG = true;

const EDTime = 120;
//TODO find price
const RH_0100W050 = {
  type: "RH-0100W050-10-UL",
  resistance: 50,
  tolerance: 0.1,
  contPower: 50,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 450
    },
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 300
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 250
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 150
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 100
    },
  ],
}

const RH_0100W330 = {
  type: "RH-0100W330",
  resistance: 330,
  tolerance: 0.1,
  contPower: 50,
  price: 102,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 450
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 250
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 150
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 100
    },
  ],
}

const RH_0100W830 = {
  type: "RH-0100W830",
  resistance: 830,
  tolerance: 0.1,
  contPower: 50,
  price: 65,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 450
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 250
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 150
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 100
    },
  ],
}

const RH_0200W045 = {
  type: "RH-0200W045",
  resistance: 45,
  tolerance: 0.1,
  contPower: 140,
  price: 104,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 1260
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 700
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 420
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 280
    },
  ],
}

const RH_0200W045_UL_T = {
  type: "RH-0200W045_UL_T",
  resistance: 45,
  tolerance: 0.1,
  contPower: 110,
  price: 108,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 990
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 550
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 330
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 220
    },
  ],
}

const RH_0260W120 = {
  type: "RH-0260W120",
  resistance: 120,
  tolerance: 0.1,
  contPower: 250,
  price: 102,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 500
    },
  ],
}

const RH_0260W135 = {
  type: "RH-0260W135",
  resistance: 135,
  tolerance: 0.1,
  contPower: 250,
  price: 102,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 500
    },
  ],
}
//TODO find price
const RH_0260W220 = {
  type: "RH-0260W220",
  resistance: 220,
  tolerance: 0.1,
  contPower: 250,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 500
    },
  ],
}

const RH_0260W270 = {
  type: "RH-0260W270",
  resistance: 270,
  tolerance: 0.1,
  contPower: 250,
  price: 57,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2250,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 500
    },
  ],
}

const RH_0390W070 = {
  type: "RH-0390W070",
  resistance: 70,
  tolerance: 0.1,
  contPower: 300,
  price: 79,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2700,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 900
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 600
    },
  ],
}
//TODO find price
const RH_0400W024 = {
  type: "RH-0400W024",
  resistance: 24,
  tolerance: 0.1,
  contPower: 400,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 800
    },
  ],
}
//TODO find price
const RH_0400W032 = {
  type: "RH-0400W032",
  resistance: 32,
  tolerance: 0.1,
  contPower: 400,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 800
    },
  ],
}
//TODO find price
const RH_0400W045 = {
  type: "RH-0400W045",
  resistance: 45,
  tolerance: 0.1,
  contPower: 400,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 800
    },
  ],
}

const RH_0520W120 = {
  type: "RH-0520W120",
  resistance: 120,
  tolerance: 0.1,
  contPower: 400,
  price: 62,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 800
    },
  ],
}
//TODO find price
const RH_0780W032 = {
  type: "RH-0780W032",
  resistance: 32,
  tolerance: 0.1,
  contPower: 500,
  price: 99,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 4500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1500
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1000
    },
  ],
}

const RH_0780W040 = {
  type: "RH-0780W040",
  resistance: 40,
  tolerance: 0.1,
  contPower: 500,
  price: 189,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 4500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1500
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1000
    },
  ],
}

const RH_0780W040_10 = {
  type: "RH-0780W040-10",
  resistance: 40,
  tolerance: 0.1,
  contPower: 250,
  price: 78,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2250,
    },
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 1500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1250,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 750
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 500
    },
  ],
}

const RH_0780W040_UL_T = {
  type: "RH-0780W040-UL-T",
  resistance: 40,
  tolerance: 0.1,
  contPower: 400,
  price: 270,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 3600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 800
    },
  ],
}

const RH_1000W120 = {
  type: "RH-1000W120",
  resistance: 120,
  tolerance: 0.1,
  contPower: 900,
  price: 199,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2700,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1400,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1100
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1000
    },
  ],
}

const RH_1560W040 = {
  type: "RH-1560W040",
  resistance: 40,
  tolerance: 0.1,
  contPower: 1500,
  price: 215,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 8200,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 3800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 2600
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 2000
    },
  ],
}

const RH_1560W040_UL_T = {
  type: "RH-1560W040-UL-T",
  resistance: 40,
  tolerance: 0.1,
  contPower: 1000,
  price: 364,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 5500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 2500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 1700
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 1300
    },
  ],
}

const RH_1560W040_10 = {
  type: "RH-1560W040-10",
  resistance: 40,
  tolerance: 0.1,
  contPower: 300,
  price: 110,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 2700,
    },
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 1800,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 1500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 900
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 600
    },
  ],
}

const RH_2700W025 = {
  type: "RH-2700W025",
  resistance: 25,
  tolerance: 0.1,
  contPower: 2600,
  price: 340,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 11200,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 5500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 4000
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 3200
    },
  ],
}

const RH_2700W025_UL_T = {
  type: "RH-2700W025-UL-T",
  resistance: 25,
  tolerance: 0.1,
  contPower: 1800,
  price: 416,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 7800,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 3800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 2800
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 2200
    },
  ],
}


const RH_29000W3P8_10 = {
  type: "RH-29000W3P8-10",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 8000,
  price: 1117,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 29000,
    },
  ],
}

const RH_3700W025 = {
  type: "RH-3700W025",
  resistance: 25,
  tolerance: 0.1,
  contPower: 3600,
  price: 438,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 18000,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 8600,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 6000
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 4700
    },
  ],
}

const RH_3700W025_UL_T = {
  type: "RH-3700W025-UL-T",
  resistance: 25,
  tolerance: 0.1,
  contPower: 2500,
  price: 476,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 12500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 6000,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 4200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 3300
    },
  ],
}

const RH_38500W3P8_10 = {
  type: "RH-38500W3P8-10",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 9500,
  price: 1207,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 38500,
    },
  ],
}

const RH_38500W3P8_10_UL_T = {
  type: "RH-38500W3P8-10-UL-T",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 8500,
  price: 1293,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 38500,
    },
  ],
}

const RH_48000W3P8_10 = {
  type: "RH-48000W3P8-10",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 12000,
  price: 1198,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 48000,
    },
  ],
}
const RH_48000W3P8_10_UL_T = {
  type: "RH-48000W3P8-10-UL-T",
  resistance: 3.8,
  tolerance: 0.1,
  contPower: 10800,
  price: 1308,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 48000,
    },
  ],
}

const RH_4800W022 = {
  type: "RH-4800W022",
  resistance: 22,
  tolerance: 0.1,
  contPower: 4600,
  price: 426,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 20000,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 9800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 7100
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 5700
    },
  ],
}

const RH_4800W022_10 = {
  type: "RRH-4800W022-10",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1400,
  price: 278,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 5200,
    },
  ],
}

const RH_4800W022_10_UL_T = {
  type: "RRH-4800W022-10-UL-T",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1000,
  price: 371,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 3700,
    },
  ],
}

const RH_4800W022_UL_T = {
  type: "RH-4800W022-UL-T",
  resistance: 22,
  tolerance: 0.1,
  contPower: 3200,
  price: 585,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 13900,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 6800,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 4900
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 4000
    },
  ],
}

const RH_6000W022 = {
  type: "RH-6000W022",
  resistance: 22,
  tolerance: 0.1,
  contPower: 5800,
  price: 497,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 27400,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 13200,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 9400
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 7400
    },
  ],
}

const RH_6000W022_10 = {
  type: "RH-6000W022-10",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1600,
  price: 287,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 6000,
    },
  ],
}

const RH_6000W022_10_UL_T = {
  type: "RH-6000W022-10-UL-T",
  resistance: 22,
  tolerance: 0.1,
  contPower: 1200,
  price: 380,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 4500,
    },
  ],
}

const RH_6000W022_UL_T = {
  type: "RH-6000W022-UL-T",
  resistance: 22,
  tolerance: 0.1,
  contPower: 4000,
  price: 616,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 18900,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 9100,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 6500
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 5100
    },
  ],
}

const RH_7500W023 = {
  type: "RH_7500W023",
  resistance: 23,
  tolerance: 0.1,
  contPower: 7200,
  price: 790,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 28500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 14200,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 10400
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 8500
    },
  ],
}

const RH_7500W023_UL_T = {
  type: "RH_7500W023-UL-T",
  resistance: 23,
  tolerance: 0.1,
  contPower: 5000,
  price: 781,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 19800,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 9900,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 7200
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 5900
    },
  ],
}

const RH_9600W015 = {
  type: "RH-9600W015",
  resistance: 15,
  tolerance: 0.1,
  contPower: 9200,
  price: 826,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 39600,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 19400,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 14000
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 11200
    },
  ],
}

const RH_9600W015_10 = {
  type: "RH-9600W015-10",
  resistance: 15,
  tolerance: 0.1,
  contPower: 3000,
  price: 470,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 11400,
    },
  ],
}

const RH_9600W015_10_UL_T = {
  type: "RH-9600W015-10-UL-T",
  resistance: 15,
  tolerance: 0.1,
  contPower: 2100,
  price: 497,
  ratedPower: [
    {
      type: "ED 10%",
      edPercentage: 10,
      power: 8000,
    },
  ],
}

const RH_9600W015_UL_T = {
  type: "RH-9600W015-UL-T",
  resistance: 15,
  tolerance: 0.1,
  contPower: 6400,
  price: 876,
  ratedPower: [
    {
      type: "ED 6%",
      edPercentage: 6,
      power: 27500,
    },
    {
      type: "ED 15%",
      edPercentage: 15,
      power: 13500,
    },
    {
      type: "ED 25%",
      edPercentage: 25,
      power: 9700
    },
    {
      type: "ED 40%",
      edPercentage: 40,
      power: 7800
    },
  ],
}

//46 Resistors
export const breaking_resistor_data = [
  RH_0100W050, RH_0100W330, RH_0100W830, RH_0200W045, RH_0200W045_UL_T, RH_0260W120,
  RH_0260W135, RH_0260W220, RH_0260W270, RH_0390W070, RH_0400W024, RH_0400W032,
  RH_0400W045, RH_0520W120, RH_0780W032, RH_0780W040, RH_0780W040_10,
  RH_0780W040_UL_T, RH_1000W120, RH_1560W040_UL_T, RH_1560W040_10,
  RH_1560W040, RH_2700W025, RH_2700W025_UL_T, RH_29000W3P8_10,
  RH_3700W025, RH_3700W025_UL_T, RH_38500W3P8_10,
  RH_38500W3P8_10_UL_T, RH_48000W3P8_10, RH_4800W022_10_UL_T,
  RH_48000W3P8_10_UL_T, RH_4800W022, RH_4800W022_10, RH_4800W022_UL_T,
  RH_6000W022, RH_6000W022_10, RH_6000W022_10_UL_T,
  RH_7500W023_UL_T, RH_7500W023, RH_6000W022_UL_T, RH_6000W022_UL_T,
  RH_9600W015, RH_9600W015_10, RH_9600W015_10_UL_T, RH_9600W015_UL_T
]
 
export const testResistorList = [RH_9600W015, RH_0260W220];

function getPowerByEdPercentage(edPercentage, breakingResistor, breakingTime) {
  const { ratedPower, contPower } = breakingResistor;
  if (ratedPower.length == 1) {
    if (ratedPower[0].edPercentage == edPercentage)
      return ratedPower[0].power;
    else {
      return contPower;
    }
  }
  else if (breakingTime > EDTime) {
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

export function getEDFilteredResistors(breaking_resistor_data, edPercentage, breakingTime) {
  var resistorArr = [];
  for (let i = 0; i < breaking_resistor_data.length; i++) {
    let resistorPower = getPowerByEdPercentage(edPercentage, breaking_resistor_data[i], breakingTime)
    const importantResistorData = {
      type: breaking_resistor_data[i].type,
      resistance: breaking_resistor_data[i].resistance,
      tolerance: breaking_resistor_data[i].tolerance,
      power: resistorPower,
      price: breaking_resistor_data[i].price,
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
  console.log( getEDFilteredResistors(breaking_resistor_data, 30, 100));
}


