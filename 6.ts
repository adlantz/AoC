import { readLines } from "./deps.ts";

async function main() {
  let nQs: number = 0;

  let groupArray: string[] = [];
  let qArray: string[] = [];
  let firstLine: boolean = true;
  for await (const line of readLines(Deno.stdin)) {
    if (line === "") {
      // console.log(groupArray);
      nQs += groupArray.length;
      console.log(groupArray);
      console.log(groupArray.length);
      groupArray = [];
      firstLine = true;
    } else {
      for (const i of line) {
        qArray.push(i);
      }
      if (firstLine) {
        groupArray = qArray;
        firstLine = false;
      } else {
        groupArray = groupArray.filter((i) => qArray.includes(i)); //intersection
      }
      qArray = [];
    }
  }

  // let qSet = new Set();
  // for await (const line of readLines(Deno.stdin)) {
  //   if (line === "") {
  //     nQs += qSet.size;
  //     qSet.clear();
  //   } else {
  //     for (const c of line) {
  //       qSet.add(c);
  //     }
  //   }
  // }

  return nQs;
}

// const intersection = (groupSet: object, qSet: object): object => {
//   return;
//   return groupSet;
// };

const output = await main();

console.log(output);
