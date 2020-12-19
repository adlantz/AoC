import { readLines } from "./deps.ts";

async function main() {
  let input: string[] = [];
  for await (const line of readLines(Deno.stdin)) {
    input.push(reformatExp(line.replace(/\s+/g, "")));
  }

  let sum: number = 0;

  for (let exp of input) {
    sum += eval(exp);
  }

  return sum;
}

const reformatExp = (exp: string): string => {
  let opened: boolean = false;
  for (let i = 0; i < exp.length; i++) {
    if (!opened) {
      if (exp[i] === "+" || exp[i] === "-") {
        if (exp[i - 1] === ")") {
          let expReverse: string = exp
            .slice(0, i - 1)
            .split("")
            .reverse()
            .join("");
          for (let i = 0; i < expReverse.length; i++) {
            if (expReverse[i] === "(") {
              expReverse =
                expReverse.slice(0, i) + ")" + expReverse.slice(i + 1);
            } else if (expReverse[i] === ")") {
              expReverse =
                expReverse.slice(0, i) + "(" + expReverse.slice(i + 1);
            }
          }

          let insert = findCloser(expReverse);

          exp =
            exp.slice(0, i - 1 - insert) + "(" + exp.slice(i - 1 - insert);
          i++;
          let j = i + 1;
          while (j < exp.length) {
            if (exp[j] === "*" || exp[j] === ")") {
              exp = exp.slice(0, j) + ")" + exp.slice(j);
              i++;
              break;
            } else if (exp[j] === "(") {
              let insert = findCloser(exp.slice(j + 1));
              exp =
                exp.slice(0, j + 1 + insert) +
                ")" +
                exp.slice(j + 1 + insert);
              i++;
              break;
            }
            j++;
          }
          if (j === exp.length) {
            exp += ")";
          }
        } else if (exp[i + 1] === "(") {
          exp = exp.slice(0, i - 1) + "(" + exp.slice(i - 1);
          i++;
          let insert = findCloser(exp.slice(i + 3));
          exp =
            exp.slice(0, i + 3 + insert) + ")" + exp.slice(i + 3 + insert);
          i++;
        } else {
          exp = exp.slice(0, i - 1) + "(" + exp.slice(i - 1);
          i++;
          let j = i + 1;
          while (j < exp.length) {
            if (exp[j] === "*" || exp[j] === ")") {
              exp = exp.slice(0, j) + ")" + exp.slice(j);
              i++;
              break;
            } else if (exp[j] === "(") {
              let insert = findCloser(exp.slice(j + 1));
              exp =
                exp.slice(0, j + 1 + insert) +
                ")" +
                exp.slice(j + 1 + insert);
              i++;
              break;
            }
            j++;
          }
          if (j === exp.length) {
            exp += ")";
          }
        }
      }
    }
  }

  return exp;
};

const findCloser = (exp: string): number => {
  // console.log(exp);
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
