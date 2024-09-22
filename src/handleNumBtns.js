import {
  display,
  operation,
  updateOperation,
  resetBtn,
  result,
} from "./index.js";

// handle clicking on the numbers buttons

export function handleNumBtn(num) {
  num.addEventListener("click", (e) => {
    //make sure result is empty
    if (result !== undefined) {
      resetBtn.click();
    }

    updateOperation(operation + e.target.textContent);
    display.textContent = operation;
    console.log(operation);
  });
}
