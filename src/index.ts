import Game from "./classes/Game";
import UI from "./classes/UI";

const startButton = document.getElementById("start-game")!;
const resetButton = document.getElementById("reset-game")!;
const closeKeyboard = document.getElementById("keyboard-close")!;
const openKeyboard = document.getElementById("keyboard-open")!;
const keyboardElement = document.querySelector(".keyboard")!;

let hangmanGame: Game;

// servicer worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceWorker.js")
      .then((reg) => console.log("Service Worker: Registered"))
      .catch((err) => console.log("Service Worker: Error"));
  });
}

function keyboardHandler(keyCode: number): void {
  if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122))
    hangmanGame.checkLetter(String.fromCharCode(keyCode).toUpperCase());
}

function keyboardToggle(): void {
  keyboardElement.classList.toggle("keyboard--active");
}

function init() {
  hangmanGame = new Game();
  UI.createKeyboard();
}

startButton.addEventListener("click", () => {
  hangmanGame.reset();
});

resetButton.addEventListener("click", () => {
  const messageElement = document.querySelector(".message")!;
  hangmanGame.reset();
  messageElement.classList.remove("message--active");
});

closeKeyboard.addEventListener("click", keyboardToggle);
openKeyboard.addEventListener("click", keyboardToggle);

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
