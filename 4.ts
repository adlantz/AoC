import { readLines } from "./deps.ts";

async function main() {
  let psprt: string[] = [];
  let validcount: number = 0;
  let pi: string = "";
  let valid: boolean;
  let valCharArray: string[];
  let property: string;
  let value: string;
  let numProps: number;

  for await (const line of readLines(Deno.stdin)) {
    if (line === "") {
      pi = psprt.reduce((a, b) => a.concat(" ".concat(b))).concat(" ");
      valid = true;
      valCharArray = [];
      numProps = 0;

      let i: number = 0;
      while (i < pi.length) {
        property = pi.slice(i, i + 4);

        if (property !== "cid:") {
          numProps++;
        }
        i += 4;
        while (pi.charAt(i) !== " ") {
          valCharArray.push(pi.charAt(i));
          i++;
        }
        value = valCharArray.reduce((a, b) => a.concat(b));
        if (!checkValid(property, value)) {
          valid = false;
          break;
        }
        valCharArray = [];
        i++;
      }

      if (numProps < 7) {
        valid = false;
      }

      if (valid) {
        validcount++;
      }

      psprt = [];
    } else {
      psprt.push(line);
    }
  }

  return validcount;
}

const checkValid = (property: string, value: string): boolean => {
  if (property === "byr:") {
    if (
      Number(value) < 1920 ||
      Number(value) > 2002 ||
      value.length !== 4 ||
      !Number(value)
    ) {
      return false;
    }
  } else if (property === "iyr:") {
    if (
      Number(value) < 2010 ||
      Number(value) > 2020 ||
      value.length !== 4 ||
      !Number(value)
    ) {
      return false;
    }
  } else if (property === "eyr:") {
    if (
      Number(value) < 2020 ||
      Number(value) > 2030 ||
      value.length !== 4 ||
      !Number(value)
    ) {
      return false;
    }
  } else if (property === "hgt:") {
    if (value.slice(3) === "cm") {
      if (
        Number(value.slice(0, 3)) < 150 ||
        Number(value.slice(0, 3)) > 193 ||
        !Number(value.slice(0, 3))
      ) {
        return false;
      }
    } else if (value.slice(3) === "in") {
      if (
        Number(value.slice(0, 3)) < 59 ||
        Number(value.slice(0, 3)) > 76 ||
        !Number(value.slice(0, 3))
      ) {
        return false;
      }
    } else {
      return false;
    }
  } else if (property === "hcl") {
    if (value.length !== 7) {
      return false;
    } else if (value[0] !== "#") {
      return false;
    }
  } else if (property === "ecl") {
    if (
      ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].indexOf(value)! > -1
    ) {
      return false;
    }
  } else if (property === "pid") {
    if (!Number(value) || value.length !== 9) {
      return false;
    }
  }
  return true;
};

const output = await main();

console.log(output);
