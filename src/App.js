import { useState } from "react";
import './App.css';
import Board from './components/Board/Board';
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setXIsPlaying] = useState(true);
  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);
  const [tie,setTie] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const handleBoxClick = (boxId) => {
    const updatedBoard = board.map((value, id) => {
      if (id === boxId) {
        return xIsPlaying === true ? "X" : "O";
      } else {
        return value;
      }

    });
    console.log("updates", updatedBoard[0]);
    setBoard(updatedBoard);
    setXIsPlaying(!xIsPlaying);
    const winner = checkWinner(updatedBoard);
    if (winner) {
      if (winner === "X") {
        setXScore(xScore + 1);
        setGameOver(true);
      } else {
        setOScore(oScore + 1);
        setGameOver(true);
      }
    }
    let filled = true;
    updatedBoard.map((item) => {
      if(item === null){
        filled = false;
      }
    });
    if(filled && winner !== "X" && winner !=='O'){
      filled = true;
      setTie(tie + 1);
    }
  }
  const checkWinner = (updatedBoard) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];
      if (
        updatedBoard[x] &&
        updatedBoard[x] === updatedBoard[y] &&
        updatedBoard[y] === updatedBoard[z]


      ) {
        console.log("winner");
        return updatedBoard[x]
      }
    }
  }
  const reset = () => {
    setGameOver(false)
    setBoard(Array(9).fill(null));
  }
  const restartGame = () => {
    setGameOver(false);
    setXScore(0);
    setOScore(0);
    setTie(0);
    setBoard(Array(9).fill(null));
  };


  return (
    <div className="App">
      <ScoreBoard xScore={xScore} oScore={oScore} tie={tie} playing = {xIsPlaying}/>
      <Board board={board} onClick={gameOver === true ? reset : handleBoxClick} />
      <button className="btn" onClick={restartGame}>Restart Game</button>
      <button className="btn" onClick={reset}>Restart Game</button>
    </div>
  );
}

export default App;
