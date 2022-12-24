"use strict";

const newGameBtn = document.getElementById("btn-new");
const roll = document.getElementById("btn-roll");
const hold = document.getElementById("btn-hold");
const current0 = document.getElementById("current-0");
const current1 = document.getElementById("current-1");
const displayWinnerSection = document.getElementById("display-winner-section");
const displayWinnerP = document.getElementById("display-winner-p");

let img = document.getElementById("dice-image");

let totalWins = [0, 0];
let scoreArr = [0, 0];
let activePlayer = 0;
displayWinnerP.textContent = "";

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
};

let endGame = function () {
  activePlayer = 0;
  current0.textContent = 0;
  current1.textContent = 0;
  scoreArr = [0, 0];
};

let newGame = function () {
  current0.textContent = 0;
  current1.textContent = 0;
  activePlayer = 0;
  scoreArr = [0, 0];
  document.getElementById("dice-image").src = "dice.png";
  displayWinnerP.textContent = "";
  displayWinnerSection.classList.remove("winner");
};

// -------------------------------------------------------------------------------

// rollBtn
roll.addEventListener("click", function () {
  displayWinnerSection.classList.remove("winner");
  displayWinnerP.textContent = " ";
  // Generating randomNumber and adapting dice-image
  let diceNumber = Math.trunc(Math.random() * 6) + 1;
  img.src = `dice-${diceNumber}.png`;

  if (scoreArr[activePlayer] > 30) {
    document.getElementById(`current-${activePlayer}`).textContent =
      scoreArr[activePlayer];
    totalWins[activePlayer] += 1;
    document.getElementById(`total-wins-${activePlayer}`).textContent =
      totalWins[activePlayer];

    displayWinnerP.textContent = `Player ${activePlayer + 1} wins!!!`;

    displayWinnerSection.classList.add("winner");
    endGame();
  } else if (diceNumber === 3) {
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    scoreArr[activePlayer] = 0;
    switchPlayer();
  } else {
    scoreArr[activePlayer] += diceNumber;
    document.getElementById(`current-${activePlayer}`).textContent =
      scoreArr[activePlayer];

    console.log(`${activePlayer}` + "  " + scoreArr[activePlayer]);
  }
});

// HoldBtn eventhandler
hold.addEventListener("click", switchPlayer);

// NewGame eventhandler

newGameBtn.addEventListener("click", newGame);

$("#rules").on({
  click: function () {
    $("#img").slideToggle(),
      $("#game-rules").toggleClass("active").slideToggle(),
      $(this).text($(this).text() == "Show less" ? "Game Rules" : "Show less");
  },
});
