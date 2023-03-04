let cells = document.querySelectorAll(".cellClick");
let resetButton = document.querySelector("button");
let xScore = document.querySelector("#win-count #x");
let oScore = document.querySelector("#win-count #o");

resetButton.addEventListener("click", function () {
  resetBoard();
});
let turnsCounter = 0;
let gameOngoing = true;
let Xwin = 0;
let Owin = 0;
let oOptions = [];

let board = ["skip", 1, 2, 3, 4, 5, 6, 7, 8, 9];
function resetBoard() {
  gameOngoing = true;
  turnsCounter = 0;
  let oOptions = [];
  board = ["skip", 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let x = 0; x < cells.length; x++) {
    cells[x].innerHTML = "";
  }
}

let winOptions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [3, 5, 7],
  [1, 5, 9],
];
let turns = 9;

function gameMovesX(num) {
  if (gameOngoing) {
    if (typeof board[num] !== "string" && turnsCounter % 2 === 0) {
      console.log(turnsCounter);
      turnsCounter++;
      gameOngoing = false;
      sign = "❌";
      board[num] = sign;
      cells[num - 1].innerHTML = sign;
      gamePlay(sign);
    }
  }
}

function gameMoveO() {
  console.log(turnsCounter);
  if (turnsCounter % 2 !== 0 && gameOngoing) {
    console.log("after");
    let pick = checkOptions();

    setTimeout(function () {
      sign = "⭕";
      board[pick] = sign;
      turnsCounter++;

      cells[pick - 1].innerHTML = sign;
      gamePlay(sign);
    }, 500);
  }
}

function gamePlay(symbol) {
  gameOngoing = false;
  for (let x of winOptions) {
    let isWinCount = 0;

    for (let y of x) {
      if (board[y] === symbol) {
        isWinCount++;
        if (isWinCount === 3) {
          gameOngoing = false;
          ScoreKeep(symbol);
          setTimeout(function () {
            alert(`${symbol} wins!`);
          }, 100);
          return;
        }
      } else {
        isWinCount = 0;
        gameOngoing = true;
      }
    }
  }
  gameMoveO();
}

function ScoreKeep(sign) {
  console.log("im active");
  if (sign === "❌") {
    Xwin++;
    console.log(Xwin);
    xScore.innerHTML = Xwin;
  } else {
    Owin++;
    oScore.innerHTML = `${Owin}`;
  }
  setTimeout(function () {
    resetBoard();
  }, 100);
}
function checkOptions() {
  oOptions = [];
  for (let k of board) {
    if (typeof k === "number") {
      oOptions.push(k);
    }
  }
  let pickStep = oOptions[randomGen(oOptions.length)];
  console.log(oOptions);
  console.log(pickStep);
  return pickStep;
}

function randomGen(maxNum) {
  return Math.floor(Math.random() * maxNum);
}
