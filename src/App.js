import React, { useState } from "react"
import Wrapper from "./components/Wrapper"
import Screen from "./components/Screen"
import Button from "./components/Button"
import ButtonBox from "./components/ButtonBox"


const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];


const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {

  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // This function checks that no whole numbers starts with zero and
// There are no multiple zeros before comma and the numbers entered are up to 
// 16 integers long

const numClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  if (removeSpaces(calc.num).length < 16) {
    setCalc({
      ...calc,
      num:
        calc.num === 0 && value === "0"
          ? "0"
          : removeSpaces(calc.num) % 1 === 0
          ? toLocaleString(Number(removeSpaces(calc.num + value)))
          : toLocaleString(calc.num + value),
      res: !calc.sign ? 0 : calc.res,
    });
  }
};

// This gets fired when comma is pressed
const commaClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
  });
};

// This function checks what symbol they press
const signClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    sign: value,
    res: !calc.res && calc.num ? calc.num : calc.res,
    num: 0,
  });
};

// This calculates the result when they press equals, it is based on
// current num and res value
const equalsClickHandler = () => {
  if (calc.sign && calc.num) {
    const math = (a, b, sign) =>
      sign === "+"
        ? a + b
        : sign === "-"
        ? a - b
        : sign === "X"
        ? a * b
        : a / b;

    setCalc({
      ...calc,
      res:
        calc.num === "0" && calc.sign === "/"
          ? "Can't divide with 0"
          : toLocaleString(
              math(
                Number(removeSpaces(calc.res)),
                Number(removeSpaces(calc.num)),
                calc.sign
              )
            ),
      sign: "",
      num: 0,
    });
  }
};
// This checkes if there's any entered value and then inverts them
// by multiplying with -1
const invertClickHandler = () => {
  setCalc({
    ...calc,
    num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
    res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
    sign: "",
  });
};

// Calculates the percentage using Math.pow
const percentClickHandler = () => {
  let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
  let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

  setCalc({
    ...calc,
    num: (num /= Math.pow(100, 1)),
    res: (res /= Math.pow(100, 1)),
    sign: "",
  });
};
// defaults all initial values of calc, returning to the state it was in
// the beginning
const resetClickHandler = () => {
  setCalc({
    ...calc,
    sign: "",
    num: 0,
    res: 0,
  });
};

  return(
    <Wrapper>
      {/* Ternary operator ? = true : = false */}
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button key={i} className={btn === "=" ? "equals" : ""} value={btn} onClick={
                btn === "C"
                  ? resetClickHandler
                  : btn === "+-"
                  ? invertClickHandler
                  : btn === "%"
                  ? percentClickHandler
                  : btn === "="
                  ? equalsClickHandler
                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                  ? signClickHandler
                  : btn === "."
                  ? commaClickHandler
                  : numClickHandler
              }
              />
            )
          })
        }
      </ButtonBox>
    </Wrapper>
  )
}
export default App