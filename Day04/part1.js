const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day04/input.txt"),
  crlfDelay: Infinity,
});

const grid = [];

rl.on("line", async (line) => {
  grid.push(line.split(""));
});

rl.on("close", async () => {
  console.log(findXMAS(grid));
});

function findXMAS(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const target = "XMAS";
  const directions = [
    [0, 1], // desno
    [0, -1], // levo
    [1, 0], // dol
    [-1, 0], // gor
    [1, 1], // diagonala dol-desno
    [1, -1], // diagonala dol-levo
    [-1, 1], // diagonala gor-desno
    [-1, -1], // diagonala gor-levo
  ];

  let count = 0;

  function isWordAt(row, col, dirX, dirY) {
    for (let i = 0; i < target.length; i++) {
      const newRow = row + i * dirX;
      const newCol = col + i * dirY;
      if (
        newRow < 0 ||
        newRow >= rows ||
        newCol < 0 ||
        newCol >= cols ||
        grid[newRow][newCol] !== target[i]
      ) {
        return false;
      }
    }
    return true;
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      for (const [dirX, dirY] of directions) {
        if (isWordAt(row, col, dirX, dirY)) {
          count++;
        }
      }
    }
  }

  return count;
}
