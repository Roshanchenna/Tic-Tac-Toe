import React, { useState } from 'react';
import './App.css';

const Square = ({ value, onClick }) => (
  <button className={`square ${value}`} onClick={onClick}>
    {value}
  </button>
);

const Board = ({ squares, onClick }) => (
  <div className="board">
    {squares.map((square, index) => (
      <Square key={index} value={square} onClick={() => onClick(index)} />
    ))}
  </div>
);

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      setTimeout(() => {
        resetGame();
      }, 1000); 
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setXIsNext(true);
  };

  const status = winner
    ? `${winner} wins!`
    : `Turn : ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <h1 className="title">Tic Tac Toe</h1>
      <div className="status">{status}</div>
      <Board squares={board} onClick={handleClick} />
    </div>
  );
};

function calculateWinner(squares) {
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

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
}

export default App;
