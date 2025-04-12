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

const availableImages = Array.from({length: 32}, (_, i) => `images/img${i+1}.jpg`);


function initGame(){
    gridSize = parseInt(gridSizeInput.value);
    gameBoard.innerHTML = "";
    cards = [];
    pairsFound = 0;
    resetBoard();

    const totalPairs = Math.floor((gridSize* gridSize) / 2);

    const selectedImages = availableImages.slice(0, totalPairs);
    const imagePairs = [...selectedImages, ...selectedImages];

    shuffleArray(imagePairs);

    imagePairs.forEach((imageUrl1, index) =>{
        const card = createImageCard(imageUrl1, index);
        gameBoard.appendChild(card);
        cards.push(card);
    });

    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
}

function createImageCard(imageUrl, index) {
    const card = document.createElement("div");
    card.classList.add('card', 'hidden');
    card.dataset.imageUrl = imageUrl; // Folosim imageUrl în loc de number
    card.dataset.index = index;

    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.display = 'none';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    card.appendChild(img);

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
    this.querySelector('img').style.display = 'block';

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.imageUrl === secondCard.dataset.imageUrl;

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
        firstCard.querySelector('img').style.display = 'none';
        secondCard.querySelector('img').style.display = 'none';
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
