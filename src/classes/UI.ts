import { DRAW_ELEMENTS } from "../constants";
import { Letter } from "../types";

class UI {
  static updateCanvas(mistakes: number) {
    const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
    const hangmanCanvas = document.querySelector(".hangman__canvas")!;
    const ctx = canvas.getContext("2d")!;
    const width = hangmanCanvas.clientWidth;
    const height = hangmanCanvas.clientHeight;

    canvas.width = width;
    canvas.height = height;
    const proportion = height / 625;

    ctx.strokeStyle = "#efefef";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < mistakes; i++) {
      const drawItem = DRAW_ELEMENTS[i];
      ctx.beginPath();
      if (drawItem.type === "circle" && drawItem.center && drawItem.radius) {
        ctx.arc(
          drawItem.center[0] * proportion,
          drawItem.center[1] * proportion,
          drawItem.radius * proportion,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      } else if (drawItem.type === "line" && drawItem.start && drawItem.end) {
        ctx.moveTo(
          drawItem.start[0] * proportion,
          drawItem.start[1] * proportion
        );
        ctx.lineTo(drawItem.end[0] * proportion, drawItem.end[1] * proportion);
        ctx.stroke();
      }
      ctx.closePath();
    }
  }

  static updateWord(word: Letter[], lettersUsed: string[]): void {
    const hangmanWord = document.querySelector(".hangman__word")!;
    const hangmanLetters = document.querySelector(".hangman__letters")!;

    hangmanWord.innerHTML = "";

    word.forEach((item: Letter) => {
      hangmanWord.innerHTML +=
        item.key === 32
          ? `<span class="word__space"></span>`
          : `<span class="word__letter">${
              item.find ? String.fromCharCode(item.key) : ""
            }</span>`;
    });

    hangmanLetters.innerHTML =
      lettersUsed.length > 0
        ? `<span class="text--light">Letters used: </span> ${lettersUsed.join(
            ", "
          )}`
        : "";
  }

  public static displayMessage(word: Letter[], success: boolean = false) {
    const messageElement = document.querySelector(".message")!;
    const messageContent = document.querySelector(".message__content")!;

    const wordString = word
      .map((item: Letter) => String.fromCharCode(item.key))
      .join("");

    messageContent.innerHTML = `
      <h1 class="message__title"><span class="text__gradient">${
        success ? "You win" : "You lost"
      }!</span></h1>
      <p class="message__text"><span class="text--light">The word:</span> ${wordString}</p>
    `;

    messageElement.classList.add("message--active");
  }
}

export default UI;
