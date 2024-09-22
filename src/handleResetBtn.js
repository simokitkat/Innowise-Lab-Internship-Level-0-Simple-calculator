import { display, updateOperation, updateResult } from "./index.js";

export function handleResetBtn() {
  updateResult(undefined);
  updateOperation("");
  display.textContent = 0;
}
