const gameBoard = document.getElementById('gameBoard');
const startButton = document.getElementById('startButton');
const gridSizeInput = document.getElementById('gridSize');

let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard = null;
let secondCard = null;
let pairsFound = 0;
let gridSize = 4;

function initGame(){
    gridSize = parseInt(gridSizeInput.value);
    gameBoard.innerHTML = "";
    cards = [];
    pairsFound = 0;
    resetBoard();

    const totalPairs = Math.floor((gridSize* gridSize) / 2);

    const numbers = [];
    for (let i = 1; i <= totalPairs; i++) {
        numbers.push(i,i);
    }

    shuffleArray(numbers);

    numbers.forEach((number, index) =>{
        const card = createCard(number, index);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

function createCard(number, index) {
    const card = document.createElement("div");
    card.classList.add('card', 'hidden');
    card.dataset.number = number;
    card.dataset.index = index;
    card.textContent = number;
    card.addEventListener("click", flipCard);
    return card;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains('matched')) return;

    this.classList.remove('hidden');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.number === secondCard.dataset.number;

    if (isMatch) {
        disableCards();
        pairsFound++;
        checkGameOver();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() =>{
        firstCard.classList.add('hidden');
        secondCard.classList.add('hidden');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

function checkGameOver() {
    const totalPairs = Math.floor((gridSize * gridSize) / 2);
    if(pairsFound === totalPairs) {
        setTimeout(() => {
            alert("Congratulations! You found all pairs!");
            initGame();
        }, 1000);
    }
}

startButton.addEventListener("click", initGame);

document.addEventListener('DOMContentLoaded', initGame);
