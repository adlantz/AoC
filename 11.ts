import { readLines } from "./deps.ts";

async function main() {
  let inputs: number[][] = [];
  for await (const line of readLines(Deno.stdin)) {
    inputs.push(lineToNumArray(line));
  }

  let change: boolean = true;
  let inputsDuplicate: number[][] = [];

  // Part 1
  // let numOccupied: number = 0;
  // let num = 0;
  // while (change) {
  //   num++;
  //   numOccupied = 0;
  //   change = false;

  //   inputsDuplicate = [];
  //   for (const input of inputs) {
  //     inputsDuplicate.push(input.slice(0));
  //   }

  //   // console.log(inputs);
  //   // console.log("--------------");
  //   // inputsDuplicate[0][0] = 0;
  //   // console.log(inputs);
  //   // console.log(inputs.length);

  //   for (let row = 0; row < inputs.length; row++) {
  //     for (let column = 0; column < inputs[0].length; column++) {
  //       if (inputs[row][column] === 1) {
  //         let freeSeat: boolean = true;
  //         for (let i = -1; i <= 1 && freeSeat; i++) {
  //           for (let j = -1; j <= 1 && freeSeat; j++) {
  //             if (i === 0 && j === 0) {
  //               continue;
  //             } else if (
  //               inputs[row + i] &&
  //               inputs[row + i][column + j] &&
  //               inputs[row + i][column + j] === 2
  //             ) {
  //               freeSeat = false;
  //             }
  //           }
  //         }
  //         if (freeSeat) {
  //           inputsDuplicate[row][column] = 2;
  //           change = true;
  //         }
  //       } else if (inputs[row][column] === 2) {
  //         numOccupied++;
  //         let fullSeat: boolean = false;
  //         let fullCount: number = 0;
  //         for (let i = -1; i <= 1 && !fullSeat; i++) {
  //           for (let j = -1; j <= 1 && !fullSeat; j++) {
  //             if (i === 0 && j === 0) {
  //               continue;
  //             } else if (
  //               inputs[row + i] &&
  //               inputs[row + i][column + j] &&
  //               inputs[row + i][column + j] === 2
  //             ) {
  //               fullCount++;
  //               if (fullCount >= 4) {
  //                 fullSeat = true;
  //               }
  //             }
  //           }
  //         }
  //         if (fullSeat) {
  //           inputsDuplicate[row][column] = 1;
  //           change = true;
  //         }
  //       }
  //     }
  //   }

  //   inputs = [];
  //   for (const input of inputsDuplicate) {
  //     inputs.push(input.slice(0));
  //   }

  //   // console.log("--------------");
  //   // for (let i of inputsDuplicate) {
  //   //   console.log(JSON.stringify(i));
  //   // }
  //   // console.log("--------------");
  // }

  // return numOccupied;

  // Part 2
  let numOccupied: number = 0;
  let num = 0;
  while (change) {
    num++;
    numOccupied = 0;
    change = false;

    inputsDuplicate = [];
    for (const input of inputs) {
      inputsDuplicate.push(input.slice(0));
    }

    for (let row = 0; row < inputs.length; row++) {
      for (let column = 0; column < inputs[0].length; column++) {
        if (inputs[row][column] === 2) {
          let freeSeat: boolean = true;
          for (let i = -1; i <= 1 && freeSeat; i++) {
            for (let j = -1; j <= 1 && freeSeat; j++) {
              if (i === 0 && j === 0) {
                continue;
              } else if (inputs[row + i] && inputs[row + i][column + j]) {
                let ii: number = i;
                let jj: number = j;
                while (
                  inputs[row + ii + i] &&
                  inputs[row + ii + i][column + jj + j] &&
                  inputs[row + ii][column + jj] === 1
                ) {
                  ii += i;
                  jj += j;
                }
                if (inputs[row + ii][column + jj] === 3) {
                  freeSeat = false;
                }
              }
            }
          }
          if (freeSeat) {
            inputsDuplicate[row][column] = 3;
            change = true;
          }
        } else if (inputs[row][column] === 3) {
          numOccupied++;
          let fullSeat: boolean = false;
          let fullCount: number = 0;
          for (let i = -1; i <= 1 && !fullSeat; i++) {
            for (let j = -1; j <= 1 && !fullSeat; j++) {
              if (i === 0 && j === 0) {
                continue;
              } else if (inputs[row + i] && inputs[row + i][column + j]) {
                let ii: number = i;
                let jj: number = j;
                while (
                  inputs[row + ii + i] &&
                  inputs[row + ii + i][column + jj + j] &&
                  inputs[row + ii][column + jj] === 1
                ) {
                  ii += i;
                  jj += j;
                }
                if (inputs[row + ii][column + jj] === 3) {
                  fullCount++;
                  if (fullCount >= 5) {
                    fullSeat = true;
                  }
                }
              }
            }
          }
          if (fullSeat) {
            inputsDuplicate[row][column] = 2;
            change = true;
          }
        }
      }
    }

    inputs = [];
    for (const input of inputsDuplicate) {
      inputs.push(input.slice(0));
    }
  }

  return numOccupied;
}

const lineToNumArray = (line: string): number[] => {
  let numArray: number[] = [];
  for (let s of line) {
    if (s === "L") {
      numArray.push(2);
    } else if (s === ".") {
      numArray.push(1);
    }
  }
  return numArray;
};

const output = await main();
console.log(output);
