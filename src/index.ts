import Game from "./classes/Game";

const startButton = document.getElementById("start-game")!;
const resetButton = document.getElementById("reset-game")!;

let hangmanGame: Game;

function init() {
  hangmanGame = new Game();
}

startButton.addEventListener("click", () => {
  hangmanGame.reset();
});

resetButton.addEventListener("click", () => {
  const messageElement = document.querySelector(".message")!;
  hangmanGame.reset();
  messageElement.classList.remove("message--active");
});

document.addEventListener("keydown", (e: KeyboardEvent) => {
  const letter = e.key.toUpperCase();
  if (letter.charCodeAt(0) >= 65 && letter.charCodeAt(0) <= 90)
    hangmanGame.checkLetter(letter);
});

window.addEventListener("resize", () => {
  hangmanGame.updateView();
});

init();
