import {
  allOperatorsRegEx,
  display,
  operation,
  operatorsBtns,
  operatorsRegEx,
  resetBtn,
  result,
  updateOperation,
  updateResult,
} from "./index.js";
import { handleOperations } from "./handleOperations.js";

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
        updateOperation(temp + "-");
        display.textContent = operation;
        console.log(`now operation is ${operation}`);
        return;
      }

      if (operation === "-") {
        resetBtn.click();
      } else if (operation.at(-1) === "-") {
        updateOperation(operation.slice(0, -1) + "+");
        display.textContent = operation;
      } else if (operation.at(-1) === "+") {
        updateOperation(operation.slice(0, -1) + "-");
        display.textContent = operation;
      } else if (operatorsRegEx.test(operation.at(-1))) {
        console.log("Operator is x or /");
        updateOperation(operation + e.target.textContent);
        display.textContent = operation;
      } else if (
        amountOfOperators === 1 ||
        (amountOfMinusOperators === 1 && operation.at(-1) !== "-")
      ) {
        return;
      } else {
        updateOperation(operation + e.target.textContent);
        display.textContent = operation;
      }

      console.log(operation);
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
        updateOperation(temp + e.target.textContent);
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
          updateOperation(operation.slice(0, -1) + e.target.textContent);
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

        updateOperation(operation + e.target.textContent);
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

      updateResult(handleOperations(result, arr[0], arr[1], operator));

      if (result % 1 !== 0) {
        console.log(`it's not an integer`);
        display.textContent = result.toFixed(2);
      } else {
        display.textContent = result;
      }
    }
  });
});
