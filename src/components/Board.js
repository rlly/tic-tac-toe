import React, { useEffect, useState } from "react";
import { Square } from "./Square";

export function Board() {
	let isGameOver = false;
	let gameStatus;
	let playerStatus;
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const [startGame, setStartGame] = useState(false);
	const [vsComputer, setVsComputer] = useState(false);
	const [squares, setSquares] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [movesRemainig, setMovesRemaining] = useState(9);
	const winner = calculateWinner(squares);
	if (winner) {
		playerStatus = winner;
	} else {
		playerStatus = "Next player: " + (xIsNext ? "X" : "O");
	}

	const Playing = (bool) => {
		if (bool) {
			setVsComputer(true);
			setStartGame(true);
		} else if (!bool) {
			setVsComputer(false);
			setStartGame(true);
		}
	};

	const handleClick = (i) => {
		if (isGameOver || squares[i] !== null) return;
		const squaresClone = squares.slice();
		squaresClone[i] = xIsNext ? "X" : !vsComputer && "O";
		const movesRemainingTemp = movesRemainig - 1;
		setMovesRemaining(movesRemainingTemp);
		setXIsNext(vsComputer ? false : !xIsNext);
		setSquares(squaresClone);
	};

	const playComputer = () => {
		if (!vsComputer || isGameOver || xIsNext || movesRemainig === 0) return;
		const squaresClone = squares.slice();
		const newMovesRemainig = movesRemainig - 1;
		const randSq = Math.ceil(Math.random() * 9);
		if (squares[randSq] === null) {
			squaresClone[randSq] = "O";
			setSquares(squaresClone);
			setXIsNext(true);
			setMovesRemaining(newMovesRemainig);
		} else {
			playComputer();
		}
	};
	useEffect(playComputer);

	const renderSquare = (i) => {
		return (
			<Square
				value={squares[i]}
				onClick={() => {
					handleClick(i);
				}}
			/>
		);
	};

	function calculateWinner(squares) {
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				isGameOver = true;
				gameStatus = "Game Over";
				return `Winner: ${squares[a]}`;
			}
		}

		if (movesRemainig === 0) {
			isGameOver = true;
			gameStatus = "Game Over";
			return "Cat's Game";
		}
		return null;
	}
	const restart = () => {
		setStartGame(false);
		setSquares(Array(9).fill(null));
		setMovesRemaining(9);
		setXIsNext(true);
		isGameOver = false;
		playerStatus = "Next player: X";
	};

	return (
		<div>
			{!startGame ? (
				<div className="game">
					<h1>Tic Tac Toe</h1>
					<button className="restart" onClick={() => Playing(false)}>
						Play vs Friends
					</button>
					<button className="restart" onClick={() => Playing(true)}>
						Play vs Computer
					</button>
				</div>
			) : (
				<div className="game">
					<div className="status"> {playerStatus}</div>
					<div className="board">
						{renderSquare(0)}
						{renderSquare(1)}
						{renderSquare(2)}
					</div>
					<div className="board">
						{renderSquare(3)}
						{renderSquare(4)}
						{renderSquare(5)}
					</div>
					<div className="board">
						{renderSquare(6)}
						{renderSquare(7)}
						{renderSquare(8)}
					</div>
					<div className="status"> {gameStatus}</div>
					{isGameOver && (
						<button className="restart" onClick={() => restart()}>
							Restart Game
						</button>
					)}
				</div>
			)}
		</div>
	);
}
