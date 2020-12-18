import { readLines } from "./deps.ts";

async function main() {
  let input: number[][] = [];
  for await (const line of readLines(Deno.stdin)) {
    input.push(line.split("").map((x) => (x === "." ? 0 : 1)));
  }

  let space: number[][][][] = [[input]];

  space.unshift(
    zeroCube(space[0][0][0].length, space[0][0].length, space[0].length)
  );
  space.push(
    zeroCube(space[0][0][0].length, space[0][0].length, space[0].length)
  );

  for (let wi = 0; wi < space.length; wi++) {
    space[wi].unshift(zeroPlane(space[wi][0][0].length, space[wi][0].length));
    space[wi].push(zeroPlane(space[wi][0][0].length, space[wi][0].length));
  }

  for (let wi = 0; wi < space.length; wi++) {
    for (let zi = 0; zi < space[0].length; zi++) {
      let line: number[] = new Array(space[0][0][0].length).fill(0);
      space[wi][zi].unshift(line);
      let line2: number[] = new Array(space[0][0][0].length).fill(0);
      space[wi][zi].push(line2);
    }
  }

  for (let wi = 0; wi < space.length; wi++) {
    for (let zi = 0; zi < space[0].length; zi++) {
      for (let yi = 0; yi < space[0][0].length; yi++) {
        space[wi][zi][yi].push(0);
        space[wi][zi][yi].unshift(0);
      }
    }
  }

  let wMax = space.length;
  let zMax = space[0].length;
  let yMax = space[0][0].length;
  let xMax = space[0][0][0].length;

  space = updateSpace(space);

  wMax = space.length;
  zMax = space[0].length;
  yMax = space[0][0].length;
  xMax = space[0][0][0].length;

  for (let cycle = 0; cycle < 6; cycle++) {
    wMax = space.length;
    zMax = space[0].length;
    yMax = space[0][0].length;
    xMax = space[0][0][0].length;
    let spaceCopy: number[][][][] = [];
    for (let w = 0; w < wMax; w++) {
      let cube: number[][][] = [];
      for (let z = 0; z < zMax; z++) {
        let plane: number[][] = [];
        for (let y = 0; y < yMax; y++) {
          let line: number[] = [];
          for (let x = 0; x < xMax; x++) {
            line.push(space[w][z][y][x]);
          }
          plane.push(line);
        }
        cube.push(plane);
      }
      spaceCopy.push(cube);
    }

    let numActive: number = 0;
    for (let w = 1; w < space.length - 1; w++) {
      for (let z = 1; z < space[0].length - 1; z++) {
        for (let y = 1; y < space[0][0].length - 1; y++) {
          for (let x = 1; x < space[0][0][0].length - 1; x++) {
            numActive = numActiveNeighbs([w, z, y, x], space);
            if (space[w][z][y][x] === 0) {
              if (numActive === 3) {
                spaceCopy[w][z][y][x] = 1;
              }
            } else {
              if (numActive !== 3 && numActive !== 2) {
                spaceCopy[w][z][y][x] = 0;
              }
            }
          }
        }
      }
    }

    space = [];
    for (let w = 0; w < wMax; w++) {
      let cube: number[][][] = [];
      for (let z = 0; z < zMax; z++) {
        let plane: number[][] = [];
        for (let y = 0; y < yMax; y++) {
          let line: number[] = [];
          for (let x = 0; x < xMax; x++) {
            line.push(spaceCopy[w][z][y][x]);
          }
          plane.push(line);
        }
        cube.push(plane);
      }
      space.push(cube);
    }

    space = updateSpace(space);
  }

  let actives: number = space
    .flat()
    .flat()
    .flat()
    .reduce((a, b) => a + b);
  return actives;
}

