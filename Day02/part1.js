const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day02/input.txt"),
  crlfDelay: Infinity,
});

let safe = 0;

rl.on("line", async (line) => {
  let split = line.split(" ");

  if (isLineSafe(split)) {
    safe++;
  }
});

rl.on("close", async () => {
  console.log(safe);
});

function isLineSafe(split) {
  let isSafe = true;
  let increasing = false;
  let decreasing = false;

  for (let i = 0; i < split.length; i++) {
    let num = parseInt(split[i]);
    if (i < split.length - 1) {
      let secondNum = parseInt(split[i + 1]);

      if (num < secondNum) {
        increasing = true;
      }
      if (num > secondNum) {
        decreasing = true;
      }
      if (Math.abs(num - secondNum) > 3 || Math.abs(num - secondNum) < 1) {
        isSafe = false;
      }
    }
  }

  if (!(increasing && decreasing) & isSafe) {
    return true;
  }
}
