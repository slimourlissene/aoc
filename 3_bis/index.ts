function readInput(input: string): string {
  return Deno.readTextFileSync(input);
}

function filterMulExpressions(input: string): number[][] {
  const result: number[][] = [];
  let addToArray: boolean = true;
  const muls: RegExpMatchArray | null = input.match(/mul\(\d+,\s*\d+\)|do\(\)|don't\(\)/g);
  if (muls) {
    for (const mul of muls) {
      const numbersToMultiply: RegExpMatchArray | null = mul.match(/mul\((\d+),\s*(\d+)\)/);
      if (numbersToMultiply && addToArray) { 
        const x: number = Number(numbersToMultiply[1]);
        const y: number = Number(numbersToMultiply[2]);
        result.push([x, y]);
      } else if (mul === 'do()') {
        addToArray = true;
      } else if (mul === 'don\'t()') {
        addToArray = false;
      }
    }
  }
  return result;  
}

function main (): void {
  const input: string = readInput("input.txt");
  const muls: number[][] = filterMulExpressions(input);
  let result: number = 0;
  for (const mul of muls) {
    result += mul[0] * mul[1];
  }
  console.log(result)
}

main();