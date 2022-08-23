
// Function to get an integer value from a user via the terminal
class Prompt {

  static get_variable_from_user(name, unit, min, max) {
    const prompt = require('prompt-sync')({sigint: true});
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
  
  // Function to get a string from a user via the terminal
  static get_string_from_user(name, minLength, maxLength) {
    const prompt = require('prompt-sync')({sigint: true});
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

}

module.exports = Prompt;