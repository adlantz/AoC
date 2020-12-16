import { readLines } from "./deps.ts";

async function main() {
  let start: number[] = [];
  for await (const line of readLines(Deno.stdin)) {
    start = line.split(",").map((n) => parseInt(n));
  }

  const arr = Array(30_000_000).fill(-1);
  for (let i = 0; i < start.length; i++) {
    arr[start[i]] = i;
  }

  // dict["0"] = start.length;
  let lastSaid = 0;
  let difference: number = 0;
  for (let i = start.length; i < 30_000_000 - 1; i++) {
    if (arr[lastSaid] !== -1) {
      // console.log("old");
      difference = i - arr[lastSaid];
      arr[lastSaid] = i;
      lastSaid = difference;
    } else {
      // console.log(dict);
      // console.log(`${lastSaid} not in dict`);
      arr[lastSaid] = i;
      lastSaid = 0;
    }

    // console.log(lastSaid);
  }

  return lastSaid;
}

const output = await main();
console.log(output);
