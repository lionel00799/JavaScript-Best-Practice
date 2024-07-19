document.addEventListener("DOMContentLoaded", function () {
  createCheckerboard();
  addEventListeners();
});

function createCheckerboard() {
  const checkerboard = document.querySelector(".checkerboard");
  checkerboard.innerHTML = ""; // Clear the checkerboard
  for (let i = 0; i < 625; i++) {
    const square = document.createElement("div");
    const symbol = document.createElement("div");
    symbol.classList.add("symbol");
    symbol.setAttribute("data-index", i);
    square.appendChild(symbol);
    checkerboard.appendChild(square);
  }
}

function addEventListeners() {
  const cells = document.querySelectorAll(".symbol");
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick, { once: true });
  });
}

let currentPlayer = "X";
let stateArray = new Array(625).fill(0);

function handleClick(e) {
  let startLine = [0, 0, 0, 0];
  let startPoint = [0, 0, 0, 0];
  let stepNumber = [5, 5, 5, 5];
  let columnState = [];
  let crossLeftState = [];
  let crossRightState = [];
  let rowState = [];

  const cell = e.target;
  cell.textContent = currentPlayer;

  let tempPlayer = currentPlayer === "X" ? 1 : -1;

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  const clickedCellIndex = cell.getAttribute("data-index");

  stateArray[clickedCellIndex] = currentPlayer === "X" ? -1 : 1;

  let lineClickedCell = parseInt(clickedCellIndex / 25);
  let pointClickedCell = clickedCellIndex % 25;

  //crossLeft
  startLine[0] = lineClickedCell;
  startPoint[0] = pointClickedCell;
  while (startLine[0] >= 1 && startPoint[0] >= 1) {
    startLine[0] -= 1;
    startPoint[0] -= 1;
    stepNumber[0] += 1;
    if (stepNumber[0] == 9) break;
  }

  //crossRight
  startLine[1] = lineClickedCell;
  startPoint[1] = pointClickedCell;
  while (startLine[1] >= 1 && startPoint[1] <= 23) {
    startLine[1] -= 1;
    startPoint[1] += 1;
    stepNumber[1] += 1;
    if (stepNumber[1] == 9) break;
  }

  //row
  startLine[2] = lineClickedCell;
  startPoint[2] = pointClickedCell;
  while (startPoint[2] >= 1) {
    startPoint[2] -= 1;
    stepNumber[2] += 1;
    if (stepNumber[2] == 9) break;
  }

  //column
  startLine[3] = lineClickedCell;
  startPoint[3] = pointClickedCell;
  while (startLine[3] >= 1) {
    startLine[3] -= 1;
    stepNumber[3] += 1;
    if (stepNumber[3] == 9) break;
  }

  //crossLeftState
  for (let i = 0; i < stepNumber[0]; i++) {
    if (startLine[0] + i == 25) break;
    crossLeftState[i] =
      stateArray[25 * (startLine[0] + i) + (startPoint[0] + i)];
  }

  //crossRightState
  for (let i = 0; i < stepNumber[1]; i++) {
    if (startLine[1] + i == 25) break;
    crossRightState[i] =
      stateArray[25 * (startLine[1] + i) + (startPoint[1] - i)];
  }

  //rowState
  for (let i = 0; i < stepNumber[2]; i++) {
    if (startPoint[2] + i == 25) break;
    rowState[i] = stateArray[25 * startLine[2] + (startPoint[2] + i)];
  }

  //columnState
  for (let i = 0; i < stepNumber[3]; i++) {
    if (startLine[3] + i == 25) break;
    columnState[i] = stateArray[25 * (startLine[3] + i) + startPoint[3]];
  }

  let result =
    checkAndBlink(
      crossLeftState,
      tempPlayer,
      startLine[0],
      startPoint[0],
      1,
      1
    ) ||
    checkAndBlink(
      crossRightState,
      tempPlayer,
      startLine[1],
      startPoint[1],
      1,
      -1
    ) ||
    checkAndBlink(rowState, tempPlayer, startLine[2], startPoint[2], 0, 1) ||
    checkAndBlink(columnState, tempPlayer, startLine[3], startPoint[3], 1, 0);

  if (result) {
    setTimeout(() => {
      showDialog(`${tempPlayer === 1 ? "X" : "O"} wins!`);
    }, 3000); // Delay dialog appearance to match blink animation duration
  }
}

function checkAndBlink(
  arr,
  targetValue,
  startLine,
  startPoint,
  lineIncrement,
  pointIncrement
) {
  for (let i = 0; i <= arr.length - 5; i++) {
    let allMatch = true;
    for (let j = 0; j < 5; j++) {
      if (arr[i + j] !== targetValue) {
        allMatch = false;
        break;
      }
    }
    if (allMatch) {
      for (let j = 0; j < 5; j++) {
        let index =
          25 * (startLine + i * lineIncrement + j * lineIncrement) +
          (startPoint + i * pointIncrement + j * pointIncrement);
        document
          .querySelector(`.symbol[data-index='${index}']`)
          .classList.add("blink");
      }
      return true;
    }
  }
  return false;
}

function showDialog(message) {
  const dialog = document.getElementById("myDialog");
  const dialogMessage = document.getElementById("dialogMessage");
  const closeBtn = document.getElementById("closeDialog");

  dialogMessage.textContent = message;
  dialog.classList.remove("hide");
  dialog.classList.add("show");

  closeBtn.addEventListener("click", restartGame);
}

function restartGame() {
  const dialog = document.getElementById("myDialog");

  dialog.classList.add("hide");
  dialog.classList.remove("show");

  stateArray.fill(0);
  currentPlayer = "X";
  createCheckerboard();
  addEventListeners();
}
