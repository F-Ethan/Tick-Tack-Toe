var j = 0;
var origBoard;
const huPlayer = 'O'
const aiPlayer = 'x'
const winCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[2, 5, 8],
	[6, 7, 8],
	[0, 4, 8],
	[2, 4, 6],
	[0, 3, 6],
	[1, 4, 7]
]
var wPlayer = huPlayer;
var nuPlayers = "Two Player";
var rules = "This game is one player, click the square you would like to play and see if you can beat the Computer. If you would like to play againts a friend click 'two Player' in the top left";
var game = "Single Player";
var winner1 = "Congratulations Player 1 has Won!";
var winner2 = "Congratulations player 2 has Won!";
var winner;
var display = "block";

const cells = document.querySelectorAll('.cell');
startGame();

function mGames() {
	document.querySelector(".mGames").style.display = display;
	if (display === "none") {
		display = "block";
	} else {

		display = "none";
	}

}

function twoPlayer() {
	if (nuPlayers === "One Player") {
		nuPlayers = "Two Player";
		rules = "This game is one player, click the square you would like to play and see if you can beat the Computer. If you would like to play againts a friend click 'two Player' in to left";
		game = "Single Player";
		startGame();
	} else {
		nuPlayers = "One Player";
		rules = "This game is Two Player. See if you can't best your friends in this classic game of wights. To play single player please selcect the button in the top left 'One Player' Thanks for playing!";
		game = "Two Player";
		startGame();
	}
}

function startGame() {
	document.querySelector(".endgame").style.display = "none";
	origBoard = Array.from(Array(9).keys());

	document.querySelector(".twoPlayer").innerText = nuPlayers;
	document.querySelector(".twoPlayer").style.color =
		nuPlayers == "One Player" ? "red" : "blue";
	document.querySelector(".rules").innerText = rules;
	document.querySelector(".game").innerText = game;
	for (var i = 0; i < cells.length; i++) {
		cells[i].innerText = '';
		cells[i].style.removeProperty('background-color');
		cells[i].addEventListener('click', turnClick, false);
	}




	function turnClick(square) {
		if (nuPlayers === "One Player") {
			if (i === 1) {
				wPlayer = aiPlayer;
				i = 2;
			} else {
				wPlayer = huPlayer;
				i = 1;
			}
		} else {
			wPlayer = huPlayer;
		}
		if (typeof origBoard[square.target.id] == 'number') {
			turn(square.target.id, wPlayer);
			if (nuPlayers === "Two Player") {
				if (!checkwin(origBoard, huPlayer) && !checkTie()) turn(bestSpot(), aiPlayer);
			}
		}
	}

	function turn(squareId, player) {
		origBoard[squareId] = player;
		document.getElementById(squareId).innerText = player;
		let gameWon = checkwin(origBoard, player);
		if (gameWon) gameOver(gameWon)
	}

	function checkwin(board, player) {
		let plays = board.reduce((a, e, i) =>
			(e === player) ? a.concat(i) : a, []);
		let gameWon = null;
		for (let [index, win] of winCombos.entries()) {
			if (win.every(elem => plays.indexOf(elem) > -1)) {
				gameWon = { index: index, player: player };
				break;
			}
		}
		return gameWon
	}

	function gameOver(gameWon) {
		for (let index of winCombos[gameWon.index]) {
			document.getElementById(index).style.backgroundColor =
				gameWon.player == huPlayer ? "blue" : "red";
		}
		for (var i = 0; i < cells.length; i++) {
			cells[i].removeEventListener('click', turnClick, false);
		}
		if (nuPlayers === "One Player") {
			declareWinner(gameWon.player == huPlayer ? winner1 : winner2);
		} else {
			declareWinner(gameWon.player == huPlayer ? "You Won!" : "You Lose!");
		}
	}


	function declareWinner(who) {
		document.querySelector(".endgame").style.display = "block";
		document.querySelector(".endgameText").innerText = who;
		document.querySelector(".replay").style.borderColor = "blue";
	}

	function emptySquares() {
		return origBoard.filter(s => typeof s == "number");
	}

	function bestSpot() {
		return minimax(origBoard, aiPlayer).index;
	}

	function checkTie() {
		if (emptySquares().length == 0) {
			for (var i = 0; i < cells.length; i++) {
				cells[i].style.backgroundColor = 'green';
				cells[i].removeEventListener('click', turnClick, false);
			}
			declareWinner("Tie Game!");
			return true;
		}
		return false;
	}


	function minimax(newBoard, player) {
		var availSpots = emptySquares();
		console.log(j++);

		if (checkwin(newBoard, huPlayer)) {
			return { score: -10 };
		} else if (checkwin(newBoard, aiPlayer)) {
			return { score: 10 };
		} else if (availSpots.length === 0) {
			return { score: 0 };
		}
		var moves = [];
		for (var i = 0; i < availSpots.length; i++) {
			var move = {};
			move.index = newBoard[availSpots[i]];
			newBoard[availSpots[i]] = player;

			if (player == aiPlayer) {
				var result = minimax(newBoard, huPlayer);
				move.score = result.score;
			} else {
				var result = minimax(newBoard, aiPlayer);
				move.score = result.score;
			}

			newBoard[availSpots[i]] = move.index;

			moves.push(move);
		}

		var bestMove;
		if (player === aiPlayer) {
			var bestScore = -10000;
			for (var i = 0; i < moves.length; i++) {
				if (moves[i].score > bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		} else {
			var bestScore = 10000;
			for (var i = 0; i < moves.length; i++) {
				if (moves[i].score < bestScore) {
					bestScore = moves[i].score;
					bestMove = i;
				}
			}
		}

		return moves[bestMove];
	}
}