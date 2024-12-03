const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day03/input.txt"),
  crlfDelay: Infinity,
});

let total = 0;
let enabled = true;

rl.on("line", async (line) => {
  const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
  const matches = line.match(regex);
  for (let i = 0; i < matches.length; i++) {
    if (matches[i] === "do()") {
      enabled = true;
      continue;
    }
    if (matches[i] === "don't()") {
      enabled = false;
      continue;
    }
    if (enabled) {
      const nums = matches[i].match(/\((\d+),(\d+)\)/);
      total += nums[1] * nums[2];
    }
  }
});

rl.on("close", async () => {
  console.log(total);
});
