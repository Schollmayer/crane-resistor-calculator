import Prompt from './input_helpers.cjs';

class Hoist {
  constructor(hoistName) {
    this.hoistName = hoistName;

    this.voltageClass = 400;            // Drive voltage class
    this.brakeActivateVoltage = 760;    // Braking transistor activation voltage (DC)

    // Get average mechanical power in kilowatt. Range [1-1000] kW
    this.averageMechPower = Prompt.get_variable_from_user(`Average Mechanical Power`, `kW`, 1, 1000);

    // Get motor efficiency in percent. Range [70-99] %
    this.motorEfficiency = Prompt.get_variable_from_user(`Motor Efficiency`, `%`, 70, 99) / 100;

    // Get gearbox efficiency in percent. Range [70-99] %
    this.gearboxEfficiency = Prompt.get_variable_from_user(`Gearbox Efficiency`, `%`, 70, 99) / 100;

    // Get duty cycle in percent. Range [1 - 40] %
    this.dutyCycle = Prompt.get_variable_from_user(`Duty Cycle`, `%`, 1, 40);

    // Get hoist height in meters. Range [1 - 200] m
    this.hoistHeight = Prompt.get_variable_from_user(`Hoist Height`, `m`, 1, 200);

    // Get hoist speed in meters per minute. Range [1 - 50] m/min
    this.hoistSpeed = Prompt.get_variable_from_user(`Hoist Speed`, `m/min`, 1, 50);
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

//const prompt = require('prompt-sync')({sigint: true});
const hoists = [];
hoists.push(new Hoist(Prompt.get_string_from_user("Hoist Name", 1, 16)));
console.log(hoists);
console.log(hoists[0].hoistName);
console.log(hoists[0].maxBrakePower());
