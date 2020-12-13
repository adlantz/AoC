import { readLines } from "./deps.ts";

async function main() {
  let inputs: string[] = [];
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(line);
  }

  let dTime: number = Number(inputs[0]);
  let numArray: number[] = listToNumArray(inputs[1].split(","));

  let earlyD: number = dTime - 1;
  let busID: number = 0;
  let found = false;
  while (!found) {
    earlyD++;
    for (let n of numArray) {
      if (earlyD % n === 0) {
        found = true;
        busID = n;
        break;
      }
    }
  }

  console.log(earlyD);
  console.log(busID);

  return (earlyD - dTime) * busID;
}

const listToNumArray = (numList: string[]): number[] => {
  let numArray: number[] = [];
  for (const c of numList) {
    if (c !== "x") {
      numArray.push(Number(c));
    }
  }
  return numArray;
};

const output = await main();
console.log(output);
