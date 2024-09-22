// import "./styles.css";

let result;
let operation = "";
const operatorsRegEx = /(\+|\/|x)/g;
const allOperatorsRegEx = /(\+|\/|x|-)/g;

//buttons
const operatorsBtns = Array.from(document.querySelectorAll(".operator"));
const nums = Array.from(document.querySelectorAll(".num"));
const point = document.querySelector(".point");
const percent = document.querySelector(".percent");
const display = document.querySelector(".display");
const resetBtn = document.querySelector(".reset");
const plusMinus = document.querySelector(".plus-minus");
const themeH1 = document.querySelector("h1");

function updateOperation(newOperation) {
  operation = newOperation;
}
function updateResult(newResult) {
  result = newResult;
}

export {
  result,
  operation,
  updateOperation,
  updateResult,
  operatorsRegEx,
  allOperatorsRegEx,
  operatorsBtns,
  nums,
  point,
  percent,
  display,
  resetBtn,
  plusMinus,
  themeH1,
};

/* 
The plan is to make an operation that consists of two operands and one operator only. 
The more operands we add after that, can be included using the result as one of the two possible operands for the operation.
*/
/*
Development Stages:
[1] // handle clicking on the numbers buttons
[2] // handle clicking on the point button
[3] // handle clicking on the operators buttons
[4] // handle clicking on the percent button
[5] // handle clicking on the plusMinus button
[6] // handle clicking on the reset button
[7] // handle theme
*/
