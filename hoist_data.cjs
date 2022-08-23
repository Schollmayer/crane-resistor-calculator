//import promptSync from 'prompt-sync';

class Hoist {
  constructor(hoistName) {
    this.hoistName = hoistName;

    this.voltageClass = 400;            // Drive voltage class
    this.brakeActivateVoltage = 760;    // Braking transistor activation voltage (DC)

    // Get average mechanical power in kilowatt. Range [1-1000] kW
    this.averageMechPower = get_variable_from_user(`Average Mechanical Power`, `kW`, 1, 1000);

    // Get motor efficiency in percent. Range [70-99] %
    this.motorEfficiency = get_variable_from_user(`Motor Efficiency`, `%`, 70, 99) / 100;

    // Get gearbox efficiency in percent. Range [70-99] %
    this.gearboxEfficiency = get_variable_from_user(`Gearbox Efficiency`, `%`, 70, 99) / 100;

    // Get duty cycle in percent. Range [1 - 40] %
    this.dutyCycle = get_variable_from_user(`Duty Cycle`, `%`, 1, 40);

    // Get hoist height in meters. Range [1 - 200] m
    this.hoistHeight = get_variable_from_user(`Hoist Height`, `m`, 1, 200);

    // Get hoist speed in meters per minute. Range [1 - 50] m/min
    this.hoistSpeed = get_variable_from_user(`Hoist Speed`, `m/min`, 1, 50);
  }
  averageBrakePower() {
    return this.averageMechPower * this.motorEfficiency * this.gearboxEfficiency;
  }
  maxBrakePower() {
    return this.averageBrakePower() * 2;
  }
  maxBrakeTime() {
    return (this.hoistHeight / this.hoistSpeed) * 60;
  }
  maxBrakeResistance() {
    return (this.brakeActivateVoltage ** 2) / (this.maxBrakePower() * 1000);
  }
}

const prompt = require('prompt-sync')({sigint: true});
const hoists = [];
hoists.push(new Hoist(get_string_from_user("Hoist Name", 1, 16)));
console.log(hoists);
console.log(hoists[0].hoistName);
console.log(hoists[0].maxBrakePower());


function get_variable_from_user(name, unit, min, max) {
  let input = 0;
  while (input === 0) {
    input = Number.parseInt(prompt(`${name} [${unit}]: `));
    if ((input >= min) && (input <= max)) return input;
    else {
      input = 0;
      console.log(`Out of range. Input value must be between ${min} and ${max} ${unit}.`)
    }
  }
}

function get_string_from_user(name, minLength, maxLength) {
  let input = "";
  while (input === "") {
    input = prompt(`${name}: `);
    if ((input.length >= 1) && (input.length <= maxLength)) return input;
    else {
      input = "";
      console.log(`Out of range. Input must be between ${minLength} and ${maxLength} characters.`)
    }
  }
}