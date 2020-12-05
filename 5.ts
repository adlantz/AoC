import { readLines } from "./deps.ts";

async function main() {
  // let maxID: number = 0;
  let row: number;
  let column: number;
  let ID: number;
  let IDArray: number[] = [];
  for await (const line of readLines(Deno.stdin)) {
    row = inputToNum(line.slice(0, 7));
    column = inputToNum(line.slice(7));
    ID = row * 8 + column;
    IDArray.push(ID);
    // if (ID > maxID) {
    //   maxID = ID;
    // }
  }

  let sortIDArray: number[] = IDArray.sort(function (a, b) {
    return a - b;
  });

  let prev: number = sortIDArray[0];
  for (const id of sortIDArray.slice(1)) {
    if (id !== prev + 1) {
      return id - 1;
    }
    prev = id;
  }

  // return maxID;
}

const inputToNum = (input: string): number => {
  let outNum: number = 0;
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) === "B" || input.charAt(i) === "R") {
      outNum += Math.pow(2, input.length - 1 - i);
    }
  }
  return outNum;
};

const output = await main();

console.log(output);
