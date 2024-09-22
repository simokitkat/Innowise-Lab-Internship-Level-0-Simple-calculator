import { handleOperations } from "./handleOperations.js";
import "./styles.css";

let result;
let operation = "";
const operatorsRegEx = /(\+|\/|x)/g;
const allOperatorsRegEx = /(\+|\/|x|-)/g;

//buttons
const operatorsBtns = Array.from(document.querySelectorAll(".operator"));
const nums = Array.from(document.querySelectorAll(".num"));
const point = document.querySelector(".point");
const percent = document.querySelector(".percent");
const display = document.querySelector(".display");
const resetBtn = document.querySelector(".reset");
const plusMinus = document.querySelector(".plus-minus");
const themeH1 = document.querySelector("h1");

/* 
The plan is to make an operation that consists of two operands and one operator only. 
The more operands we add after that, can be included using the result as one of the two possible operands for the operation.
*/

// handle clicking on the numbers buttons
nums.forEach((num) => {
  num.addEventListener("click", (e) => {
    //make sure result is empty
    if (result !== undefined) {
      resetBtn.click();
    }

    operation += e.target.textContent;
    display.textContent = operation;
    console.log(operation);
  });
});

// handle clicking on the operators buttons
operatorsBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", (e) => {
    const amountOfOperators = operation.match(operatorsRegEx)?.length;
    const amountOfMinusOperators = operation.slice(1).match(/-/g)?.length;

    /*********************************
     * 1) The minus operator handler *
     ********************************/
    if (e.target.textContent === "-") {
      if (result !== undefined) {
        const temp = result;
        resetBtn.click();
        operation = temp + "-";
        display.textContent = operation;
        console.log(`now operation is ${operation}`);
        return;
      }

      if (operation === "-") {
        resetBtn.click();
      } else if (operation.at(-1) === "-") {
        operation = operation.slice(0, -1) + "+";
        display.textContent = operation;
      } else if (operatorsRegEx.test(operation.at(-1))) {
        operation = operation.slice(0, -1) + "-";
        display.textContent = operation;
        console.log(operation);
      } else if (
        amountOfOperators === 1 ||
        (amountOfMinusOperators === 1 && operation.at(-1) !== "-")
      ) {
        return;
      } else {
        operation += e.target.textContent;
        display.textContent = operation;
      }
      return;
    }

    // If the operator isn't minus and the operating string is empty
    if (operation.length < 1) {
      return;
    }

    // If the input operator is +, /, or x
    if (operatorsRegEx.test(operatorBtn.textContent)) {
      if (result !== undefined) {
        const temp = result;
        resetBtn.click();
        operation = temp + e.target.textContent;
        display.textContent = operation;
        console.log(`now operation is ${operation}`);
        return;
      }

      if (amountOfOperators === 1 || amountOfMinusOperators === 1) {
        /**********************************************************************************
         * The code handles entering an operator when already having one in the operation *
         **********************************************************************************/

        console.log(`The operation already has an operator`);
        const operator = operation.slice(1).match(allOperatorsRegEx)[0];

        if (operation[operation.length - 1] === operator) {
          /****************************************************************************************
           * This code checkes if the operator in the operation string is the last character of it *
           ****************************************************************************************/

          operation = operation.slice(0, -1) + e.target.textContent;
          display.textContent = operation;
          console.log(operation);
        } else {
          /****************************************************************************************
           * This code checkes if the operator in the operation string is not the last character of it *
           ****************************************************************************************/
          return;
        }
      } else {
        /******************************************************************************
         * The code handles entering an operator when not having one in the operation *
         ******************************************************************************/

        if (operation === "-") {
          return;
        }

        operation += e.target.textContent;
        display.textContent = operation;
        console.log(operation);
      }
    }

    if (e.target.textContent === "=") {
      /**********************************************************
       * The code here is to show the result in the display DIV *
       **********************************************************/
      const operator = operation.slice(1).match(allOperatorsRegEx)[0];
      const arr =
        operation[0] !== "-"
          ? operation.split(operator)
          : operation.slice(1).split(operator);

      arr[0] = operation[0] !== "-" ? arr[0] : "-" + arr[0];
      console.log(arr);

      result = handleOperations(result, arr[0], arr[1], operator);

      if (result % 1 !== 0) {
        console.log(`it's not an integer`);
        display.textContent = result.toFixed(2);
      } else {
        display.textContent = result;
      }
    }
  });
});

