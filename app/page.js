"use client";
import { useState, useEffect } from "react";
import { solveSudoku, generateSudokuBoard, isSafe } from "../lib/sudoku";
import { ToastContainer, toast } from "react-toastify";  // Import Toastify
import "react-toastify/dist/ReactToastify.css";  // Import Toastify CSS

export default function Home() {
  const [board, setBoard] = useState([]);
  const [originalBoard, setOriginalBoard] = useState([]);
  const [userInputs, setUserInputs] = useState([]);
  const [solved, setSolved] = useState(false);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [difficulty, setDifficulty] = useState("medium");

  useEffect(() => {
    const generatedBoard = generateSudokuBoard(difficulty);
    setBoard(generatedBoard);
    setOriginalBoard(generatedBoard.map((row) => [...row]));
    setUserInputs(Array.from({ length: 9 }, () => Array(9).fill(false)));
  }, [difficulty]);

  const handleInputChange = (row, col, value) => {
    if (originalBoard[row][col] !== ".") return;

    const newBoard = board.map((r) => [...r]);
    const newUserInputs = userInputs.map((r) => [...r]);

    if (value >= "1" && value <= "9" && isSafe(newBoard, row, col, value)) {
      newBoard[row][col] = value;
      newUserInputs[row][col] = true;
      setBoard(newBoard);
      setUserInputs(newUserInputs);
    } else {
      setIncorrectAttempts((prev) => prev + 1);
      toast.error("Incorrect Entry! Try again.", { position: "top-right", autoClose: 2000 });
      if (incorrectAttempts + 1 >= 3) {
        handleGameOver();
      }
    }
  };

  const handleGameOver = () => {
    const solvedBoard = board.map((row) => [...row]);
    solveSudoku(solvedBoard);
    setBoard(solvedBoard);
    setSolved(true);
    alert("Game Over! The solved Sudoku is displayed.");
  };

  const handleReset = () => {
    const newBoard = generateSudokuBoard(difficulty);
    setBoard(newBoard);
    setOriginalBoard(newBoard.map((row) => [...row]));
    setUserInputs(Array.from({ length: 9 }, () => Array(9).fill(false)));
    setSolved(false);
    setIncorrectAttempts(0);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    setSolved(false);
    setIncorrectAttempts(0);
  };

  return (
    <div className="flex flex-col items-center p-8 max-w-full">
      <h1 className="text-3xl font-bold mb-6">Interactive Sudoku</h1>
      <div className="mb-4">
        <label htmlFor="difficulty" className="mr-4 font-bold">
          Select Difficulty:
        </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="inline-block">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((cell, colIndex) => {
              const isThickTop = rowIndex % 3 === 0;
              const isThickLeft = colIndex % 3 === 0;
              const isThickRight = colIndex === 8;
              const isThickBottom = rowIndex === 8;

              return (
                <input
                  key={colIndex}
                  type="text"
                  maxLength={1}
                  value={cell === "." ? "" : cell}
                  disabled={originalBoard[rowIndex][colIndex] !== "." || solved}
                  onChange={(e) =>
                    handleInputChange(rowIndex, colIndex, e.target.value)
                  }
                  className={`w-10 h-10 flex items-center justify-center text-lg font-bold text-center border
                  ${
                    originalBoard[rowIndex][colIndex] !== "."
                      ? "bg-green-100"
                      : userInputs[rowIndex][colIndex]
                      ? "bg-blue-100"
                      : "bg-white"
                  }
                  ${
                    solved || incorrectAttempts >= 3
                      ? "pointer-events-none"
                      : "pointer-events-auto"
                  }
                  border-gray-400
                  ${isThickTop ? "border-t-4 border-black" : ""}
                  ${isThickLeft ? "border-l-4 border-black" : ""}
                  ${isThickRight ? "border-r-4 border-black" : ""}
                  ${isThickBottom ? "border-b-4 border-black" : ""}
                  `}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <p className="mb-4 text-red-500 font-bold">
          Incorrect Attempts: {incorrectAttempts}/3
        </p>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          Reset Game
        </button>
      </div>

      {/* ToastContainer for toast notifications */}
      <ToastContainer
        position="top-right" // Position the toast at the top-right
        autoClose={2000} // Auto-close after 2 seconds
        hideProgressBar={true} // Hide progress bar
        closeButton={false} // Remove close button
        pauseOnHover={false} // Don't pause on hover
        draggable={false} // Disable dragging
      />
    </div>
  );
}
