//GA700 drive data

const ga500_4001 = {
  type: "GA50C4001",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 0.37,                  // Heavy duty output power rating in [kW]
  ndPower: 0.37,                  // Normal duty output power rating in [kW]
  hdCurrent: 1.2,                // Heavy duty output current rating in [A]
  ndCurrent: 1.2,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 750.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4002 = {
  type: "GA50C4002",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 0.55,                  // Heavy duty output power rating in [kW]
  ndPower: 0.75,                  // Normal duty output power rating in [kW]
  hdCurrent: 1.8,                // Heavy duty output current rating in [A]
  ndCurrent: 2.1,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 750.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4004 = {
  type: "GA50C4004",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 1.1,                  // Heavy duty output power rating in [kW]
  ndPower: 1.5,                  // Normal duty output power rating in [kW]
  hdCurrent: 3.4,                // Heavy duty output current rating in [A]
  ndCurrent: 4.1,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 510.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4005 = {
  type: "GA50C4005",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 1.5,                  // Heavy duty output power rating in [kW]
  ndPower: 2.2,                  // Normal duty output power rating in [kW]
  hdCurrent: 4.8,                // Heavy duty output current rating in [A]
  ndCurrent: 5.4,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 240.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4007 = {
  type: "GA50C4007",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 2.2,                  // Heavy duty output power rating in [kW]
  ndPower: 3.0,                  // Normal duty output power rating in [kW]
  hdCurrent: 5.6,                // Heavy duty output current rating in [A]
  ndCurrent: 7.1,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 200.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4009 = {
  type: "GA50C4009",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 3.0,                  // Heavy duty output power rating in [kW]
  ndPower: 4.0,                  // Normal duty output power rating in [kW]
  hdCurrent: 7.3,                // Heavy duty output current rating in [A]
  ndCurrent: 8.9,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 100.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4012 = {
  type: "GA50C4012",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 4.0,                  // Heavy duty output power rating in [kW]
  ndPower: 5.5,                  // Normal duty output power rating in [kW]
  hdCurrent: 9.2,                // Heavy duty output current rating in [A]
  ndCurrent: 11.9,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 100.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4018 = {
  type: "GA50C4018",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 5.5,                  // Heavy duty output power rating in [kW]
  ndPower: 7.5,                  // Normal duty output power rating in [kW]
  hdCurrent: 14.8,                // Heavy duty output current rating in [A]
  ndCurrent: 17.5,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 32.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4023 = {
  type: "GA50C4023",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 7.5,                  // Heavy duty output power rating in [kW]
  ndPower: 11,                  // Normal duty output power rating in [kW]
  hdCurrent: 18,                // Heavy duty output current rating in [A]
  ndCurrent: 23.4,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 32.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4031 = {
  type: "GA50C4031",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 11,                  // Heavy duty output power rating in [kW]
  ndPower: 15,                  // Normal duty output power rating in [kW]
  hdCurrent: 24,                // Heavy duty output current rating in [A]
  ndCurrent: 31,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 20.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4038 = {
  type: "GA50C4038",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 15.0,                  // Heavy duty output power rating in [kW]
  ndPower: 18.5,                  // Normal duty output power rating in [kW]
  hdCurrent: 31.0,                // Heavy duty output current rating in [A]
  ndCurrent: 38.0,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 20.0,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4044 = {
  type: "GA50C4044",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 18.5,                  // Heavy duty output power rating in [kW]
  ndPower: 22.0,                  // Normal duty output power rating in [kW]
  hdCurrent: 39.0,                // Heavy duty output current rating in [A]
  ndCurrent: 44.0,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,     // Minimum connectable braking resistance in [ohm]
}

const ga500_4060 = {
  type: "GA50C4060",
  voltageClass: 400,
  internalBrakeTransistor: true, // Internal braking transistor
  hdPower: 22.0,                  // Heavy duty output power rating in [kW]
  ndPower: 30.0,                  // Normal duty output power rating in [kW]
  hdCurrent: 45.0,                // Heavy duty output current rating in [A]
  ndCurrent: 60.0,                // Normal duty output current rating in [A]
  brakeActivationVoltage: 788,   // Braking transistor activation voltage in [Vdc]
  minBrakeResistance: 19.2,     // Minimum connectable braking resistance in [ohm]
}

export const ga500_data = [ga500_4001, ga500_4002, ga500_4004, ga500_4005, ga500_4007, ga500_4009, ga500_4012, ga500_4018, ga500_4023, ga500_4031,
  ga500_4038, ga500_4044, ga500_4060]
