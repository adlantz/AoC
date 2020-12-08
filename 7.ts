import { readLines } from "./deps.ts";

class bag {
  name: string;
  children: string[];
  counted: boolean;

  constructor(name: string, children: string[]) {
    this.name = name;
    this.children = children;
    this.counted = false;
  }

  hasChildren() {
    if (this.children.length === 0) {
      return false;
    }
    return true;
  }
}

async function main() {
  let bags = [];
  // let bagi: Object;
  let name: string;
  for await (const line of readLines(Deno.stdin)) {
    name = line.split(" contain ")[0].split(" ").slice(0, 2).join();
    let children: string[] = [];
    let childrensplit: string[] = line
      .split(" contain ")
      .slice(1)[0]
      .split(", ");

    for (const child of childrensplit) {
      let num: number = Number(child.slice(0, 1));
      if (num) {
        for (let i = 0; i < num; i++) {
          children.push(child.split(" ").slice(1, 3).join());
        }
      }
    }

    // for (let i = 0; i < children.length; i++) {
    //   let num: number = Number(children[i].slice(0, 1));

    //   children[i] = children[i].split(" ").slice(1, 3).join();
    //   if (num) {
    //     children[i] = num.toString().concat(children[i]);
    //   }
    // }

    if (children[0] === "other,bags.") {
      children = [];
    }

    bags.push(new bag(name, children));
  }

  //part 1
  // let ancestors: string[] = ["shiny,gold"];
  // let numAncestors: number = 0;
  // while (ancestors.length !== 0) {
  //   console.log(ancestors);
  //   const ancestor = ancestors.pop();
  //   for (const bag of bags) {
  //     if (
  //       ancestor !== undefined &&
  //       bag.children.includes(ancestor) &&
  //       !bag.counted
  //     ) {
  //       numAncestors++;
  //       ancestors.push(bag.name);
  //       bag.counted = true;
  //     }
  //   }
  // }
  // return numAncestors;

  //part 2
  let descendents: string[] = [
    "dim,lavender",
    "mirrored,gray",
    "mirrored,gray",
    "mirrored,gray",
    "mirrored,gray",
    "mirrored,gray",
    "light,maroon",
  ];

  let numDescendents: number = 0;

  for (const descendent of descendents) {
    for (const bag of bags) {
      if (bag.name === descendent) {
        bag.children.forEach((child) => descendents.push(child));
        numDescendents++;
        break;
      }
    }
  }

  return numDescendents;
}

const output = await main();
console.log(output);
