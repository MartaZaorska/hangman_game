import { Letter } from "../types";
import { WORDS } from "../constants";
import UI from "./UI";

class Game {
  private word: Letter[] = [];
  private mistakes: number = 0;
  private lettersUsed: string[] = [];
  private findLetters: number = 0;
  private allLetters: number = 0;
  private playing: boolean = false;
  readonly maxMistakes: number = 12;

  constructor() {
    this.reset();
  }

  public reset(): void {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    this.word = word
      .toUpperCase()
      .split("")
      .map((item: string) => ({ find: false, key: item.charCodeAt(0) }));
    this.mistakes = 0;
    this.findLetters = 0;
    this.lettersUsed = [];
    this.allLetters = this.word.filter(
      (item: Letter) => item.key !== 32
    ).length;
    this.playing = true;

    this.updateView();
  }

  public checkLetter(letter: string): void {
    if (!this.playing) return;

    const letterUsedIndex = this.lettersUsed.findIndex(
      (item: string) => item === letter
    );

    if (letterUsedIndex >= 0) return;

    const keyCode = letter.charCodeAt(0);

    const letterIndex = this.word.findIndex(
      (item: Letter) => item.key === keyCode
    );

    if (letterIndex < 0) {
      this.mistakes += 1;
    } else {
      this.word.forEach((item: Letter) => {
        if (item.key === keyCode) {
          this.findLetters += 1;
          item.find = true;
        }
      });
    }

    this.lettersUsed.push(letter);
    this.updateView();
    this.checkResult();
  }

  public checkResult(): void {
    if (this.findLetters === this.allLetters) {
      this.playing = false;
      UI.displayMessage(this.word, true);
    } else if (this.mistakes === this.maxMistakes) {
      this.playing = false;
      UI.displayMessage(this.word, false);
    }
  }

  public updateView() {
    UI.updateCanvas(this.mistakes);
    UI.updateWord(this.word, this.lettersUsed);
  }
}

export default Game;
