/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/classes/Game.ts":
/*!*****************************!*\
  !*** ./src/classes/Game.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n/* harmony import */ var _UI__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UI */ \"./src/classes/UI.ts\");\n\r\n\r\nclass Game {\r\n    constructor() {\r\n        this.word = [];\r\n        this.mistakes = 0;\r\n        this.lettersUsed = [];\r\n        this.findLetters = 0;\r\n        this.allLetters = 0;\r\n        this.playing = false;\r\n        this.maxMistakes = 12;\r\n        this.reset();\r\n    }\r\n    reset() {\r\n        const word = _constants__WEBPACK_IMPORTED_MODULE_0__[\"WORDS\"][Math.floor(Math.random() * _constants__WEBPACK_IMPORTED_MODULE_0__[\"WORDS\"].length)];\r\n        this.word = word\r\n            .toUpperCase()\r\n            .split(\"\")\r\n            .map((item) => ({ find: false, key: item.charCodeAt(0) }));\r\n        this.mistakes = 0;\r\n        this.findLetters = 0;\r\n        this.lettersUsed = [];\r\n        this.allLetters = this.word.filter((item) => item.key !== 32).length;\r\n        this.playing = true;\r\n        this.updateView();\r\n    }\r\n    checkLetter(letter) {\r\n        if (!this.playing)\r\n            return;\r\n        const letterUsedIndex = this.lettersUsed.findIndex((item) => item === letter);\r\n        if (letterUsedIndex >= 0)\r\n            return;\r\n        const keyCode = letter.charCodeAt(0);\r\n        const letterIndex = this.word.findIndex((item) => item.key === keyCode);\r\n        if (letterIndex < 0) {\r\n            this.mistakes += 1;\r\n        }\r\n        else {\r\n            this.word.forEach((item) => {\r\n                if (item.key === keyCode) {\r\n                    this.findLetters += 1;\r\n                    item.find = true;\r\n                }\r\n            });\r\n        }\r\n        this.lettersUsed.push(letter);\r\n        this.updateView();\r\n        this.checkResult();\r\n    }\r\n    checkResult() {\r\n        if (this.findLetters === this.allLetters) {\r\n            this.playing = false;\r\n            _UI__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayMessage(this.word, true);\r\n        }\r\n        else if (this.mistakes === this.maxMistakes) {\r\n            this.playing = false;\r\n            _UI__WEBPACK_IMPORTED_MODULE_1__[\"default\"].displayMessage(this.word, false);\r\n        }\r\n    }\r\n    updateView() {\r\n        _UI__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateCanvas(this.mistakes);\r\n        _UI__WEBPACK_IMPORTED_MODULE_1__[\"default\"].updateWord(this.word, this.lettersUsed);\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\r\n\n\n//# sourceURL=webpack:///./src/classes/Game.ts?");

/***/ }),

