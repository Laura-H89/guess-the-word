const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress"); 
const guessesRemainingElement = document.querySelector(".guesses-remaining");
const guessesRemainingSpan = document.querySelector(".remaining-span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

const placeHolder = function(word) {
    const oldWord = word.split("");
    const newWord = oldWord.map(function(letter) {
        return "●";
    });
    wordInProgress.innerText = newWord.join("");
};
placeHolder(word);

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    //console.log(guess);
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value="";
});

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter just one letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Guess must be a letter from A to Z.";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess=guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "Letter already guessed. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        showGuesses();
        updateWordInProgress(guessedLetters);
    }
};

const showGuesses = function() {
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const trueLetters=[];
    for(const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            trueLetters.push(letter.toUpperCase());
        } else {
            trueLetters.push("●");
        }
    }
    //console.log(trueLetters);
    wordInProgress.innerText = trueLetters.join("");
    ifPlayerWon();
};

const ifPlayerWon = function() {
    if(word.toUpperCase()===wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    }
}