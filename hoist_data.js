import promptSync from 'prompt-sync';

class Hoist {
  constructor(hoistName) {
    this.hoistName = hoistName;
    let averageMechPower = 0;
    while (averageMechPower === 0) {
      averageMechPower = Number.parseInt(prompt('Average Mechanical Power [kW]: '));
      if ((averageMechPower > 0) && (averageMechPower < 1000)) this.averageMechPower = averageMechPower;
      else {
        averageMechPower = 0;
        console.log(`Out of range. Input value must be between 1 and 1000 kW.`)
      }
    }
  }
}

const prompt = promptSync();
const sks100 = new Hoist("SKS100");
console.log(sks100);
console.log(`${sks100.averageMechPower} kW`);