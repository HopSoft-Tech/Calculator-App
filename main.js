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
      if (input.slice(0, -1) == "") {
        input = "";
        display_output.innerHTML = "";
        display_input.innerHTML = "";
        return;
      }

      // slice off a character from the input
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

      // This is to display the result in the output
      // CleanOutput returns the output with the decimal part if there is any and a Comma
      // Added to the Numbers where necessary.
      display_output.innerHTML = CleanOutput(result);
    } else if (value == "brackets") {
      // A Break down of the if logic
      // if we don't have an Opening bracket
      // Or if we have
      // And we have a closing bracket
      // And the last opening bracket is before the last closing bracket.
      //  Then add a bracket.
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        // If there is at least one opening parenthesis and no closing parenthesis
        // OR there is at least one opening and one closing parenthesis
        // and the last opening parenthesis is after the last closing parenthesis
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        // Append a closing parenthesis to the input
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

  // This Retrieves the decimal part of the output
  let decimal = output_string.split(".")[1];

  // This Retrieves the integer(whole number) part of the output if there is a decimal part
  output_string = output_string.split(".")[0];

  // This Splits the output Integer part into an array of characters
  let output_array = output_string.split("");

  // check if the length of the output is more than 3
  if (output_array.length > 3) {
    // This adds a comma in front of every 3 numbers
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  // Push the (.) to the end of the array and then add the decimal Number at the End of the Array
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

  // This is to Prevent the user from using the same operator twice
  // So this checks if the last input was an operator and if the current input is the same as the last input
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

  // This checks for the Presence of % in the input and replaces it with /100
  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }

  // This returns the input in the form of a string
  return input_array.join("");
}
