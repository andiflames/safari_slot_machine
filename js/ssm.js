// Image URLs 
const giraffeImageUrl = "./images/baby-giraffe.png";
const elephantImageUrl = "./images/baby-elephant.png";
const monkeyImageUrl = "./images/monkey.png";
const lionImageUrl = "./images/baby-lion.png";
const imageOptions = {
    'giraffe': giraffeImageUrl,
    'elephant': elephantImageUrl,
    'monkey': monkeyImageUrl,
    'lion': lionImageUrl
}

// Elements 
const spinner1 = document.getElementById('spinner1');
const spinner2 = document.getElementById('spinner2');
const spinner3 = document.getElementById('spinner3');
const spinBtn = document.querySelector("#spinBtn");
let activeBet = document.getElementsByClassName("active-bet")[0];
const creditsDisplay = document.getElementById("credits");
const resultsArea = document.getElementById('results');
const gameOver = document.getElementById('gameOver');
const payoutSchedule = document.getElementById('payoutSchedule');
const cashOut = document.getElementById('cashOut');

// Credits
let currentCredits = 0;

// Game Ended
let gameEnded = false;

// Event Listeners  
spinBtn.addEventListener("click", () => {
    if (gameEnded) {
        initializeGame();
        return;
    }
    if (currentCredits >= parseInt(activeBet.textContent)) {
        executeSpin();
    }
})

document.querySelectorAll('.bets').forEach(item => {
    item.addEventListener('click', (event) => {
        setAsActiveBet(item);
    });
});

cashOut.addEventListener('click', () => {
    alert(`You have won ${currentCredits} credits!! Thanks for playing!`)
    initializeGame();
})

// Helper Function
function changeSpinnerBackground(spinner, imgUrl) {
    spinner.style.backgroundImage = `url('${imgUrl}')`;
}

function updateCredits(amount) {
    currentCredits = amount;
    creditsDisplay.textContent = amount;
}

// Cited Array Equals function from https://masteringjs.io/tutorials/fundamentals/compare-arrays
function arrayEquals(a, b) {
    return Array.isArray(a) && Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
  }

function gameOverCheck() {
    if (currentCredits < 1) {
        payoutSchedule.style.display = "none";
        cashOut.style.display = "none";
        gameOver.style.display = "block";
        spinBtn.innerHTML = "Restart"
        gameEnded = true;
    }
}

function calculateScore(results) {
    let multiplyTen = ['elephant', 'lion', 'giraffe'];
    let multiplyFive = ['elephant','elephant','elephant'];
    let multiplyFour = ['giraffe', 'giraffe', 'giraffe'];
    let multiplyTwo = ['lion', 'lion', 'lion'];
    if (results.includes('monkey')) {
        return parseInt(activeBet.textContent);
    } 
    if (arrayEquals(results, multiplyTen)) {
        return parseInt(activeBet.textContent) * 10;
    }
    if (arrayEquals(results, multiplyFive)) {
        return parseInt(activeBet.textContent) * 5;
    }
    if (arrayEquals(results, multiplyFour)) {
        return parseInt(activeBet.textContent) * 4;
    }
    if (arrayEquals(results, multiplyTwo)) {
        return parseInt(activeBet.textContent) * 2;
    }
    return 0;
}

function updateResultsArea(winnings) {
    if (winnings > 0) {
        resultsArea.textContent = `You've won ${winnings} credit(s)!`
    }
    else {
        resultsArea.textContent = `You've lost your bet of ${activeBet.textContent} credit(s).`
    }
}

function spinAndUpdate() {
    let spinOptions = Object.keys(imageOptions);
    let spin1index = Math.floor(Math.random() * (spinOptions.length));
    let spin2index = Math.floor(Math.random() * (spinOptions.length));
    let spin3index = Math.floor(Math.random() * (spinOptions.length));
    let spinResult = [spinOptions[spin1index], spinOptions[spin2index], spinOptions[spin3index]]
    changeSpinnerBackground(spinner1, imageOptions[spinOptions[spin1index]]);
    changeSpinnerBackground(spinner2, imageOptions[spinOptions[spin2index]]);
    changeSpinnerBackground(spinner3, imageOptions[spinOptions[spin3index]]);
    return spinResult
}

function executeSpin() {
    let spinResult;
    let winnings = 0;
    updateCredits(currentCredits - parseInt(activeBet.textContent));
    spinResult = spinAndUpdate();
    winnings = calculateScore(spinResult);
    updateCredits(currentCredits + winnings);
    updateResultsArea(winnings);
    gameOverCheck();
}

function setAsActiveBet(betOption) {
    activeBet.classList.remove("active-bet");
    betOption.classList.add("active-bet");
    activeBet = betOption;
}

function initializeGame(){
    payoutSchedule.style.display = "block";
    cashOut.style.display = "block";
    gameOver.style.display = "none";
    spinBtn.innerHTML = "Spin"
    gameEnded = false;
    updateCredits(50);
    changeSpinnerBackground(spinner1, giraffeImageUrl);
    changeSpinnerBackground(spinner2, giraffeImageUrl);
    changeSpinnerBackground(spinner3, giraffeImageUrl); 
 }

initializeGame();