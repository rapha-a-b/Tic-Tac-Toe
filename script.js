let cells = document.querySelectorAll(".cellClick");
let resetButton = document.querySelector("button");
resetButton.addEventListener("click", function () {
  resetBoard();
});
let turnsCounter = 0;
let gameOngoing = true;

let board = [];
function resetBoard() {
  board = [];
  turnsCounter = 0;
  for (let x = 0; x < cells.length; x++) {
    cells[x].innerHTML = "";
    cells[x].addEventListener("click", function () {});
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
    }, 500);
  }
}

function gamePlay(symbol) {
  gameOngoing = true;
  for (let x of winOptions) {
    let isWinCount = 0;

    for (let y of x) {
      if (board[y] === symbol) {
        isWinCount++;
        console.log(isWinCount);
        if (isWinCount === 3) {
          alert(`${symbol} wins!`);
          resetBoard();
        }
      } else {
        isWinCount = 0;
      }
    }
  }
}