// Pressing on the point btn
point.addEventListener("click", (e) => {
  if (operation === "" || allOperatorsRegEx.test(operation.at(-1))) {
    operation += "0.";
    display.textContent = operation;
  }

  if (!operation.includes(".")) {
    operation += ".";
    display.textContent = operation;
  } else {
    // Here we need to check if we have one point and if so we need to check it's location before or after the operator

    const amountOfPoints = operation.split("").filter((e) => e === ".");

    if (amountOfPoints.length > 1) {
      return;
    } else {
      /********************************************************************************
       * The code here assumes that there is already one point in the operation string *
       *******************************************************************************/

      if (allOperatorsRegEx.test(operation.slice(1))) {
        const operator = operation.slice(1).match(allOperatorsRegEx);
        const operatorIndex = operation.lastIndexOf(operator);
        const indexOfFirstPoint = operation.indexOf(".");

        operation =
          indexOfFirstPoint < operatorIndex ? operation + "." : operation;
        display.textContent = operation;
      }
    }
  }
});

// Pressing on the percent btn
percent.addEventListener("click", (e) => {
  // 1) if the last character in the operation string is an operator we need to return
  if (allOperatorsRegEx.test(operation.at(-1))) {
    return;
  }

  // 2) handling percent if there is an operator in the operation string
  if (allOperatorsRegEx.test(operation.slice(1))) {
    const operatorIndex = operation
      .split("")
      .findLastIndex((e) => allOperatorsRegEx.test(e));

    const operator = operation[operatorIndex];
    let operand1 = operation.slice(0, operatorIndex);
    let operand2 = operation.slice(operatorIndex + 1);

    operand2 = operand2 * (operand1 / 100);

    operation = operand1 + operator + operand2;
    display.textContent = operation;

    console.log(operand2);
  } else {
    // 2) handling percent if there is NO operator in the operation string
    operation = (operation / 100).toString();
    display.textContent = operation;
  }
});

// pressing on the plusMinusBtn
plusMinus.addEventListener("click", () => {
  // 1) if the last character in the operation string is an operator we need to return
  if (operation.match(/[-+x\/]$/)) {
    console.log("last is an operator");
    console.log("last is " + operation.at(-1));
    return;
  }

  if (allOperatorsRegEx.test(operation.slice(1))) {
    // 2) handling plusMinus if there is an operator in the operation string
    const operatorIndex = operation
      .split("")
      .findLastIndex((e) => allOperatorsRegEx.test(e));

    let operator = operation[operatorIndex];
    let operand1 = operation.slice(0, operatorIndex);
    let operand2 = operation.slice(operatorIndex + 1);

    console.log(`
      operator: ${operator}
      operand1: ${operand1}
      operand2: ${operand2}
      operation: ${operation}`);

    if (operator === "-") {
      operator = "+";
      // operand2 *= -1;
      operation = operand1 + operator + operand2;
      display.textContent = operation;
      console.log(operation);
    } else {
      operand2 *= -1;
      operation = operand1 + operator + operand2;
      display.textContent = operation;
      console.log(operation);
    }
  } else {
    // // 2) handling plusMinus if there is NO operator in the operation string
    operation = (operation * -1).toString();
    display.textContent = operation;
  }
});

// Reset Calculator
resetBtn.addEventListener("click", () => {
  [result, operation] = [undefined, ""];
  display.textContent = 0;
});

themeH1.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeH1.textContent = "Light Mode";
  } else {
    themeH1.textContent = "Dark Mode";
  }
});
