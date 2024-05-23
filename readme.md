# Cool Calculator App

A modern and user-friendly calculator application built with HTML, CSS, and JavaScript. This calculator handles basic arithmetic operations and provides a clean interface for ease of use.

## Features

- Basic arithmetic operations: addition, subtraction, multiplication, and division.
- Clear (`AC`) and backspace functionalities.
- Support for decimal numbers and percentage calculations.
- Handles parentheses for complex expressions.
- Real-time display of input and output.
- Responsive design.

## Installation

To get started with this calculator app, simply clone the repository and open the `index.html` file in your preferred web browser.

```sh
git clone https://github.com/yourusername/cool-calculator-app.git
cd cool-calculator-app
open index.html
```

## Usage

### Calculator Interface

The calculator has the following keys:

- **Digits (0-9)**: Input numbers.
- **Operators (+, -, ×, ÷)**: Perform arithmetic operations.
- **Special Keys**:
  - **AC**: Clears the current input.
  - **Backspace**: Removes the last character from the input.
  - **=**: Evaluates the current expression.
  - **( )**: Adds parentheses for grouping expressions.
  - **%**: Calculates the percentage.

### Code Overview

#### Main JavaScript Logic

The JavaScript code handles the functionality of the calculator. Here's a brief overview of how it works:

1. **Element Selection**:

   ```javascript
   const keys = document.querySelectorAll(".key");
   const display_input = document.querySelector(".display .input");
   const display_output = document.querySelector(".display .output");
   let input = "";
   ```

2. **Event Listeners**:

   - Adds click event listeners to each key.
   - Updates the `input` variable and the display based on the key clicked.

3. **Functions**:
   - **CleanInput(input)**: Formats the input string for display.
   - **CleanOutput(output)**: Formats the output string with commas and decimal points.
   - **ValidateInput(value)**: Ensures valid input, preventing consecutive operators.
   - **PrepareInput(input)**: Prepares the input string for evaluation, replacing `%` with `/100`.

#### Key Handling

Each key's click event is handled to update the input and display accordingly. Special keys like `AC`, `backspace`, `=`, and parentheses have their own logic to manage the input state.

### Example of Main JavaScript Logic

```javascript
const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      input = "";
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value == "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value == "=") {
      let result;
      try {
        result = eval(PrepareInput(input));
      } catch (err) {
        alert("Invalid Expression");
        input = "";
        display_output.innerHTML = "";
        display_input.innerHTML = "";
        return;
      }
      display_output.innerHTML = CleanOutput(result);
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = CleanInput(input);
    } else {
      if (ValidateInput(value)) {
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  });
}
```

### Formatting and Validating Functions

These functions help in formatting the input/output and validating the user inputs:

```javascript
function CleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] == "/") {
      input_array[i] = ` <span class="operator">÷</span> `;
    } else if (input_array[i] == "+") {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] == "-") {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] == "(") {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] == ")") {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] == "%") {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }
  return input_array.join("");
}

function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];
  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value == "." && last_input == ".") {
    return false;
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
```

## Contributing

Feel free to fork this repository and contribute by submitting a pull request. Any suggestions, improvements, and bug fixes are welcome.

## License

This project is licensed under the MIT License.

---

Enjoy using the Cool Calculator App! If you have any questions or feedback, please feel free to reach out.
