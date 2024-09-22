import {
  allOperatorsRegEx,
  display,
  operation,
  resetBtn,
  result,
  updateOperation,
} from "./index.js";

export function handlePlusMinusBtn() {
  // 1) if the last character in the operation string is an operator we need to return
  if (operation.match(/[-+x/]$/)) {
    console.log("last is an operator");
    console.log("last is " + operation.at(-1));
    return;
  }

  if (allOperatorsRegEx.test(operation.slice(1))) {
    // Checking if result is defined
    if (result !== undefined) {
      const temp = result;
      resetBtn.click();
      updateOperation((temp * -1).toString());
      display.textContent = operation;
      console.log(`now operation is ${operation}`);
      return;
    }

    // 2) handling plusMinus if there is an operator in the operation string
    const operatorIndex = operation
      .split("")
      .findIndex((element) => allOperatorsRegEx.test(element));

    console.log(operatorIndex);

    let operator = operation[operatorIndex];
    let operand1 = operation.slice(0, operatorIndex);
    let operand2 = operation.slice(operatorIndex + 1);

    console.log(`
        operationIndex: ${operatorIndex}
        operator: ${operator}
        operand1: ${operand1}
        operand2: ${operand2}
        operation: ${operation}`);

    if (operator === "-") {
      operator = "+";
      updateOperation(operand1 + operator + operand2);
      display.textContent = operation;
      console.log(operation);
    } else {
      operand2 *= -1;
      updateOperation(operand1 + operator + operand2);
      display.textContent = operation;
      console.log(operation);
    }
  } else {
    //  2) handling plusMinus if there is NO operator in the operation string
    updateOperation((operation * -1).toString());
    display.textContent = operation;
  }
}
