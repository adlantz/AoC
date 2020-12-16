import { readLines } from "./deps.ts";

async function main() {
  let start: string[] = [];
  for await (const line of readLines(Deno.stdin)) {
    start = line.split(",");
  }

  let dict: { [num: number]: number } = {};

  for (let i = 0; i < start.length; i++) {
    dict[parseInt(start[i])] = i;
  }

  // dict["0"] = start.length;
  console.log(dict);
  let lastSaid: number = 0;
  // console.log(lastSaid);
  let difference: number = 0;
  for (let i = start.length; i < 30000000 - 1; i++) {
    if (lastSaid in dict) {
      // console.log("old");
      difference = i - dict[lastSaid];
      dict[lastSaid] = i;
      lastSaid = difference;
    } else {
      // console.log(dict);
      // console.log(`${lastSaid} not in dict`);
      dict[lastSaid] = i;
      lastSaid = 0;
    }

    // console.log(lastSaid);
  }

  return lastSaid;
}

const output = await main();
console.log(output);
