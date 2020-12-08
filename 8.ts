import { readLines } from "./deps.ts";

class Operation {
  op: string;
  amt: number;
  run: boolean;

  constructor(op: string, amt: number) {
    this.op = op;
    this.amt = amt;
    this.run = false;
  }
}

async function main() {
  let operations: Operation[] = [];
  for await (const line of readLines(Deno.stdin)) {
    let op = line.split(" ")[0];
    let amt = Number(line.split(" ")[1]);

    operations.push(new Operation(op, amt));
  }

  let fixed: boolean = false;
  let opNumToFix: number = 0;
  let accumulator: number = 0;
  while (!fixed) {
    accumulator = 0;
    let opNum: number = 0;

    operations.forEach((operation) => (operation.run = false));
    for (let i = 0; i < operations.length; i++) {
      if (operations[i].run) {
        break;
      }

      operations[i].run = true;

      if (opNum === opNumToFix) {
        if (operations[i].op === "acc") {
          break;
        } else if (operations[i].op === "nop") {
          i += operations[i].amt - 1;
        }
      } else {
        if (operations[i].op === "acc") {
          accumulator += operations[i].amt;
        } else if (operations[i].op === "jmp") {
          i += operations[i].amt - 1;

          if (i + 1 === operations.length) {
            fixed = true;
            break;
          }
        }
      }

      if (i + 1 === operations.length) {
        fixed = true;
        break;
      }
      opNum++;
    }
    opNumToFix++;
  }

  return accumulator;
}

const output = await main();
console.log(output);
