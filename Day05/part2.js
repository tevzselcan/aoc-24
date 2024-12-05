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
    if (!isValidOrder(pages, rules)) {
      let fixedPages = fixInvalidOrder(pages, rules);
      const middlePage = fixedPages[Math.floor(fixedPages.length / 2)];
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

function fixInvalidOrder(pages, rules) {
  const pageSet = new Set(pages);
  const graph = {};
  const inDegree = {};

  for (let page of pages) {
    graph[page] = [];
    inDegree[page] = 0;
  }

  for (let [x, y] of rules) {
    if (pageSet.has(x) && pageSet.has(y)) {
      graph[x].push(y);
      inDegree[y]++;
    }
  }

  const sortedPages = [];
  const queue = pages.filter((page) => inDegree[page] === 0);

  while (queue.length > 0) {
    const page = queue.shift();
    sortedPages.push(page);

    for (let neighbor of graph[page]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return sortedPages;
}
