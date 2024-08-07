// Imports
import { getLineParameters } from "./helpers.js";

// CR700 Internal Braking Transistor Data
const tb_70Percent = {
  brakingTorque: 70,
  brakeTime: [1.0, 10.0, 50.0, 230.0, 500.0, 760.0, 1200.0, 1600.0, 1800.0],
  dutyCycle: [90.0, 90.0, 80.0, 50.0, 30.0, 20.0, 10.0, 5.0, 3.0]
};
const tb_84Percent = {
  brakingTorque: 84,
  brakeTime: [1.0, 10.0, 20.0, 50.0, 90.0, 160.0, 270.0, 380.0, 420.0, 500.0],
  dutyCycle: [50.0, 50.0, 45.0, 40.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
};
const tb_98Percent = {
  brakingTorque: 98,
  brakeTime: [1.0, 16.0, 58.0, 106.0, 150.0, 170.0, 200.0],
  dutyCycle: [35.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
};
const tb_120Percent = {
  brakingTorque: 120,
  brakeTime: [1.0, 5.0, 20.0, 43.0, 67.0, 80.0, 85.0],
  dutyCycle: [20.0, 19.0, 16.0, 10.0, 5.0, 3.0, 1.0]
};
const tb_141Percent = {
  brakingTorque: 141,
  brakeTime: [1.0, 5.0, 14.0, 20.0, 35.0, 45.0, 55.0],
  dutyCycle: [14.0, 12.0, 10.0, 7.5, 5.0, 3.0, 1.0]
};
const tb_155Percent = {
  brakingTorque: 155,
  brakeTime: [1.0, 5.0, 10.0, 21.0, 29.0, 40.0],
  dutyCycle: [11.0, 9.0, 7.0, 5.0, 3.0, 1.0]
};

/*export const cr700OLCurves = [tb_70Percent, tb_84Percent, tb_98Percent, tb_120Percent, tb_141Percent, tb_155Percent];*/

export const cr700OLCurves = [tb_155Percent, tb_141Percent, tb_120Percent, tb_98Percent, tb_84Percent, tb_70Percent]

// CR700 Internal Braking Transistor Data (Linear Approximation)
  // Linear approximation between 10% - 40% ED and 10s to 300s operation time
const tb_70P_linear = {
  brakingTorque: 70,
  slope: -0.14,
  yCrossing: 84
};
const tb_71P_linear = {
  brakingTorque: 71,
  slope: -0.142,
  yCrossing: 81.43
};
const tb_72P_linear = {
  brakingTorque: 72,
  slope: -0.14,
  yCrossing: 78.86
};
const tb_73P_linear = {
  brakingTorque: 73,
  slope: -0.146,
  yCrossing: 76.29
};
const tb_74P_linear = {
  brakingTorque: 74,
  slope: -0.149,
  yCrossing: 73.71
};
const tb_75P_linear = {
  brakingTorque: 75,
  slope: -0.151,
  yCrossing: 71.14
};
const tb_76P_linear = {
  brakingTorque: 76,
  slope: -0.153,
  yCrossing: 68.57
};
const tb_77P_linear = {
  brakingTorque: 77,
  slope: -0.155,
  yCrossing: 66
};
const tb_78P_linear = {
  brakingTorque: 78,
  slope: -0.157,
  yCrossing: 63.43
};
const tb_79P_linear = {
  brakingTorque: 79,
  slope: -0.159,
  yCrossing: 60.86
};
const tb_80P_linear = {
  brakingTorque: 80,
  slope: -0.161,
  yCrossing: 58.29
};
const tb_81P_linear = {
  brakingTorque: 81,
  slope: -0.164,
  yCrossing: 55.71
};
const tb_82P_linear = {
  brakingTorque: 82,
  slope: -0.166,
  yCrossing: 53.14
};
const tb_83P_linear = {
  brakingTorque: 83,
  slope: -0.168,
  yCrossing: 50.57
};
const tb_84P_linear = {
  brakingTorque: 84,
  slope: -0.17,
  yCrossing: 48
};
const tb_86P_linear = {
  brakingTorque: 86,
  slope: -0.179,
  yCrossing: 46
};
const tb_88P_linear = {
  brakingTorque: 88,
  slope: -0.187,
  yCrossing: 44
};
const tb_90P_linear = {
  brakingTorque: 90,
  slope: -0.196,
  yCrossing: 42
};
const tb_92P_linear = {
  brakingTorque: 92,
  slope: -0.204,
  yCrossing: 40
};
const tb_94P_linear = {
  brakingTorque: 94,
  slope: -0.213,
  yCrossing: 38
};
const tb_96P_linear = {
  brakingTorque: 96,
  slope: -0.221,
  yCrossing: 36
};
const tb_98P_linear = {
  brakingTorque: 98,
  slope: -0.23,
  yCrossing: 34
};
const tb_100P_linear = {
  brakingTorque: 100,
  slope: -0.23,
  yCrossing: 32.73
};
const tb_102P_linear = {
  brakingTorque: 102,
  slope: -0.23,
  yCrossing: 31.45
};
const tb_104P_linear = {
  brakingTorque: 104,
  slope: -0.23,
  yCrossing: 30.18
};
const tb_108P_linear = {
  brakingTorque: 108,
  slope: -0.23,
  yCrossing: 27.64
};
const tb_112P_linear = {
  brakingTorque: 112,
  slope: -0.23,
  yCrossing: 25.09
};
const tb_116P_linear = {
  brakingTorque: 116,
  slope: -0.23,
  yCrossing: 22.55
};
const tb_120P_linear = {
  brakingTorque: 120,
  slope: -0.23,
  yCrossing: 20
};
const tb_125P_linear = {
  brakingTorque: 125,
  slope: -0.23,
  yCrossing: 18.25
};
const tb_130P_linear = {
  brakingTorque: 130,
  slope: -0.23,
  yCrossing: 16.50
};
const tb_135P_linear = {
  brakingTorque: 135,
  slope: -0.23,
  yCrossing: 14.75
};
const tb_141P_linear = {
  brakingTorque: 141,
  slope: -0.23,
  yCrossing: 13
};

export const cr700OLLinear = [tb_141P_linear, tb_135P_linear, tb_130P_linear, tb_125P_linear, tb_120P_linear, tb_116P_linear, tb_112P_linear, tb_108P_linear, tb_104P_linear, tb_102P_linear, tb_100P_linear, tb_98P_linear, tb_96P_linear, tb_94P_linear, tb_92P_linear, tb_90P_linear, tb_88P_linear, tb_86P_linear, tb_84P_linear, tb_83P_linear, tb_82P_linear, tb_81P_linear, tb_80P_linear, tb_79P_linear, tb_78P_linear, tb_77P_linear, tb_76P_linear, tb_75P_linear, tb_74P_linear, tb_73P_linear, tb_72P_linear, tb_71P_linear, tb_70P_linear];


// CR700 Drive Data
const cr700_4003 = {
  type: "CR70C4003",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 1.1,                  // Heavy duty output power rating in [kW]
  hdCurrent: 3.4,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 165.0,     // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 4.7,      // Maximum braking current in [A]
  contDischargeCurrent: 0.63,    // Continuous braking current in [A]
};
const cr700_4005 = {
  type: "CR70C4005",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 1.5,                  // Heavy duty output power rating in [kW]
  hdCurrent: 4.8,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 110.0,     // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 7.1,      // Maximum braking current in [A]
  contDischargeCurrent: 0.57,    // Continuous braking current in [A]
};
const cr700_4006 = {
  type: "CR70C4006",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 2.2,                  // Heavy duty output power rating in [kW]
  hdCurrent: 5.5,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 110.0,     // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 7.1,      // Maximum braking current in [A]
  contDischargeCurrent: 0.84,    // Continuous braking current in [A]
};
const cr700_4007 = {
  type: "CR70C4007",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 3.0,                  // Heavy duty output power rating in [kW]
  hdCurrent: 7.2,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 55.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 14.3,     // Maximum braking current in [A]
  contDischargeCurrent: 1.14,    // Continuous braking current in [A]
};
const cr700_4009 = {
  type: "CR70C4009",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 4.0,                  // Heavy duty output power rating in [kW]
  hdCurrent: 9.2,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 55.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 14.3,     // Maximum braking current in [A]
  contDischargeCurrent: 1.52,    // Continuous braking current in [A]
};
const cr700_4015 = {
  type: "CR70C4015",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 5.5,                  // Heavy duty output power rating in [kW]
  hdCurrent: 14.8,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 32.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 24.6,     // Maximum braking current in [A]
  contDischargeCurrent: 2.10,    // Continuous braking current in [A]
};
const cr700_4018 = {
  type: "CR70C4018",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 7.5,                  // Heavy duty output power rating in [kW]
  hdCurrent: 18.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 32.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 24.6,     // Maximum braking current in [A]
  contDischargeCurrent: 2.86,    // Continuous braking current in [A]
};
const cr700_4024 = {
  type: "CR70C4024",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 11.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 24.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 20.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 39.4,     // Maximum braking current in [A]
  contDischargeCurrent: 4.20,    // Continuous braking current in [A]
};
const cr700_4031 = {
  type: "CR70C4031",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 15.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 31.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 20.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 39.4,     // Maximum braking current in [A]
  contDischargeCurrent: 5.73,    // Continuous braking current in [A]
};
const cr700_4039 = {
  type: "CR70C4039",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 18.5,                 // Heavy duty output power rating in [kW]
  hdCurrent: 39.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 41.0,     // Maximum braking current in [A]
  contDischargeCurrent: 7.07,    // Continuous braking current in [A]
};
const cr700_4045 = {
  type: "CR70C4045",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 22.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 45.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 41.0,     // Maximum braking current in [A]
  contDischargeCurrent: 8.41,    // Continuous braking current in [A]
};
const cr700_4060 = {
  type: "CR70C4060",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 30.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 60.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 41.0,     // Maximum braking current in [A]
  contDischargeCurrent: 11.4,    // Continuous braking current in [A]
};
const cr700_4075 = {
  type: "CR70C4075",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 37.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 75.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 10.6,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 74.3,     // Maximum braking current in [A]
  contDischargeCurrent: 14.1,    // Continuous braking current in [A]
};
const cr700_4091 = {
  type: "CR70C4091",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 45.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 90.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 8.7,       // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 90.5,     // Maximum braking current in [A]
  contDischargeCurrent: 17.2,    // Continuous braking current in [A]
};
const cr700_4112 = {
  type: "CR70C4112",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 55.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 112.0,              // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 7.2,       // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 109.4,    // Maximum braking current in [A]
  contDischargeCurrent: 21.0,    // Continuous braking current in [A]
};
const cr700_4150 = {
  type: "CR70C4150",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 75.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 150.0,              // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 5.2,       // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 151.5,    // Maximum braking current in [A]
  contDischargeCurrent: 28.6,    // Continuous braking current in [A]
};
const cr700_4180 = {
  type: "CR70C4180",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 90.0,                  // Heavy duty output power rating in [kW]
  hdCurrent: 180.0,               // Heavy duty output current rating in [A]
};
const cr700_4216 = {
  type: "CR70C4216",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 110.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 216.0,               // Heavy duty output current rating in [A]
};
const cr700_4260 = {
  type: "CR70C4260",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 132.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 260.0,               // Heavy duty output current rating in [A]
};
const cr700_4304 = {
  type: "CR70C4304",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 160.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 304.0,               // Heavy duty output current rating in [A]
};
const cr700_4371 = {
  type: "CR70C4371",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 200.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 371.0,               // Heavy duty output current rating in [A]
};
const cr700_4414 = {
  type: "CR70C4414",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 220.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 414.0,               // Heavy duty output current rating in [A]
};
const cr700_4453 = {
  type: "CR70C4453",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 250.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 453.0,               // Heavy duty output current rating in [A]
};
const cr700_4605 = {
  type: "CR70C4605",
  voltageClass: 400,
  internalBrakeTransistor: false, // Internal braking transistor
  hdPower: 315.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 605.0,               // Heavy duty output current rating in [A]
};

export const cr700_data = [cr700_4003, cr700_4005, cr700_4006, cr700_4007, cr700_4009, cr700_4015, cr700_4018, cr700_4024, cr700_4031, cr700_4039, cr700_4045, cr700_4060, cr700_4075, cr700_4091, cr700_4112, cr700_4150, cr700_4180, cr700_4216, cr700_4260, cr700_4304, cr700_4371, cr700_4414, cr700_4453, cr700_4605];

// Find the linear segment on a braking curve that corresponds to the actual braking time
export const findBrakeCurveSegment = (tb_curve, actBrakeTime) => {
  let timeIndex = tb_curve.brakeTime.findIndex(brakingTime => actBrakeTime < brakingTime);
  //console.log(timeIndex);
  const x1 = tb_curve.brakeTime[timeIndex - 1];
  const x2 = tb_curve.brakeTime[timeIndex];
  const y1 = tb_curve.dutyCycle[timeIndex - 1];
  const y2 = tb_curve.dutyCycle[timeIndex];

  const line = getLineParameters(x1, y1, x2, y2);
  
  return {
    point1: [x1, y1],
    point2: [x2, y2],
    slope: line.m,
    yCrossing: line.b
  };
}

// Get the allowable duty cycle for a given braking time on a specific overload curve
export const getAllowableED = (tb_curve, actBrakeTime) => {
  const segment = findBrakeCurveSegment(tb_curve, actBrakeTime);
  return segment.slope * actBrakeTime + segment.yCrossing;   // Solve y (dutyCycle) for another x value (actBrakeTime) using y = mx + b
}