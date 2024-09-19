export function handleOperations(result, operandNum1, operandNum2, operator) {
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
