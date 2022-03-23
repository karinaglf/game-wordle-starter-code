// DOM Elements => Game Area
const board = document.getElementById('game-board');
const message = document.getElementById('message');
const keyboard = document.getElementById('keyboard');

// Game Controllers => Global Variables
const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'];

const wordList = words;
const targetWord = wordList[Math.floor(Math.random() * wordList.length)];
console.log(targetWord);

const gameBoard = [
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
	['', '', '', '', ''],
];
let currentRow = 0;
let currentPosition = 0;
let guessedWord = '';
let isGameOver = false;

// Game Logic => Functions

function drawBoard() {
	gameBoard.forEach((oneRow, index) => {
		const row = document.createElement('div');
		row.setAttribute('id', `row-${index}`);
		row.className = 'row';
		board.appendChild(row);

		oneRow.forEach((oneCard, i) => {
			const card = document.createElement('div');
			card.setAttribute('id', `row-${index}-card-${i}`);
			card.classList.add('card');
			card.innerText = oneCard;
			row.appendChild(card);
		});
	});
}

function drawKeyboard() {
	keys.forEach((key) => {
		const btnKey = document.createElement('button');
		btnKey.innerHTML = key;
		btnKey.setAttribute('value', key);
		btnKey.setAttribute('id', `key-${key}`);
		btnKey.addEventListener('click', () => handleClick(key));
		keyboard.appendChild(btnKey);
	});
}

function startGame() {
	drawKeyboard();
	drawBoard();
}

function startNewGuess() {
	message.innerText = '';

	currentPosition = 0;
	currentRow++;

	if (currentRow > 5 && !isGameOver) {
		message.innerText = `You missed, the word was ${targetWord.toUpperCase()}`;
		isGameOver = true;
	}
}

function handleClick(letter) {
	if (letter === '⌫') {
		deleteLetter();
	} else if (letter === 'ENTER') {
		submitGuess();
	} else {
		addLetter(letter);
	}
}

function addLetter(letter) {
	if (currentPosition < 5 && currentRow <= 6) {
		//Update DOM
		const cardElement = document.getElementById(`row-${currentRow}-card-${currentPosition}`);
		cardElement.innerText = letter;
		cardElement.classList.add('has-letter');

		//Update game controllers
		gameBoard[currentRow][currentPosition] = letter;
		return currentPosition++;
	}
	return
}

function deleteLetter() {
	message.innerText = '';
	if (currentPosition > 0 && currentPosition <= 5) {
        //Update DOM
		const cardElement = document.getElementById(`row-${currentRow}-card-${currentPosition - 1}`);
		cardElement.innerText = '';
		cardElement.classList.remove('has-letter');
		
        //Update game controllers
        gameBoard[currentRow][currentPosition - 1] = "";
        currentPosition--;
		return;
	}
	return;
}

function submitGuess() {
	if (currentPosition < 5) return (message.innerText = 'Not long enough');

	guessedWord = gameBoard[currentRow].join('').toLowerCase();
	console.log(guessedWord);

	if (guessedWord === targetWord) {
		isGameOver = true;
		checkLetters();
		message.innerText = 'You got it!';
	} else if (!wordList.includes(guessedWord)) {
		message.innerText = 'Not in word list!';
	} else {
		checkLetters();
	}
}

function checkLetters() {
	const guessedLetters = gameBoard[currentRow];

	guessedLetters.forEach((letter, i) => {
		const card = document.getElementById(`row-${currentRow}-card-${i}`);
		const btnKey = document.getElementById(`key-${letter}`);

		if (targetWord[i] === letter.toLowerCase()) {
			card.classList.add('correct');
			btnKey.classList.add('correct');
		} else if (targetWord.includes(letter.toLowerCase())) {
			card.classList.add('wrong-place');
			btnKey.classList.add('wrong-place');
		} else {
			card.classList.add('wrong');
			btnKey.classList.add('wrong');
		}
	});

	return startNewGuess();
}

// Initialize Game => Call start function
startGame();
