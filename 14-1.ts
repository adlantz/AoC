import { readLines } from "./deps.ts";

async function main() {
  let mask: string[] = [];

  let dict: { [pos: string]: number } = {};

  for await (const line of readLines(Deno.stdin)) {
    let splitLine = line.split(" = ");
    if (splitLine[0] === "mask") {
      mask = splitLine[1].split("");
    } else {
      dict[splitLine[0]] = maskVal(Number(splitLine[1]), mask);
    }
  }

  return Object.values(dict).reduce((a, b) => a + b);
}

const maskVal = (num: number, mask: string[]): number => {
  let bitString: string[] = (num >>> 0).toString(2).split("");
  let maskCopy: string[] = [...mask];
  for (let i = 1; i <= bitString.length; i++) {
    if (maskCopy[maskCopy.length - i] === "X") {
      maskCopy[maskCopy.length - i] = bitString.slice(0 - i)[0];
    }
  }
  let maskstring = maskCopy.reduce((a, b) => a.concat(b)).replace(/X/g, "0");
  return parseInt(maskstring, 2);
};

const output = await main();
console.log(output);
