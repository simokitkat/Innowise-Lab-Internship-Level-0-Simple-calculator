import { themeH1 } from "./index.js";

themeH1.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    themeH1.textContent = "Light Mode";
  } else {
    themeH1.textContent = "Dark Mode";
  }
});
