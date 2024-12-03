const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day03/input.txt"),
  crlfDelay: Infinity,
});

let total = 0;

rl.on("line", async (line) => {
  const regex = /mul\(\d+,\d+\)/g;
  const matches = line.match(regex);
  for (let i = 0; i < matches.length; i++) {
    const nums = matches[i].match(/\((\d+),(\d+)\)/);

    total += nums[1] * nums[2];
  }
});

rl.on("close", async () => {
  console.log(total);
});
