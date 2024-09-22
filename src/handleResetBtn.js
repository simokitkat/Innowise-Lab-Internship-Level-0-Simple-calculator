import { display, resetBtn, updateOperation, updateResult } from "./index.js";

resetBtn.addEventListener("click", () => {
  updateResult(undefined);
  updateOperation("");
  display.textContent = 0;
});
