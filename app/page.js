"use client";
import { useState, useEffect } from "react";
import { solveSudoku, generateSudokuBoard } from "../lib/sudoku";

export default function Home() {
  const [board, setBoard] = useState([]);
  const [difficulty, setDifficulty] = useState("medium");
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setBoard(generateSudokuBoard(difficulty));
  }, [difficulty]);

  const handleSolve = () => {
    const newBoard = board.map((row) => [...row]);
    solveSudoku(newBoard);
    setBoard(newBoard);
    setSolved(true);
  };

  const handleReset = () => {
    setBoard(generateSudokuBoard(difficulty));
    setSolved(false);
  };

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
    setSolved(false);
  };

  if (board.length === 0) {
    return <div className="text-center text-lg font-bold mt-8">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Sudoku Solver</h1>
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
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`w-10 h-10 flex items-center justify-center border border-black text-lg font-bold ${
                  cell !== "." ? "bg-green-100" : "bg-white"
                }`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={handleSolve}
          disabled={solved}
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Solve Sudoku
        </button>
        <button
          onClick={handleReset}
          className="ml-4 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          Generate New Board
        </button>
      </div>
    </div>
  );
}
