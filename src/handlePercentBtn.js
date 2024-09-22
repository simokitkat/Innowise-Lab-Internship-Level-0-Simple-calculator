import {
  allOperatorsRegEx,
  display,
  operation,
  percent,
  updateOperation,
} from "./index.js";

percent.addEventListener("click", () => {
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

    updateOperation(operand1 + operator + operand2);
    display.textContent = operation;

    console.log(operand2);
  } else {
    // 2) handling percent if there is NO operator in the operation string
    updateOperation((operation / 100).toString());
    display.textContent = operation;
  }
});
