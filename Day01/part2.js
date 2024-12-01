const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day01/input.txt"),
  crlfDelay: Infinity,
});

let total = 0;

let leftNumbers = [];
let rightNumbers = [];

rl.on("line", async (line) => {
  let leftNumber = line.split("   ")[0];
  let rightNumber = line.split("   ")[1];

  leftNumbers.push(leftNumber);
  rightNumbers.push(rightNumber);
});

rl.on("close", async () => {
  leftNumbers.sort();
  rightNumbers.sort();

  for (let i = 0; i < leftNumbers.length; i++) {
    let appears = rightNumbers.filter((x) => x === leftNumbers[i]).length;
    total = total + Math.abs(parseInt(leftNumbers[i] * appears));
  }

  console.log(total);
});
