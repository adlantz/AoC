import { readLines } from "./deps.ts";

async function main() {
  let input: string[] = [];
  for await (const line of readLines(Deno.stdin)) {
    input.push(line.replace(/\s+/g, ""));
  }

  let sum: number = 0;

  for (let exp of input) {
    sum += evaluateExpression(exp);
  }

  return sum;
}

const evaluateExpression = (exp: string): number => {
  if (exp[0] === "(") {
    return evaluateExpression(exp.slice(1));
  }

  let tally: number = parseInt(exp[0]);

  for (let i = 1; i < exp.length; i += 2) {
    if (exp[i] === ")") {
      i--;
    } else if (exp[i] === "+") {
      if (exp[i + 1] === "(") {
        let closer: number = findCloser(exp.substring(i + 2));
        tally += evaluateExpression(exp.substring(i + 2, i + 2 + closer));
        i += closer + 1;
      } else {
        tally += parseInt(exp[i + 1]);
      }
    } else if (exp[i] === "-") {
      if (exp[i + 1] === "(") {
        let closer: number = findCloser(exp.substring(i + 2));
        tally -= evaluateExpression(exp.substring(i + 2, i + 2 + closer));
        i += closer + 1;
      } else {
        tally -= parseInt(exp[i + 1]);
      }
    } else {
      if (exp[i + 1] === "(") {
        let closer: number = findCloser(exp.substring(i + 2));
        tally *= evaluateExpression(exp.substring(i + 2, i + 2 + closer));
        i += closer + 1;
      } else {
        tally *= parseInt(exp[i + 1]);
      }
    }
  }

  return tally;
};

const findCloser = (exp: string): number => {
  let counter = 1;
  for (let i = 0; i < exp.length; i++) {
    if (exp[i] === ")") {
      counter -= 1;
    } else if (exp[i] === "(") {
      counter += 1;
    }
    if (counter === 0) {
      return i;
    }
  }

  return 0;
};

const output = await main();
console.log(output);
