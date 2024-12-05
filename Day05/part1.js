const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: fs.createReadStream("Day05/input.txt"),
  crlfDelay: Infinity,
});

let rules = [];
let readingRules = true;
let totalMiddleSum = 0;

rl.on("line", (line) => {
  if (readingRules) {
    if (line === "") {
      readingRules = false;
      return;
    }
    rules.push(line.split("|").map(Number));
  } else {
    let pages = line.split(",").map(Number);
    if (isValidOrder(pages, rules)) {
      const middlePage = pages[Math.floor(pages.length / 2)];
      totalMiddleSum += middlePage;
    }
  }
});

rl.on("close", () => {
  console.log(totalMiddleSum);
});

function isValidOrder(pages, rules) {
  for (let [x, y] of rules) {
    const indexX = pages.indexOf(x);
    const indexY = pages.indexOf(y);

    if (indexX !== -1 && indexY !== -1 && indexX > indexY) {
      return false;
    }
  }
  return true;
}
