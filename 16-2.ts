import { readLines } from "./deps.ts";

async function main() {
  let input: string[] = [];
  for await (const line of readLines(Deno.stdin)) {
    input.push(line);
  }

  let rules: number[][] = [];
  let i = 0;
  while (input[i] !== "") {
    let regex = input[i].match(/\d+/g);
    if (regex) {
      rules.push(
        regex
          .toString()
          .split(",")
          .map((x) => +x)
      );
    }
    i++;
  }

  let yourTicket: number[] = input[i + 2].split(",").map((x) => +x);

  let otherTix: number[][] = input
    .slice(i + 5)
    .map((a) => a.split(",").map((x) => +x));

  // let errorSum: number = 0;
  let tPMatrix: number[][][] = [];

  for (const tick of otherTix) {
    let testsPassedArray: number[][] = [];
    for (const val of tick) {
      let testsPassed = runTests(rules, val);
      if (testsPassed) {
        testsPassedArray.push(testsPassed);
      } else {
        testsPassedArray = [];
        break;
      }
    }
    if (testsPassedArray.length > 0) {
      tPMatrix.push(testsPassedArray);
    }
  }

  // console.log(tPMatrix);

  let setArray = [];
  for (let column = 0; column < tPMatrix[0].length; column++) {
    let valSet = new Set();
    for (let row = 0; row < tPMatrix.length; row++) {
      let cValSet = new Set();
      for (let val of tPMatrix[row][column]) {
        cValSet.add(val);
      }
      if (row === 0) {
        valSet = cValSet;
      } else {
        valSet = new Set([...valSet].filter((x) => cValSet.has(x)));
      }
    }

    setArray.push(valSet);
  }

  let ruleDict: { [num: number]: number } = {};
  let usedRules: number[] = [];
  let val: number = 0;
  while (Object.keys(ruleDict).length !== rules.length) {
    let set = setArray[val];

    if (set.size === 0) {
      val = (val + 1) % rules.length;
      continue;
    }

    for (let ur of usedRules) {
      set.delete(ur);
    }

    if (set.size === 1) {
      let rule: number = set.values().next().value;
      ruleDict[rule] = val;
      usedRules.push(rule);
    }

    val = (val + 1) % rules.length;
  }

  let depValues: number = 1;

  for (let j = 0; j < 6; j++) {
    depValues *= yourTicket[ruleDict[j]];
  }

  return depValues;
}

const runTests = (rules: number[][], val: number): number[] | null => {
  let passed = false;
  let testsPassed: number[] = [];
  for (let j = 0; j < rules.length; j++) {
    for (let i = 0; i < rules[j].length; i += 2) {
      if (val >= rules[j][i] && val <= rules[j][i + 1]) {
        passed = true;
        testsPassed.push(j);
      }
    }
  }
  return passed ? testsPassed : null;
};

const output = await main();
console.log(output);
