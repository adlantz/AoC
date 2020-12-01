import { readLines } from "./deps.ts";

async function main() {
  const numbers = [];
  for await (const line of readLines(Deno.stdin)) {
    numbers.push(parseInt(line));
  }

  // const output = findTwoSome(2020, numbers);
  const output = findThreeSome(2020, numbers);
  console.log(output.reduce((a,b) => a+b));

  return output.reduce((a,b) => a*b);


}


const findTwoSome = (target: number, numbers: number[]): number[] => {
  for (let j = 0; j<numbers.length-1; j++){
    for (let i=j+1; i< numbers.length; i++){
      if(numbers[i]+ numbers[j] === target){
        return [numbers[i],numbers[j]]
      }
    }
  }
  return []
}

const findThreeSome = (target: number, numbers: number[]): number[] => {
  for (let k=0; k<numbers.length-1; k++){
    for (let j = k+1; j<numbers.length; j++){
      for (let i=0; i< numbers.length; i++){
        if(i!==j && i!==k){
          if(numbers[i]+ numbers[j] + numbers[k] === target){
            return [numbers[i],numbers[j],numbers[k]]
          }
        }
      }
    }
  }

  return []
}

const output = await main();

console.log(output);


