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

let board = [];
function resetBoard() {
  board = [];
  turnsCounter = 0;
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

function gameMoves(num) {
  if (gameOngoing) {
    if (turnsCounter % 2 === 0 && typeof board[num] !== "string") {
      turnsCounter++;
      sign = "❌";
      board[num] = sign;
      cells[num - 1].innerHTML = sign;
      gameOngoing = false;
    } else {
      if (typeof board[num] !== "string") {
        turnsCounter++;
        sign = "⭕";
        board[num] = sign;
        cells[num - 1].innerHTML = sign;
        gameOngoing = false;
      }
    }
    setTimeout(function () {
      gamePlay(sign);
    }, 10);
  }
}

function gamePlay(symbol) {
  gameOngoing = true;
  for (let x of winOptions) {
    let isWinCount = 0;

    for (let y of x) {
      if (board[y] === symbol) {
        isWinCount++;
        if (isWinCount === 3) {
          ScoreKeep(symbol);
          alert(`${symbol} wins!`);

          resetBoard();
        }
      } else {
        isWinCount = 0;
      }
    }
  }
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
}
