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
  console.log(findXMASXPattern(grid));
});

function findXMASXPattern(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  function isXMASAt(row, col) {
    if (row - 1 < 0 || row + 1 >= rows || col - 1 < 0 || col + 1 >= cols) {
      return false;
    }

    const diagonal1 = [
      grid[row - 1][col - 1],
      grid[row][col],
      grid[row + 1][col + 1],
    ];
    const diagonal2 = [
      grid[row - 1][col + 1],
      grid[row][col],
      grid[row + 1][col - 1],
    ];

    const target1 = "MAS";
    const target2 = "SAM";

    return (
      (diagonal1.join("") === target1 || diagonal1.join("") === target2) &&
      (diagonal2.join("") === target1 || diagonal2.join("") === target2)
    );
  }

  for (let row = 1; row < rows - 1; row++) {
    for (let col = 1; col < cols - 1; col++) {
      if (isXMASAt(row, col)) {
        count++;
      }
    }
  }

  return count;
}