const updateSpace = (space: number[][][][]): number[][][][] => {
  let wMax = space.length;
  let zMax = space[0].length;
  let yMax = space[0][0].length;
  let xMax = space[0][0][0].length;
  let wMin = 0;
  let zMin = 0;
  let yMin = 0;
  let xMin = 0;

  let spaceCopy: number[][][][] = [];
  for (let w = 0; w < wMax; w++) {
    let cube: number[][][] = [];
    for (let z = 0; z < zMax; z++) {
      let plane: number[][] = [];
      for (let y = 0; y < yMax; y++) {
        let line: number[] = [];
        for (let x = 0; x < xMax; x++) {
          line.push(space[w][z][y][x]);
        }
        plane.push(line);
      }
      cube.push(plane);
    }
    spaceCopy.push(cube);
  }

  for (let w = 0; w < space.length; w++) {
    for (let z = 0; z < space[0].length; z++) {
      for (let y = 0; y < space[0][0].length; y++) {
        for (let x = 0; x < space[0][0][0].length; x++) {
          if (space[w][z][y][x] === 1) {
            if (w - 1 === wMin) {
              spaceCopy.unshift(
                zeroCube(xMax - xMin, yMax - yMin, zMax - zMin)
              );
              wMin--;
            }

            if (w + 2 === wMax) {
              spaceCopy.push(zeroCube(xMax - xMin, yMax - yMin, zMax - zMin));
              wMax++;
            }
            if (z - 1 === zMin) {
              for (let wi = 0; wi < wMax - wMin; wi++) {
                spaceCopy[wi].unshift(zeroPlane(xMax - xMin, yMax - yMin));
              }
              zMin--;
            }
            if (z + 2 === zMax) {
              for (let wi = 0; wi < wMax - wMin; wi++) {
                spaceCopy[wi].push(zeroPlane(xMax - xMin, yMax - yMin));
              }
              zMax++;
            }
            // console.log("zmax" + zMax);
            if (y - 1 === yMin) {
              for (let wi = 0; wi < wMax - wMin; wi++) {
                for (let zi = 0; zi < zMax - zMin; zi++) {
                  let line: number[] = new Array(xMax - xMin).fill(0);
                  spaceCopy[wi][zi].unshift(line);
                }
              }
              yMin--;
            }
            if (y + 2 === yMax) {
              for (let wi = 0; wi < wMax - wMin; wi++) {
                for (let zi = 0; zi < zMax - zMin; zi++) {
                  let line: number[] = new Array(xMax - xMin).fill(0);
                  spaceCopy[wi][zi].push(line);
                }
              }
              yMax++;
            }
            if (x - 1 === xMin) {
              for (let wi = 0; wi < wMax - wMin; wi++) {
                for (let zi = 0; zi < zMax - zMin; zi++) {
                  for (let yi = 0; yi < yMax - yMin; yi++) {
                    spaceCopy[wi][zi][yi].unshift(0);
                  }
                }
              }
              xMin--;
            }
            if (x + 2 === xMax) {
              for (let wi = 0; wi < wMax - wMin; wi++) {
                for (let zi = 0; zi < zMax - zMin; zi++) {
                  for (let yi = 0; yi < yMax - yMin; yi++) {
                    spaceCopy[wi][zi][yi].push(0);
                  }
                }
              }
              xMax++;
            }
          }
        }
      }
    }
  }

  return spaceCopy;
};

const zeroCube = (xMax: number, yMax: number, zMax: number): number[][][] => {
  let cube: number[][][] = [];
  for (let zi = 0; zi < zMax; zi++) {
    let plane: number[][] = [];
    for (let yi = 0; yi < yMax; yi++) {
      let line: number[] = new Array(xMax).fill(0);
      plane.push(line);
    }
    cube.push(plane);
  }
  return cube;
};

const zeroPlane = (xMax: number, yMax: number): number[][] => {
  let plane: number[][] = [];

  for (let yi = 0; yi < yMax; yi++) {
    let line: number[] = new Array(xMax).fill(0);
    plane.push(line);
  }
  return plane;
};

const numActiveNeighbs = (zyx: number[], space: number[][][][]): number => {
  let w: number = zyx[0];
  let z: number = zyx[1];
  let y: number = zyx[2];
  let x: number = zyx[3];
  let numActive: number = 0;
  for (let wi = w - 1; wi <= w + 1; wi++) {
    for (let zi = z - 1; zi <= z + 1; zi++) {
      for (let yi = y - 1; yi <= y + 1; yi++) {
        for (let xi = x - 1; xi <= x + 1; xi++) {
          if (wi === w && zi === z && yi === y && xi === x) {
            continue;
          }
          if (space[wi][zi][yi][xi] === 1) {
            numActive++;
          }
        }
      }
    }
  }
  return numActive;
};

const output = await main();
console.log(output);
