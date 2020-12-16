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

  // let yourTicket: number[] = input[i + 2].split(",").map((x) => +x);

  let otherTix: number[][] = input
    .slice(i + 5)
    .map((a) => a.split(",").map((x) => +x));

  let errorSum: number = 0;
  for (const tick of otherTix) {
    for (const val of tick) {
      if (!runTests(rules, val)) {
        errorSum += val;
      }
    }
  }

  return errorSum;
}

const runTests = (rules: number[][], val: number): boolean => {
  let passed = false;
  for (const rule of rules) {
    for (let i = 0; i < rule.length; i += 2) {
      if (val >= rule[i] && val <= rule[i + 1]) {
        passed = true;
      }
    }
  }
  return passed;
};

const output = await main();
console.log(output);
