export const isSafe = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) {
        return false;
      }
    }
  
    const gRow = Math.floor(row / 3) * 3;
    const gCol = Math.floor(col / 3) * 3;
  
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[gRow + i][gCol + j] === num) {
          return false;
        }
      }
    }
  
    return true;
  };
  
  export const solveSudoku = (board) => {
    const helper = (board, row, col) => {
      if (row === 9) return true;
      if (col === 9) return helper(board, row + 1, 0);
  
      if (board[row][col] !== ".") {
        return helper(board, row, col + 1);
      }
  
      for (let num = "1"; num <= "9"; num++) {
        if (isSafe(board, row, col, num)) {
          board[row][col] = num;
  
          if (helper(board, row, col + 1)) {
            return true;
          }
  
          board[row][col] = ".";
        }
      }
      return false;
    };
  
    helper(board, 0, 0);
    return board;
  };
  
  // Generate a random Sudoku board with prefilled cells
  export const generateSudokuBoard = (difficulty = "medium") => {
    const emptyBoard = Array.from({ length: 9 }, () => Array(9).fill("."));
    
    const fillCounts = {
      easy: Math.floor(Math.random() * (49 - 36 + 1)) + 36,
      medium: Math.floor(Math.random() * (35 - 27 + 1)) + 27,
      hard: Math.floor(Math.random() * (26 - 17 + 1)) + 17,
    };
  
    const numCellsToFill = fillCounts[difficulty];
  
    let filled = 0;
  
    while (filled < numCellsToFill) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      const num = String(Math.floor(Math.random() * 9) + 1);
  
      if (emptyBoard[row][col] === "." && isSafe(emptyBoard, row, col, num)) {
        emptyBoard[row][col] = num;
        filled++;
      }
    }
  
    return emptyBoard;
  };
  