//JS

const gameBoard = document.getElementById("game-board");
const scoreElement = document.getElementById("score");

const ROWS = 4;
const COLS = 4;

let grid;
let previousGrid;
let score = 0;

function initGame() {
  grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
  previousGrid = JSON.parse(JSON.stringify(grid));
  score = 0;
  addRandomTile();
  addRandomTile();
  updateBoard();
}

function addRandomTile() {
  const emptyCells = [];
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell) emptyCells.push({ row: rowIndex, col: colIndex });
    });
  });

  if (emptyCells.length === 0) return;

  const { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[row][col] = Math.random() < 0.9 ? 2 : 4;
}

function updateBoard() {
  gameBoard.innerHTML = "";

  grid.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      gameBoard.appendChild(cell);

      if (value) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        tile.dataset.value = value;

        const prevValue = previousGrid[rowIndex][colIndex];
        const hasMoved = prevValue !== value || !prevValue;

        if (hasMoved) {
          tile.style.animation = "move 150ms ease-in-out";
        }

        tile.style.gridColumn = colIndex + 1;
        tile.style.gridRow = rowIndex + 1;
        tile.textContent = value;
        gameBoard.appendChild(tile);
      }
    });
  });

  scoreElement.textContent = score;
  previousGrid = JSON.parse(JSON.stringify(grid)); // Save the current grid state
}

function move(direction) {
  let moved = false;

  if (direction === "up" || direction === "down") {
    for (let col = 0; col < COLS; col++) {
      let values = grid.map((row) => row[col]).filter((v) => v);
      if (direction === "down") values.reverse();

      const mergedValues = mergeValues(values);
      const newColumn = Array(COLS).fill(null);

      mergedValues.forEach((value, index) => {
        const pos = direction === "down" ? ROWS - 1 - index : index;
        newColumn[pos] = value;
      });

      for (let row = 0; row < ROWS; row++) {
        if (grid[row][col] !== newColumn[row]) {
          grid[row][col] = newColumn[row];
          moved = true;
        }
      }
    }
  } else {
    for (let row = 0; row < ROWS; row++) {
      let values = grid[row].filter((v) => v);
      if (direction === "right") values.reverse();

      const mergedValues = mergeValues(values);
      const newRow = Array(COLS).fill(null);

      mergedValues.forEach((value, index) => {
        const pos = direction === "right" ? COLS - 1 - index : index;
        newRow[pos] = value;
      });

      if (grid[row].toString() !== newRow.toString()) {
        grid[row] = newRow;
        moved = true;
      }
    }
  }

  if (moved) {
    addRandomTile();
    updateBoard();

    if (isGameOver()) {
      alert("Game Over! Your Score is " + score);
      initGame();
    }
  }
}

function mergeValues(values) {
  const merged = [];
  while (values.length > 0) {
    if (values.length > 1 && values[0] === values[1]) {
      merged.push(values.shift() * 2);
      score += merged[merged.length - 1];
      values.shift();
    } else {
      merged.push(values.shift());
    }
  }
  return merged;
}

function isGameOver() {
  if (grid.some((row) => row.includes(null))) return false;

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const value = grid[row][col];
      if (
        (col < COLS - 1 && grid[row][col + 1] === value) ||
        (row < ROWS - 1 && grid[row + 1][col] === value)
      ) {
        return false;
      }
    }
  }

  return true;
}

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowUp") move("up");
  if (event.key === "ArrowDown") move("down");
  if (event.key === "ArrowLeft") move("left");
  if (event.key === "ArrowRight") move("right");
});

initGame();
