guessedLettersElement = document.querySelector(".guessed-letters");
const guessLettersButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress"); 
const guessesRemainingElement = document.querySelector(".guesses-remaining");
const guessesRemainingSpan = document.querySelector(".remaining-span")
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
const word = "magnolia";

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value="";
});