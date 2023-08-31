const cells = document.querySelectorAll(".cellClick");
const resetButton = document.querySelector("button");
const xScore = document.querySelector("#win-count #x");
const oScore = document.querySelector("#win-count #o");
const pc = document.getElementById("Pc");
const vs2Players = document.getElementById("vs2Players");
let twoPlayers = false;
resetButton.addEventListener("click", function () {});
let turnSign = "❌";
let turn = 0;
let gameIsOn = true;

const winOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
];

////control how many players
function vsPc() {
  resetBoard();
  twoPlayers = false;
  pc.classList.add("vs");
  vs2Players.classList.remove("vs");
  oScore.innerHTML = 0;
  xScore.innerHTML = 0;
}
function players2() {
  resetBoard();
  twoPlayers = true;
  pc.classList.remove("vs");
  vs2Players.classList.add("vs");
  oScore.innerHTML = 0;
  xScore.innerHTML = 0;
}
/////////////////////////////////////

function resetBoard() {
  turnSign = "❌";
  for (cell of cells) {
    cell.innerHTML = "";
    turn = 0;
  }
  gameIsOn = true;
}

function scoreBoard(symbol) {
  if (symbol === "❌") {
    xScore.innerHTML = Number(xScore.innerHTML) + 1;
  } else {
    oScore.innerHTML = Number(oScore.innerHTML) + 1;
  }
}

function play(e) {
  if (turn < 9 && gameIsOn) {
    if (e.innerHTML === "") {
      e.innerHTML = turnSign;
      checkWin(turnSign);
      turnSign === "❌" ? (turnSign = "⭕") : (turnSign = "❌");
      turn++;
      if (turn === 9) {
        alert("draw");
        setTimeout(() => {
          gameIsOn = false;
          resetBoard();
        }, 3000);
      }
      if (!twoPlayers && turn < 9 && gameIsOn && turn > 0) {
        oChecks();
        turn++;
      }
    }
  }
}

//check option for win or lose
function bestPcOption(symbol) {
  let oPlayed = false;
  winOptions.forEach((e) => {
    let symbolCount = 0;
    e.forEach((z) => {
      if (cells[z].innerHTML === symbol) {
        symbolCount++;
        if (symbolCount > 1) {
          e.forEach((f) => {
            if (cells[f].innerHTML === "" && turnSign === "⭕") {
              cells[f].innerHTML = "⭕";
              turnSign === "❌" ? (turnSign = "⭕") : (turnSign = "❌");
              symbolCount = 0;
              oPlayed = true;
            }
          });
        }
      }
    });
  });

  return oPlayed;
}
///when vs pc

function randomNumPick(n) {
  return Math.floor(Math.random() * n);
}

function oChecks() {
  let oPlayed = bestPcOption("⭕");
  if (!oPlayed) {
    oPlayed = bestPcOption("❌");
    if (!oPlayed) {
      playRandomO();
    }
  }
  checkWin("⭕");
}

//random pc move incase of no win on next move
function playRandomO() {
  let oPlayed = false;
  while (!oPlayed) {
    let pickRandomCell = randomNumPick(9);
    if (cells[pickRandomCell].innerHTML === "") {
      cells[pickRandomCell].innerHTML = "⭕";
      oPlayed = true;
      turnSign === "❌" ? (turnSign = "⭕") : (turnSign = "❌");
    }
  }
}

/////////////////////

function checkWin(symbol) {
  let symbolCount = 0;
  let blink;
  winOptions.forEach((Array) => {
    Array.forEach((index) => {
      if (cells[index].innerHTML === symbol) {
        symbolCount++;
        if (symbolCount > 2) {
          gameIsOn = false;
          scoreBoard(symbol);
          blink = setInterval(() => {
            for (i of Array) {
              cells[i].classList.toggle("winBg");
            }
          }, 500);

          gameIsOn = false;
          setTimeout(() => {
            clearInterval(blink);
            for (i of Array) {
              cells[i].classList.remove("winBg");
            }
            gameIsOn = true;
            resetBoard();
          }, 3000);
        }
      }
    });
    symbolCount = 0;
  });
}
