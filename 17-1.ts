import { readLines } from "./deps.ts";

async function main() {
  let input: number[][] = [];
  for await (const line of readLines(Deno.stdin)) {
    input.push(line.split("").map((x) => (x === "." ? 0 : 1)));
  }

  let space: number[][][] = [input];
  space.unshift(zeroPlane(space[0][0].length, space[0].length));
  space.push(zeroPlane(space[0][0].length, space[0].length));
  for (let zi = 0; zi < space.length; zi++) {
    let line: number[] = new Array(space[0][0].length).fill(0);
    space[zi].unshift(line);
    let line2: number[] = new Array(space[0][0].length).fill(0);
    space[zi].push(line2);
  }

  for (let zi = 0; zi < space.length; zi++) {
    for (let yi = 0; yi < space[0].length; yi++) {
      space[zi][yi].push(0);
      space[zi][yi].unshift(0);
    }
  }

  space = updateSpace(space);

  let zMax = space.length;
  let yMax = space[0].length;
  let xMax = space[0][0].length;

  for (let cycle = 0; cycle < 6; cycle++) {
    zMax = space.length;
    yMax = space[0].length;
    xMax = space[0][0].length;
    let spaceCopy: number[][][] = [];
    for (let z = 0; z < zMax; z++) {
      let plane: number[][] = [];
      for (let y = 0; y < yMax; y++) {
        let line: number[] = [];
        for (let x = 0; x < xMax; x++) {
          line.push(space[z][y][x]);
        }
        plane.push(line);
      }
      spaceCopy.push(plane);
    }

    let numActive: number = 0;
    for (let z = 1; z < space.length - 1; z++) {
      for (let y = 1; y < space[0].length - 1; y++) {
        for (let x = 1; x < space[0][0].length - 1; x++) {
          numActive = numActiveNeighbs([z, y, x], space);
          // console.log(numActive);
          if (space[z][y][x] === 0) {
            if (numActive === 3) {
              spaceCopy[z][y][x] = 1;
            }
          } else {
            if (numActive !== 3 && numActive !== 2) {
              spaceCopy[z][y][x] = 0;
            }
          }
        }
      }
    }

    space = [];
    for (let z = 0; z < zMax; z++) {
      let plane: number[][] = [];
      for (let y = 0; y < yMax; y++) {
        let line: number[] = [];
        for (let x = 0; x < xMax; x++) {
          line.push(spaceCopy[z][y][x]);
        }
        plane.push(line);
      }
      space.push(plane);
    }

    console.log("end me pls");

    space = updateSpace(space);
  }

  console.log("++++++++++++");

  let actives: number = space
    .flat()
    .flat()
    .reduce((a, b) => a + b);
  return actives;
}

const updateSpace = (space: number[][][]): number[][][] => {
  let zMax = space.length;
  let yMax = space[0].length;
  let xMax = space[0][0].length;
  let zMin = 0;
  let yMin = 0;
  let xMin = 0;
  let spaceCopy: number[][][] = [];

  for (let z = 0; z < zMax; z++) {
    let plane: number[][] = [];
    for (let y = 0; y < yMax; y++) {
      let line: number[] = [];
      for (let x = 0; x < xMax; x++) {
        line.push(space[z][y][x]);
      }
      plane.push(line);
    }
    spaceCopy.push(plane);
  }

  for (let z = 0; z < space.length; z++) {
    for (let y = 0; y < space[0].length; y++) {
      for (let x = 0; x < space[0][0].length; x++) {
        if (space[z][y][x] === 1) {
          if (z - 1 === zMin) {
            spaceCopy.unshift(zeroPlane(xMax - xMin, yMax - yMin));
            zMin -= 1;
          }
          if (z + 2 === zMax) {
            spaceCopy.push(zeroPlane(xMax - xMin, yMax - yMin));
            zMax += 1;
          }
          // console.log("zmax" + zMax);
          if (y - 1 === yMin) {
            for (let zi = 0; zi < zMax - zMin; zi++) {
              // console.log("zi " + zi);
              let line: number[] = new Array(xMax - xMin).fill(0);
              spaceCopy[zi].unshift(line);
            }
            yMin -= 1;
          }
          if (y + 2 === yMax) {
            for (let zi = 0; zi < zMax - zMin; zi++) {
              let line: number[] = new Array(xMax - xMin).fill(0);
              spaceCopy[zi].push(line);
            }
            yMax += 1;
          }
          if (x - 1 === xMin) {
            for (let zi = 0; zi < zMax - zMin; zi++) {
              for (let yi = 0; yi < yMax - yMin; yi++) {
                spaceCopy[zi][yi].unshift(0);
              }
            }
            xMin -= 1;
          }
          if (x + 2 === xMax) {
            for (let zi = 0; zi < zMax - zMin; zi++) {
              for (let yi = 0; yi < yMax - yMin; yi++) {
                spaceCopy[zi][yi].push(0);
              }
            }
            xMax += 1;
          }
        }
      }
    }
  }

  return spaceCopy;
};

const zeroPlane = (xMax: number, yMax: number): number[][] => {
  let plane: number[][] = [];

  for (let yi = 0; yi < yMax; yi++) {
    let line: number[] = new Array(xMax).fill(0);
    plane.push(line);
  }
  return plane;
};

const numActiveNeighbs = (zyx: number[], space: number[][][]): number => {
  let z: number = zyx[0];
  let y: number = zyx[1];
  let x: number = zyx[2];
  let numActive: number = 0;
  for (let zi = z - 1; zi <= z + 1; zi++) {
    for (let yi = y - 1; yi <= y + 1; yi++) {
      for (let xi = x - 1; xi <= x + 1; xi++) {
        if (zi === z && yi === y && xi === x) {
          continue;
        }
        if (space[zi][yi][xi] === 1) {
          numActive++;
        }
      }
    }
  }
  return numActive;
};

const output = await main();
console.log(output);
