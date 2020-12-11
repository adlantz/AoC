import { readLines } from "./deps.ts";

interface node {
  id: string;
  numChildren: number;
}

async function main() {
  let inputs: number[] = [];
  inputs.push(0);
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(Number(line));
  }

  //Part 1
  // inputs = inputs.sort((a, b) => a - b);
  // inputs.push(inputs.slice(-1)[0] + 3);
  // console.log(inputs);

  // let prevJolt: number = 0;
  // let diff1: number = 0;
  // let diff3: number = 0;
  // for (const jolt of inputs) {
  //   if (jolt - prevJolt === 1) {
  //     diff1++;
  //   } else if (jolt - prevJolt === 3) {
  //     diff3++;
  //   }
  //   prevJolt = jolt;
  // }
  // return diff1 * diff3;

  //Part 2

  inputs = inputs.sort((a, b) => a - b);
  inputs.push(inputs.slice(-1)[0] + 3);

  let choiceArray: number[] = [];
  for (let i = 0; i < inputs.length - 1; i++) {
    let choices: number = 0;
    for (let j = i + 1; j < inputs.length || j < i + 3; j++) {
      if (inputs[j] - inputs[i] < 4) {
        choices++;
      }
    }
    choiceArray.push(choices);
  }

  let dChoices: number[] = [1];

  let choiceArrayR: number[] = choiceArray.reverse();

  for (let i = 0; i < choiceArray.length; i++) {
    if (choiceArrayR[i] === 1) {
      dChoices.push(dChoices[i]);
    } else if (choiceArrayR[i] === 2) {
      dChoices.push(dChoices[i] + dChoices[i - 1]);
    } else if (choiceArrayR[i] === 3) {
      dChoices.push(dChoices[i] + dChoices[i - 1] + dChoices[i - 2]);
    }
  }

  return dChoices.slice(-1)[0];
}

//this is recursive and super slow
const countLeaves = (choiceArray: number[]): number => {
  if (choiceArray.length === 1) {
    return 1;
  } else if (choiceArray[0] === 1) {
    return countLeaves(choiceArray.slice(1));
  } else if (choiceArray[0] === 2) {
    return (
      countLeaves(choiceArray.slice(1)) + countLeaves(choiceArray.slice(2))
    );
  } else if (choiceArray[0] === 3) {
    return (
      countLeaves(choiceArray.slice(1)) +
      countLeaves(choiceArray.slice(2)) +
      countLeaves(choiceArray.slice(3))
    );
  }
  return 0;
};

const output = await main();
console.log(output);
