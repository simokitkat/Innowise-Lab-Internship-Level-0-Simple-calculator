// import "./styles.css";
let operand1 = 0;
let operand2 = 0;
let result;
let operation = "";
const operatorsRegEx = /(\+|-|\/|x)/g;
//buttons
const operatorsBtns = Array.from(document.querySelectorAll(".operator"));
const nums = Array.from(document.querySelectorAll(".num"));
const point = document.querySelector(".point");
const display = document.querySelector(".display");

/* 
The plan is to make an operation that consists of two operands and one operator only. 
The more operands we add after that, can be included using the result as one of the two possible operands for the operation.
*/

function handleOperations(operandNum1, operandNum2, operator) {
  switch (operator) {
    case "+":
      result = +operandNum1 + +operandNum2;
      break;
    case "-":
      result = operandNum1 - operandNum2;
      break;
    case "x":
      result = operandNum1 * operandNum2;
      break;
    case "/":
      result = operandNum1 / operandNum2;
      break;

    default:
      result = 0;
  }

  return result;
}

nums.forEach((num) => {
  num.addEventListener("click", (e) => {
    //make sure result is empty
    if (result !== undefined) {
      operation = "";
      result = undefined;
      operand1 = 0;
      operand2 = 0;
    }

    if (!operatorsRegEx.test(operation[operation.length - 1])) {
      operation += e.target.textContent;
      //   display.textContent = +(display.textContent + e.target.textContent);
      display.textContent = operation;
      console.log(operation);
    } else {
      const amountOfOperators = operation.match(operatorsRegEx)?.length;

      if (amountOfOperators !== 1) {
        return;
      }

      display.textContent = ""; // reset the display
      operation += e.target.textContent;
      //   display.textContent = +(display.textContent + e.target.textContent);
      display.textContent = operation;
      console.log(operation);
    }
  });
});

operatorsBtns.forEach((operatorBtn) => {
  operatorBtn.addEventListener("click", (e) => {
    if (operation.length < 1) {
      return;
    }

    if (operatorsRegEx.test(operatorBtn.textContent)) {
      const amountOfOperators = operation.match(operatorsRegEx)?.length;

      if (amountOfOperators === 1) {
        /**********************************************************************************
         * The code handles entering an operator when already having one in the operation *
         **********************************************************************************/

        console.log(`The operation already has an operator`);
        const operator = operation.match(operatorsRegEx)[0];

        if (operation[operation.length - 1] === operator) {
          /****************************************************************************************
           * This code checkes if the operator in the operation string is the last character of it *
           ****************************************************************************************/

          operation =
            operation.slice(0, operation.length - 1) + e.target.textContent;
          //   display.textContent = e.target.textContent;
          display.textContent = operation;
          console.log(operation);
        } else {
          const arr = operation.split(operator);
          result = handleOperations(arr[0], arr[1], operator);
          //   display.textContent = e.target.textContent;
          console.log(result);

          // now that we have a result we can pass it to operand 1, add operand 1 and the operator to operation
          operand1 = result;
          operation = result + operatorBtn.textContent;
          display.textContent = operation;
          //   result = 0;
          console.log(operation);
        }
      } else {
        operation += e.target.textContent;
        // display.textContent = e.target.textContent;
        display.textContent = operation;
        console.log(operation);
      }
    } else {
      /**********************************************************
       * The code here is to show the result in the display DIV *
       **********************************************************/
      const operator = operation.match(operatorsRegEx)[0];
      const arr = operation.split(operator);
      result = handleOperations(arr[0], arr[1], operator);

      if (result % 1 !== 0) {
        console.log(`it's not an integer`);
        display.textContent = handleOperations(
          arr[0],
          arr[1],
          operator
        ).toFixed(2);
      } else {
        display.textContent = handleOperations(arr[0], arr[1], operator);
      }
    }
  });
});
