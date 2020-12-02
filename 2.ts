import { readLines } from "./deps.ts";

async function main() {
  const inputs = [];
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(line);
  }

  const output = countvalid(inputs);

  return output;
}

const countvalid = (inputs: string[]): number => {
  let numvalid: number = 0;
  for (const input of inputs) {
    let dashi: number = input.indexOf("-");
    let coloni: number = input.indexOf(":");
    let rmin: number = parseInt(input.slice(0, dashi));
    let rmax: number = parseInt(input.slice(dashi + 1, coloni - 2));
    let ltr: string = input.slice(coloni - 1, coloni);
    let pwd: string = input.slice(coloni + 2);

    if (checkvalidnew(rmin, rmax, ltr, pwd) === true) {
      numvalid++;
    }
  }

  return numvalid;
};

const checkvalid = (
  rmin: number,
  rmax: number,
  ltr: string,
  pwd: string
): boolean => {
  let valid: boolean = false;
  let numltr = (pwd.match(RegExp(ltr, "g")) || []).length;

  if (numltr >= rmin && numltr <= rmax) {
    valid = true;
  }
  return valid;
};

const checkvalidnew = (
  rmin: number,
  rmax: number,
  ltr: string,
  pwd: string
): boolean => {
  let valid: boolean = false;
  let s1: boolean = pwd[rmin - 1] === ltr;
  let s2: boolean = pwd[rmax - 1] === ltr;
  if (s1 ? !s2 : s2) {
    valid = true;
  }
  return valid;
};

const output = await main();

console.log(output);
