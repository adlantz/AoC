import { readLines } from "./deps.ts";

async function main() {
  let inputs: number[] = [];
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(Number(line));
  }

  //Part 1
  const inValid: number = findInvalid(inputs);

  //Part 2
  for (let i = 0; i < inputs.length; i++) {
    for (let j = i + 2; j < inputs.length; j++) {
      let subArray = inputs.slice(i, j);
      if (subArray.reduce((a, b) => a + b) === inValid) {
        return Math.min(...subArray) + Math.max(...subArray);
      }
    }
  }

  return inValid;
}

const findInvalid = (inputs: number[]): number => {
  for (let i = 25; i < inputs.length; i++) {
    if (!isValid(inputs.slice(i - 25, i), inputs[i])) {
      return inputs[i];
    }
  }
  return NaN;
};

const isValid = (prev25: number[], num: number): boolean => {
  for (let j = 0; j < prev25.length; j++) {
    for (let k = j + 1; k < prev25.length; k++) {
      if (prev25[j] + prev25[k] === num) {
        return true;
      }
    }
  }
  return false;
};

const output = await main();
console.log(output);