/***/ "./src/classes/UI.ts":
/*!***************************!*\
  !*** ./src/classes/UI.ts ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants.ts\");\n\r\nclass UI {\r\n    static updateCanvas(mistakes) {\r\n        const canvas = document.getElementById(\"canvas\");\r\n        const hangmanCanvas = document.querySelector(\".hangman__canvas\");\r\n        const ctx = canvas.getContext(\"2d\");\r\n        const width = hangmanCanvas.clientWidth;\r\n        const height = hangmanCanvas.clientHeight;\r\n        canvas.width = width;\r\n        canvas.height = height;\r\n        const proportion = height / 625;\r\n        ctx.strokeStyle = \"#efefef\";\r\n        ctx.lineWidth = 3;\r\n        ctx.lineCap = \"round\";\r\n        ctx.clearRect(0, 0, width, height);\r\n        for (let i = 0; i < mistakes; i++) {\r\n            const drawItem = _constants__WEBPACK_IMPORTED_MODULE_0__[\"DRAW_ELEMENTS\"][i];\r\n            ctx.beginPath();\r\n            if (drawItem.type === \"circle\" && drawItem.center && drawItem.radius) {\r\n                ctx.arc(drawItem.center[0] * proportion, drawItem.center[1] * proportion, drawItem.radius * proportion, 0, Math.PI * 2);\r\n                ctx.stroke();\r\n            }\r\n            else if (drawItem.type === \"line\" && drawItem.start && drawItem.end) {\r\n                ctx.moveTo(drawItem.start[0] * proportion, drawItem.start[1] * proportion);\r\n                ctx.lineTo(drawItem.end[0] * proportion, drawItem.end[1] * proportion);\r\n                ctx.stroke();\r\n            }\r\n            ctx.closePath();\r\n        }\r\n    }\r\n    static updateWord(word, lettersUsed) {\r\n        const hangmanWord = document.querySelector(\".hangman__word\");\r\n        const hangmanLetters = document.querySelector(\".hangman__letters\");\r\n        hangmanWord.innerHTML = \"\";\r\n        word.forEach((item) => {\r\n            hangmanWord.innerHTML +=\r\n                item.key === 32\r\n                    ? `<span class=\"word__space\"></span>`\r\n                    : `<span class=\"word__letter\">${item.find ? String.fromCharCode(item.key) : \"\"}</span>`;\r\n        });\r\n        hangmanLetters.innerHTML =\r\n            lettersUsed.length > 0\r\n                ? `<span class=\"text--light\">Letters used: </span> ${lettersUsed.join(\", \")}`\r\n                : \"\";\r\n    }\r\n    static displayMessage(word, success = false) {\r\n        const messageElement = document.querySelector(\".message\");\r\n        const messageContent = document.querySelector(\".message__content\");\r\n        const wordString = word\r\n            .map((item) => String.fromCharCode(item.key))\r\n            .join(\"\");\r\n        messageContent.innerHTML = `\r\n      <h1 class=\"message__title\"><span class=\"text__gradient\">${success ? \"You win\" : \"You lost\"}!</span></h1>\r\n      <p class=\"message__text\"><span class=\"text--light\">The word:</span> ${wordString}</p>\r\n    `;\r\n        messageElement.classList.add(\"message--active\");\r\n    }\r\n}\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (UI);\r\n\n\n//# sourceURL=webpack:///./src/classes/UI.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: DRAW_ELEMENTS, WORDS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DRAW_ELEMENTS\", function() { return DRAW_ELEMENTS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WORDS\", function() { return WORDS; });\nconst DRAW_ELEMENTS = [\r\n    {\r\n        type: \"line\",\r\n        start: [160, 470],\r\n        end: [105, 525],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [160, 470],\r\n        end: [215, 525],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [160, 105],\r\n        end: [160, 470],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [160, 105],\r\n        end: [365, 105],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [161, 175],\r\n        end: [243, 106],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [365, 105],\r\n        end: [365, 165],\r\n    },\r\n    {\r\n        type: \"circle\",\r\n        radius: 45,\r\n        center: [365, 210],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [365, 255],\r\n        end: [365, 400],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [365, 315],\r\n        end: [305, 270],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [365, 315],\r\n        end: [425, 270],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [365, 400],\r\n        end: [420, 455],\r\n    },\r\n    {\r\n        type: \"line\",\r\n        start: [365, 400],\r\n        end: [310, 455],\r\n    },\r\n];\r\nconst WORDS = [\r\n    \"programming\",\r\n    \"front end developer\",\r\n    \"typescript\",\r\n];\r\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Game */ \"./src/classes/Game.ts\");\n\r\nconst startButton = document.getElementById(\"start-game\");\r\nconst resetButton = document.getElementById(\"reset-game\");\r\nconst keyboardButton = document.getElementById(\"keyboard\");\r\nconst virtualInput = document.getElementById(\"virtual-input\");\r\nlet hangmanGame;\r\nfunction checkMobileDevice() {\r\n    return /iPhone|iPad|iPod|Android|webOS|BlackBerry|Window Phone/i.test(navigator.userAgent);\r\n}\r\nfunction init() {\r\n    hangmanGame = new _classes_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n    if (checkMobileDevice()) {\r\n        virtualInput.focus();\r\n        virtualInput.click();\r\n        keyboardButton.classList.add(\"button--round--active\");\r\n    }\r\n}\r\nstartButton.addEventListener(\"click\", () => {\r\n    hangmanGame.reset();\r\n});\r\nresetButton.addEventListener(\"click\", () => {\r\n    const messageElement = document.querySelector(\".message\");\r\n    hangmanGame.reset();\r\n    messageElement.classList.remove(\"message--active\");\r\n});\r\nkeyboardButton.addEventListener(\"click\", () => {\r\n    virtualInput.focus();\r\n    virtualInput.click();\r\n});\r\ndocument.addEventListener(\"keydown\", (e) => {\r\n    if ((e.keyCode >= 65 && e.keyCode <= 90) ||\r\n        (e.keyCode >= 97 && e.keyCode <= 122))\r\n        hangmanGame.checkLetter(e.key.toUpperCase());\r\n});\r\nwindow.addEventListener(\"resize\", () => {\r\n    hangmanGame.updateView();\r\n});\r\ninit();\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ })

/******/ });