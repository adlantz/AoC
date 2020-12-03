import { readLines } from "./deps.ts";

async function main() {
  const inputs = [];
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(line);
  }

  const outputs: number[] = [];
  for (let i = 1; i < 9; i += 2) {
    outputs.push(numTrees(inputs, i, 1));
  }
  outputs.push(numTrees(inputs, 1, 2));

  return outputs.reduce((a, b) => a * b);
}

const numTrees = (
  inputs: string[],
  xslope: number,
  yslope: number
): number => {
  let x: number = 0;
  let treecount: number = 0;
  const cycle: number = inputs[0].length;
  for (let y = 0; y < inputs.length; y += yslope) {
    if (inputs[y].charAt(x) === "#") {
      treecount++;
    }
    x = (x + xslope) % cycle;
  }

  return treecount;
};

const output = await main();

console.log(output);
