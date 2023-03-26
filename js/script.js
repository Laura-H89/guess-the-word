const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress"); 
const guessesRemainingElement = document.querySelector(".remaining");
const guessesRemainingSpan = document.querySelector(".remaining span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    //console.log(data);
    const wordArray = data.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeHolder(word);
};

getWord();

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
        guessesRemaining(guess);
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
    wordInProgress.innerText = trueLetters.join("");
    ifPlayerWon();
};

const guessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    if(upperWord.includes(guess)) {
        message.innerText = `Yes! The word has the letter ${guess}.`;
    } else {
        message.innerText = `Oof. The word does NOT have ${guess}.`;
        if (remainingGuesses > 0) {
            remainingGuesses -= 1;
        }
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over. The word is <span class = "highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        guessesRemainingSpan.innerText = `${remainingGuesses} guess`;
    } else {
        guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const ifPlayerWon = function() {
    if(word.toUpperCase()===wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = '<p class="highlight">You guessed correct the word! Congrats!</p>';
    
        startOver();
    }
};

const startOver = function(){
    guessLetterButton.classList.add("hide");
    guessesRemainingElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function(e) {
    message.classList.remove("win");
    message.innerText="";
    guessedLettersElement.innerHTML="";
    remainingGuesses = 8;
    guessedLetters = [];
    guessesRemainingSpan.innerText = `${remainingGuesses} guesses`;

    getWord();

    guessLetterButton.classList.remove("hide");
    guessesRemainingElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");
});