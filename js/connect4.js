const connect4 = document.getElementById("connect4");
const h1 = document.querySelector("h1");

const WIDTH = 7;
const HEIGHT = 6;

const PLAYER1 = "yellow";
const PLAYER2 = "red";

let song = new Audio();

let winner = null;
let lastChoice;

/* vertical */
let board = new Array(HEIGHT);

/* count hit */
let count = 0;

/**
 * Create double dimensions array
 */
function sizeBoard() {
	/* horizontal */
	for (let i = 0; i < board.length; i++) {
		board[i] = new Array(WIDTH);
	}
}

/**
 * Create game board and add event on div
 * at the top of game board for put token.
 * Add tabIndex on top div too
 */
function createBoard() {

	/* vertical */
	for (let i = 0; i < board.length; i++) {
		/* horizontal */
		for (let j = 0; j < board[i].length; j++) {
			board[i][j] = document.createElement("div");
			board[i][j].className = "case";
			connect4.appendChild(board[i][j]);
			/* event only on top board */
			board[i][j].addEventListener("click",play);
			/* to do distinction beetwen columns */
			board[i][j].tabIndex = j;
		}
		j = 0;
	}
}

/** 
 * Remove event play on each case 
 */
function desactivate() {
	/* vertical */
	for (let i = 0; i < board.length; i++) {
		/* horizontal */
		for (let j = 0; j < board[i].length; j++) {
			board[i][j].removeEventListener("click",play);
		}
	}
}

/**
 * Color of player for each round   
 */ 
function round() {
	count++;
	return count % 2 === 0 ? PLAYER1 : PLAYER2;
}

/**
 * Check if column is full or empty and put a token in column if is not empty 
 * @param {*} coordonnees number of column
 */
function checkColumns(coordonnees) {

	let empty = [];

	/* vertical */
	for (let i = board.length - 1; i >= 0; i--) {
		if (board[i][coordonnees].style.backgroundColor === "") {
			empty.push(board[i][coordonnees]);
		}
	}
	if (empty.length > 0) {
		empty[0].style.backgroundColor = round();
		/* return last move color */
		return empty[0].style.backgroundColor;
	}
}

/**
 * Check if is a winner move
 * @param {*} array board game
 * @param {*} piece place piece
 */
function checkWinner(array,piece) {

	winner = piece;

	/* horizontal */
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH - 3; j++) {
			if (array[i][j].style.backgroundColor === piece 
				&& array[i][j+1].style.backgroundColor === piece 
				&& array[i][j+2].style.backgroundColor === piece 
				&& array[i][j+3].style.backgroundColor === piece) {
                return winner;
            }
        }
    }
    /* vertical */
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT - 3; j++) {
			if (array[j][i].style.backgroundColor === piece 
				&& array[j+1][i].style.backgroundColor === piece 
				&& array[j+2][i].style.backgroundColor === piece 
				&& array[j+3][i].style.backgroundColor === piece) {
                return winner;
            }
        }
    }
    /* diagonal */
    for (let i = HEIGHT - 1; i > 2; i--) {
        for (let j = 0; j < WIDTH - 3; j++) {
			if (array[i][j].style.backgroundColor === piece 
				&& array[i-1][j+1].style.backgroundColor === piece 
				&& array[i-2][j+2].style.backgroundColor === piece 
				&& array[i-3][j+3].style.backgroundColor === piece) {
                return winner;
            }
        }
    }
    /* anti diagonal */
    for (let i = HEIGHT - 1; i > 2; i--) {
        for (let j = WIDTH - 1; j > 2; j--) {
			if (array[i][j].style.backgroundColor === piece 
				&& array[i-1][j-1].style.backgroundColor === piece 
				&& array[i-2][j-2].style.backgroundColor === piece 
				&& array[i-3][j-3].style.backgroundColor === piece) {
                return winner;
            }
        }
    }
    return null;
}

/**   
 * Reload page for replay
 */
function replay() {
	location.reload();
}

/**  
 * Button replay and event listener for replay
 */
function btnReplay() {
	let btn = document.createElement("button");
	btn.textContent = "Replay";
	document.body.appendChild(btn);
	btn.addEventListener("click",replay);
}

/**
 * When players click
 */
function play() {
	let result;
	lastChoice = checkColumns(this.tabIndex);
	if (count > 6) {
		result = checkWinner(board,lastChoice);
		if (result !== null) {
			song.src = "song/Tada.mp3";
			song.play();
			desactivate();
			let myP = document.createElement("p");
			let content = document.createTextNode("Winner : " + winner);
			myP.appendChild(content);
			
			if(winner === "red") {
				myP.style.color = "white";
				h1.style.color = "white";
			}
			document.body.appendChild(myP);
			document.body.style.backgroundColor = winner;
			btnReplay();
		}
	}

    if (count === 42 && result === null) {
		song.src = "song/Lose.mp3";
		song.play();
		desactivate();
        let myP = document.createElement("p");
        let content = document.createTextNode("Tie !");
        myP.appendChild(content);
		document.body.appendChild(myP);
		btnReplay();
    }
}

sizeBoard();
createBoard();