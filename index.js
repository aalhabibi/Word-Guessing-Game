const words = [
  "JOKE",
  "RICH",
  "FAIR",
  "DEAR",
  "ZOOM",
  "KEYS",
  "FROG",
  "VAST",
  "TIDE",
  "JUMP",
  "PONY",
  "ECHO",
  "GIFT",
  "YAWN",
  "LION",
  "ZERO",
  "FUEL",
  "MINT",
  "SOFT",
  "HELP",
  "FIRM",
  "QUAD",
  "WARM",
  "GLOW",
  "BOLD",
  "TREE",
  "BARK",
  "KICK",
  "MOON",
  "NEST",
  "PARK",
  "VIBE",
  "DARK",
  "JOIN",
  "LAZY",
  "FUNK",
  "WIND",
  "RAFT",
  "GAME",
  "ROSE",
  "VEIL",
  "KISS",
  "LOVE",
  "NICE",
  "QUAD",
  "YEAR",
  "ZONE",
  "WILD",
  "HOME",
  "LAMP",
];
const hints = [
  "Something funny",
  "Wealthy",
  "Just",
  "Precious",
  "Zoom in",
  "Opens doors",
  "Amphibian",
  "Extensive",
  "Ocean movement",
  "Leap",
  "Small horse",
  "Sound reflection",
  "Present",
  "Tired stretch",
  "Big cat",
  "Nothing",
  "Energy source",
  "Fresh herb",
  "Gentle",
  "Assistance",
  "Stable",
  "Four-wheel drive",
  "Warm temperature",
  "Soft light",
  "Brave",
  "Woody plant",
  "Dog sound",
  "Strike with foot",
  "Celestial body",
  "Bird's home",
  "Public garden",
  "Atmosphere",
  "Dim light",
  "Come together",
  "Indolent",
  "Music genre",
  "Moving air",
  "Small boat",
  "Plaything",
  "Flower",
  "Thin covering",
  "Affectionate touch",
  "Romantic feeling",
  "Pleasant",
  "Four-wheel drive",
  "Annual period",
  "Area",
  "Untamed",
  "Residence",
  "Illumination",
];

const guessButton = document.getElementById("guess-button");
const resetButton = document.getElementById("reset-button");

let gameOver = false;
let guessedLetters = 0;
let chances = 5;

let wordIndex = Math.floor(Math.random() * 50);

let word = words[wordIndex];
let hint = hints[wordIndex];

let wrongLetters = [];

document.getElementById("hint").innerHTML =
  '<span style="font-weight: bold;">Hint: </span>' + hint;
document.getElementById("remaining-chances").innerHTML =
  '<span style="font-weight: bold;">Remaining Chances</span><br>' + chances;

function reset() {
  for (let index = 0; index < 4; index++) {
    document.getElementById("letter" + (index + 1)).innerHTML = "";
    document.getElementById("letter" + (index + 1)).style.color = "#00ff1a";
  }
  document.getElementById("game-status").style.color = "white";
  document.getElementById("guess-textbox").value = "";

  document.getElementById("game-status").innerHTML = "Guess The Word!!";

  document.getElementById("hint").innerHTML =
    '<span style="font-weight: bold;">Hint: </span>' + hint;
  document.getElementById("remaining-chances").innerHTML =
    '<span style="font-weight: bold;">Remaining Chances</span><br>' + chances;

  document.getElementById("wrong-letters").innerHTML = "";
  wrongLetters = [];

  gameOver = false;
}

function win() {
  chances++;
  gameOver = true;
  document.getElementById("game-status").innerHTML =
    "Congrats! You have guessed the word correctly.";

  document.getElementById("game-status").style.color = "#00ff1a";
}

function lose() {
  gameOver = true;

  document.getElementById("game-status").innerHTML =
    "You ran out of chances :(";

  document.getElementById("game-status").style.color = "red";

  for (let i = 0; i < word.length; i++) {
    if (!document.getElementById("letter" + (i + 1)).innerHTML) {
      document.getElementById("letter" + (i + 1)).innerHTML = word[i];

      document.getElementById("letter" + (i + 1)).style.color = "red";
    }
  }
}

function checkGuess(word) {
  let guess = document.getElementById("guess-textbox").value;

  //Checking if input is correct and consists of english letters

  const gameStatus = document.getElementById("game-status");

  if (guess.length != 1 && guess.length != 4) {
    gameStatus.innerHTML =
      "Please enter a single letter or a full 4-letter word.";

    gameStatus.classList.add("shake");

    gameStatus.addEventListener(
      "animationend",
      () => {
        gameStatus.classList.remove("shake");
      },
      { once: true }
    );

    return;
  }
  for (let index = 0; index < guess.length; index++) {
    if (!/^[a-zA-Z]$/.test(guess[index])) {
      gameStatus.innerHTML =
        "Make sure your guess consists of English letters.";

      gameStatus.classList.add("shake");

      gameStatus.addEventListener(
        "animationend",
        () => {
          gameStatus.classList.remove("shake");
        },
        { once: true }
      );
      return;
    }
  }

  chances--;

  //Comparing every letter of the user's guess with letters of the word

  for (let i = 0; i < guess.length; i++) {
    let found = false;

    for (let j = 0; j < word.length; j++) {
      if (guess[i].toUpperCase() === word[j].toUpperCase()) {
        //Check if letter already guessed

        found = true;

        if (
          !(document.getElementById("letter" + (j + 1)).innerHTML == word[j])
        ) {
          document.getElementById("letter" + (j + 1)).innerHTML = word[j];

          guessedLetters++;
        }
      }
    }

    if (!found && !wrongLetters.includes(guess[i].toUpperCase())) {
      wrongLetters.push(guess[i].toUpperCase());
    }

    //Guessed 1 letter only and its correct

    if (found && guess.length === 1) chances++;
  }

  document.getElementById("guess-textbox").value = "";

  if (guessedLetters === 4) {
    win();
  } else if (chances === 0) {
    lose();
  }

  document.getElementById("remaining-chances").innerHTML =
    '<span style="font-weight: bold;">Remaining Chances</span><br>' + chances;

  if (wrongLetters.length != 0) {
    let wrongLettersString = "";

    for (let index = 0; index < wrongLetters.length; index++) {
      wrongLettersString += wrongLetters[index] + " ";
    }

    document.getElementById("wrong-letters").innerHTML =
      '<span style="font-weight: bold;">Wrong Guessed Letters</span><br>' +
      wrongLettersString;

    wrongLettersString = "";
  }
}

function loadGame() {
  console.log(word);

  //Reset Button Listener

  resetButton.addEventListener("click", function () {
    //Reset counters

    chances = 5;
    guessedLetters = 0;

    //Reset word
    wordIndex = Math.floor(Math.random() * 50);

    word = words[wordIndex];
    hint = hints[wordIndex];

    reset();

    console.log(word);
  });

  //Guess button listener

  guessButton.addEventListener("click", function () {
    if (!gameOver) {
      checkGuess(word);
    }
  });

  //Enter key listener

  document
    .getElementById("guess-textbox")
    .addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (!gameOver) {
          checkGuess(word);
        }
      }
    });
}

loadGame();
