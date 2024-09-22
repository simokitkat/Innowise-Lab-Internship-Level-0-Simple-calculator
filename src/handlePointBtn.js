import {
  allOperatorsRegEx,
  display,
  operation,
  point,
  updateOperation,
} from "./index.js";

point.addEventListener("click", () => {
  if (operation === "" || allOperatorsRegEx.test(operation.at(-1))) {
    updateOperation(operation + "0.");
    display.textContent = operation;
  }

  if (!operation.includes(".")) {
    updateOperation(operation + ".");
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

        let newOperation =
          indexOfFirstPoint < operatorIndex ? operation + "." : operation;
        updateOperation(newOperation);

        display.textContent = operation;
      }
    }
  }
});
