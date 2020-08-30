import Game from "./classes/Game";
import UI from "./classes/UI";

const startButton = document.getElementById("start-game")!;
const resetButton = document.getElementById("reset-game")!;
const closeKeyboard = document.getElementById("keyboard-close")!;
const openKeyboard = document.getElementById("keyboard-open")!;
const keyboardElement = document.querySelector(".keyboard")!;

let hangmanGame: Game;

function init() {
  hangmanGame = new Game();
  UI.createKeyboard();
}

function keyboardHandler(keyCode: number): void {
  if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
    hangmanGame.checkLetter(String.fromCharCode(keyCode).toUpperCase());
}

startButton.addEventListener("click", () => {
  hangmanGame.reset();
});

resetButton.addEventListener("click", () => {
  const messageElement = document.querySelector(".message")!;
  hangmanGame.reset();
  messageElement.classList.remove("message--active");
});

closeKeyboard.addEventListener("click", () => {
  keyboardElement.classList.remove("keyboard--active");
});

openKeyboard.addEventListener("click", () => {
  keyboardElement.classList.add("keyboard--active");
});

keyboardElement.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("keyboard__item"))
    keyboardHandler(target.innerText.charCodeAt(0));
});

document.addEventListener("keydown", (e: KeyboardEvent) =>
  keyboardHandler(e.keyCode)
);

window.addEventListener("resize", () => {
  hangmanGame.updateView();
});

init();
