import { readLines } from "./deps.ts";

async function main() {
  const inputs = [];
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(line);
  }

  const output = countValid(inputs);

  return output;
}

const countValid = (inputs: string[]): number => {
  let numValid: number = 0;
  for (const input of inputs) {
    let dashi: number = input.indexOf("-");
    let coloni: number = input.indexOf(":");
    let rmin: number = parseInt(input.slice(0, dashi));
    let rmax: number = parseInt(input.slice(dashi + 1, coloni - 2));
    let ltr: string = input.slice(coloni - 1, coloni);
    let pwd: string = input.slice(coloni + 2);

    if (checkValidNew(rmin, rmax, ltr, pwd) === true) {
      numValid++;
    }
  }

  return numValid;
};

const checkValid = (
  rmin: number,
  rmax: number,
  ltr: string,
  pwd: string
): boolean => {
  let numltr = (pwd.match(RegExp(ltr, "g")) || []).length;
  return numltr >= rmin && numltr <= rmax;
};

const checkValidNew = (
  rmin: number,
  rmax: number,
  ltr: string,
  pwd: string
): boolean => {
  let s1: boolean = pwd[rmin - 1] === ltr;
  let s2: boolean = pwd[rmax - 1] === ltr;
  return s1 ? !s2 : s2;
};

const output = await main();

console.log(output);
