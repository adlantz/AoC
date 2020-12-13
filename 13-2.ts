import { readLines } from "./deps.ts";

interface Bus {
  id: number;
  pos: number;
}

async function main() {
  let inputs: string[] = [];
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(line);
  }
  let busArray: Bus[] = listToNumArray(inputs[1].split(","));

  let firstBus: Bus = busArray[0];
  let idArray: number[] = [firstBus.id];
  let nD: number = 1;
  let t: number = 0;

  for (const bus of busArray.slice(1)) {
    nD = 1;
    let found: boolean = false;
    while (!found) {
      if (
        (t + nD * idArray.reduce((a, b) => a * b) + bus.pos) % bus.id ===
        0
      ) {
        t += nD * idArray.reduce((a, b) => a * b);
        found = true;
        break;
      }
      nD++;
    }
    idArray.push(bus.id);
  }

  return t;
}

const listToNumArray = (numList: string[]): Bus[] => {
  let numArray: Bus[] = [];
  let pos: number = 0;
  for (const c of numList) {
    if (c !== "x") {
      numArray.push({ id: Number(c), pos: pos });
    }
    pos++;
  }
  return numArray;
};

const output = await main();
console.log(output);
