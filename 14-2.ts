import { readLines } from "./deps.ts";

async function main() {
  let mask: string[] = [];

  let dict: { [pos: string]: number } = {};

  for await (const line of readLines(Deno.stdin)) {
    let splitLine = line.split(" = ");
    if (splitLine[0] === "mask") {
      mask = splitLine[1].split("");
    } else {
      let posO = splitLine[0].match(/\d+/);
      if (posO) {
        let posArray: number[] = maskVal(Number(posO), mask);
        for (const pos of posArray) {
          dict[pos.toString()] = Number(splitLine[1]);
        }
      }
    }
  }

  return Object.values(dict).reduce((a, b) => a + b);
}

const maskVal = (num: number, mask: string[]): number[] => {
  let bitString: string[] = (num >>> 0).toString(2).split("");
  let maskCopy: string[] = [...mask];
  for (let i = 1; i <= bitString.length; i++) {
    if (maskCopy[maskCopy.length - i] === "0") {
      maskCopy[maskCopy.length - i] = bitString.slice(0 - i)[0];
    }
  }
  let xCount: number = maskCopy.filter((b) => b === "X").length;
  let posArray: number[] = [];
  for (let xFloat = 0; xFloat < 2 ** xCount; xFloat++) {
    let maskCopyCopy: string[] = [...maskCopy];
    let xFloatArray: string[] = (xFloat >>> 0)
      .toString(2)
      .split("")
      .reverse();

    let xi: number = 0;
    for (let i = 1; xi < xFloatArray.length; i++) {
      if (maskCopyCopy[maskCopyCopy.length - i] === "X") {
        maskCopyCopy[maskCopyCopy.length - i] = xFloatArray[xi];
        xi++;
      }
    }
    posArray.push(
      parseInt(
        maskCopyCopy.reduce((a, b) => a.concat(b)).replace(/X/g, "0"),
        2
      )
    );
  }
  return posArray;
};

const output = await main();
console.log(output);
