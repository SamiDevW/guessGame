
const intro = document.querySelector('.intro');


const menu = document.querySelector(".menu");
const userGame = document.querySelector(".user-game");
const userInput = document.querySelector(".user-input");
const guessBtn = document.querySelector(".guess-btn");
const feedback = document.querySelector(".feedback");
const backMenuUser = document.querySelector(".back-menu-user");
const playUserBtn = document.querySelector(".play-user-btn");


const compGame = document.querySelector(".comp-game");
const startCompBtn = document.querySelector(".start-comp-btn");
const compSection = document.querySelector(".comp-section");
const compFeedback = document.querySelector(".comp-feedback");
const lowerBtn = document.querySelector(".lower");
const higherBtn = document.querySelector(".higher");
const correctBtn = document.querySelector(".correct");
const backMenuComp = document.querySelector(".back-menu-comp");
const playCompBtn = document.querySelector(".play-comp-btn");


let numToGuessUser = Math.floor(Math.random() * 100) + 1;
let triesUser = 0;
const maxTriesUser = 10;

let minComp = 1;
let maxComp = 100;
let compTries = 0;
const maxCompTries = 10;
let compGuess;

intro.classList.remove('hidden');

playUserBtn.addEventListener("click", () => {
    toggleVisibility(menu, userGame, intro);
    resetUserGame();
});

guessBtn.addEventListener("click", () => {
    const guessValue = userInput.value.trim();
    if (guessValue === '') {
        feedback.textContent = "Please enter a number.";
        return;
    }

    const guess = parseInt(guessValue, 10);
    triesUser += 1;

    if (guess < numToGuessUser) {
        feedback.textContent = "Too low! Try again.";
    } else if (guess > numToGuessUser) {
        feedback.textContent = "Too high! Try again.";
    } else {
        feedback.textContent = `Congratulations! You've guessed the number in ${triesUser} tries.`;
        backMenuUser.classList.remove("hidden");
    }

    if (triesUser >= maxTriesUser) {
        feedback.textContent = `You've reached the maximum number of tries (${maxTriesUser}). The number was ${numToGuessUser}.`;
        backMenuUser.classList.remove("hidden");
    }
});

backMenuUser.addEventListener("click", () => {
    toggleVisibility(menu, userGame, backMenuUser);
    resetUserGame();
});


playCompBtn.addEventListener("click", () => {
    toggleVisibility(menu, compGame, intro);
    resetCompGame();
});

startCompBtn.addEventListener("click", () => {
    minComp = 1;
    maxComp = 100;
    compTries = 0;
    compSection.classList.remove("hidden");
    startCompBtn.classList.add("hidden");
    backMenuComp.classList.remove("hidden");
    compMakeGuess();
});

lowerBtn.addEventListener("click", () => {
    maxComp = compGuess - 1;
    compMakeGuess();
});

higherBtn.addEventListener("click", () => {
    minComp = compGuess + 1;
    compMakeGuess();
});

correctBtn.addEventListener("click", () => {
    compFeedback.textContent = `I guessed it in ${compTries} tries!`;
    compSection.classList.add("hidden");
});

backMenuComp.addEventListener("click", () => {
    toggleVisibility(menu, compGame, compSection, backMenuComp, startCompBtn, intro);
    resetCompGame();
});


function resetUserGame() {
    numToGuessUser = Math.floor(Math.random() * 100) + 1;
    triesUser = 0;
    feedback.textContent = '';
    userInput.value = '';
}


function compMakeGuess() {
    compGuess = Math.floor((minComp + maxComp) / 2);
    compTries += 1;
    compFeedback.textContent = `Is it ${compGuess}?`;

    if (compTries >= maxCompTries) {
        compFeedback.textContent = `I reached the maximum number of tries (${maxCompTries}). The number was ${compGuess}.`;
        compSection.classList.add("hidden");
    }
}

function resetCompGame() {
    minComp = 1;
    maxComp = 100;
    compTries = 0;
    compFeedback.textContent = '';
}

function toggleVisibility(...elements) {
    elements.forEach(el => el.classList.toggle('hidden'));
}
