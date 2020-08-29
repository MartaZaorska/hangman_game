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
  if (
    (e.keyCode >= 65 && e.keyCode <= 90) ||
    (e.keyCode >= 97 && e.keyCode <= 122)
  )
    hangmanGame.checkLetter(e.key.toUpperCase());
});

window.addEventListener("resize", () => {
  hangmanGame.updateView();
});

init();
