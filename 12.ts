import { readLines } from "./deps.ts";

async function main() {
  let horizontal: number = 0;
  let vertical: number = 0;
  let waypointX: number = 10;
  let waypointY: number = 1;
  for await (const line of readLines(Deno.stdin)) {
    let direction: string = line.slice(0, 1);
    let mag: number = Number(line.slice(1));

    if (direction === "F") {
      vertical += waypointY * mag;
      horizontal += waypointX * mag;
    } else if (direction === "N") {
      waypointY += mag;
    } else if (direction === "S") {
      waypointY -= mag;
    } else if (direction === "E") {
      waypointX += mag;
    } else if (direction === "W") {
      waypointX -= mag;
    } else if (direction === "L") {
      if (mag === 180) {
        waypointX = -1 * waypointX;
        waypointY = -1 * waypointY;
      } else {
        direction = "R";
        if (mag === 90) {
          mag = 270;
        } else if (mag === 270) {
          mag = 90;
        }
      }
    }
    if (direction === "R") {
      if (mag === 180) {
        waypointX = -1 * waypointX;
        waypointY = -1 * waypointY;
      } else {
        let y = waypointY;
        let x = waypointX;
        if (mag === 90) {
          waypointX = y;
          waypointY = -1 * x;
        } else if (mag === 270) {
          waypointX = -1 * y;
          waypointY = x;
        }
      }
    }
  }

  return Math.abs(vertical) + Math.abs(horizontal);
}

const output = await main();
console.log(output);
