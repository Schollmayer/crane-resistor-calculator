// Define CR700 Internal Braking Transistor Data

const tb_70Percent = {
  brakingTorque = 70,
  brakeTime: [1.0, 10.0, 50.0, 100.0, 200.0, 500.0, 1000.0, 1600.0, 2200.0],
  dutyCycle: [90.0, 90.5, 80.0, 65.0, 55.0, 30.0, 14.0, 5.0, 2.5, 1.0]
};

const tb_84Percent = {
  brakingTorque = 84,
  brakeTime: [1.0, 10.0, 20.0, 50.0, 90.0, 160.0, 270.0, 380.0, 420.0, 500.0],
  dutyCycle: [50.0, 50.0, 45.0, 40.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
};

const tb_98Percent = {
  brakingTorque = 98,
  brakeTime: [1.0, 16.0, 58.0, 106.0, 150.0, 170.0, 200.0],
  dutyCycle: [35.0, 30.0, 20.0, 10.0, 5.0, 3.0, 1.0]
};

const tb_120Percent = {
  brakingTorque = 120,
  brakeTime: [1.0, 5.0, 20.0, 43.0, 67.0, 80.0, 85.0],
  dutyCycle: [20.0, 19.0, 16.0, 10.0, 5.0, 3.0, 1.0]
};

const tb_141Percent = {
  brakingTorque = 141,
  brakeTime: [1.0, 5.0, 14.0, 20.0, 35.0, 45.0, 55.0],
  dutyCycle: [14.0, 12.0, 10.0, 7.5, 5.0, 3.0, 1.0]
};

const tb_155Percent = {
  brakingTorque = 155,
  brakeTime: [1.0, 5.0, 10.0, 21.0, 29.0, 40.0],
  dutyCycle: [11.0, 9.0, 7.0, 5.0, 3.0, 1.0]
};

export const cr700OLCurves = [tb_70Percent, tb_84Percent, tb_98Percent, tb_120Percent, tb_141Percent, tb_155Percent];
  

const cr700_4003 = {
  type: "CIPR-CR70C4003",
  voltageClass: 400,
  hdPower: 1.1,                  // Heavy duty output power rating in [kW]
  hdCurrent: 3.4,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 165.0,     // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 4.7,      // Maximum braking current in [A]
  contDischargeCurrent: 0.63,    // Continuous braking current in [A]
};

const cr700_4005 = {
  type: "CIPR-CR70C4005",
  voltageClass: 400,
  hdPower: 1.5,                  // Heavy duty output power rating in [kW]
  hdCurrent: 4.8,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 110.0,     // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 7.1,      // Maximum braking current in [A]
  contDischargeCurrent: 0.57,    // Continuous braking current in [A]
};

const cr700_4005 = {
  type: "CIPR-CR70C4006",
  voltageClass: 400,
  hdPower: 2.2,                  // Heavy duty output power rating in [kW]
  hdCurrent: 5.5,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 110.0,     // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 7.1,      // Maximum braking current in [A]
  contDischargeCurrent: 0.84,    // Continuous braking current in [A]
};

const cr700_4007 = {
  type: "CIPR-CR70C4007",
  voltageClass: 400,
  hdPower: 3.0,                  // Heavy duty output power rating in [kW]
  hdCurrent: 7.2,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 55.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 14.3,     // Maximum braking current in [A]
  contDischargeCurrent: 1.14,    // Continuous braking current in [A]
};

const cr700_4009 = {
  type: "CIPR-CR70C4009",
  voltageClass: 400,
  hdPower: 4.0,                  // Heavy duty output power rating in [kW]
  hdCurrent: 9.2,                // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 55.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 14.3,     // Maximum braking current in [A]
  contDischargeCurrent: 1.52,    // Continuous braking current in [A]
};

const cr700_4015 = {
  type: "CIPR-CR70C4015",
  voltageClass: 400,
  hdPower: 5.5,                  // Heavy duty output power rating in [kW]
  hdCurrent: 14.8,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 32.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 24.6,     // Maximum braking current in [A]
  contDischargeCurrent: 2.10,    // Continuous braking current in [A]
};

const cr700_4018 = {
  type: "CIPR-CR70C4018",
  voltageClass: 400,
  hdPower: 7.5,                  // Heavy duty output power rating in [kW]
  hdCurrent: 18.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 32.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 24.6,     // Maximum braking current in [A]
  contDischargeCurrent: 2.86,    // Continuous braking current in [A]
};

const cr700_4024 = {
  type: "CIPR-CR70C4024",
  voltageClass: 400,
  hdPower: 11.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 24.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 20.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 39.4,     // Maximum braking current in [A]
  contDischargeCurrent: 4.20,    // Continuous braking current in [A]
};

const cr700_4031 = {
  type: "CIPR-CR70C4031",
  voltageClass: 400,
  hdPower: 15.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 31.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 20.0,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 39.4,     // Maximum braking current in [A]
  contDischargeCurrent: 5.73,    // Continuous braking current in [A]
};

const cr700_4039 = {
  type: "CIPR-CR70C4039",
  voltageClass: 400,
  hdPower: 18.5,                 // Heavy duty output power rating in [kW]
  hdCurrent: 39.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 41.0,     // Maximum braking current in [A]
  contDischargeCurrent: 7.07,    // Continuous braking current in [A]
};

const cr700_4045 = {
  type: "CIPR-CR70C4045",
  voltageClass: 400,
  hdPower: 22.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 45.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 41.0,     // Maximum braking current in [A]
  contDischargeCurrent: 8.41,    // Continuous braking current in [A]
};

const cr700_4060 = {
  type: "CIPR-CR70C4060",
  voltageClass: 400,
  hdPower: 30.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 60.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 41.0,     // Maximum braking current in [A]
  contDischargeCurrent: 11.4,    // Continuous braking current in [A]
};

const cr700_4075 = {
  type: "CIPR-CR70C4075",
  voltageClass: 400,
  hdPower: 37.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 75.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 10.6,      // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 74.3,     // Maximum braking current in [A]
  contDischargeCurrent: 14.1,    // Continuous braking current in [A]
};

const cr700_4091 = {
  type: "CIPR-CR70C4091",
  voltageClass: 400,
  hdPower: 45.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 90.0,               // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 8.7,       // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 90.5,     // Maximum braking current in [A]
  contDischargeCurrent: 17.2,    // Continuous braking current in [A]
};

const cr700_4112 = {
  type: "CIPR-CR70C4112",
  voltageClass: 400,
  hdPower: 55.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 112.0,              // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 7.2,       // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 109.4,    // Maximum braking current in [A]
  contDischargeCurrent: 21.0,    // Continuous braking current in [A]
};

const cr700_4150 = {
  type: "CIPR-CR70C4150",
  voltageClass: 400,
  hdPower: 75.0,                 // Heavy duty output power rating in [kW]
  hdCurrent: 150.0,              // Heavy duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 5.2,       // Minimum connectable braking resistance in [ohm]
  maxDischargeCurrent: 151.5,    // Maximum braking current in [A]
  contDischargeCurrent: 28.6,    // Continuous braking current in [A]
};

export const cr700_data = [cr700_4003, cr700_4005, cr700_4006, cr700_4009, cr700_4015, cr700_4018,       cr700_4024, cr700_4031, cr700_4039, cr700_4045, cr700_4060, cr700_4075, cr700_4091, cr700_4112,      cr700_4150];
