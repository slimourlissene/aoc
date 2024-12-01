function readInput(input: string): string[] {
  return Deno.readTextFileSync(input).split("\n");
}

function splitLeftAndRight(input: string[]): number[][] {
  const left: number[] = [];
  const right: number[] = [];

  for (const line of input) {
    const splittedLine: string[] = line.split("   ");
    left.push(parseInt(splittedLine[0]));
    right.push(parseInt(splittedLine[1]));
  }

  return [left, right];
}

function sortLeftAndRight(left: number[], right: number[]): number[][] {
  return [
    left.sort((a: number, b: number) => a - b),
    right.sort((a: number, b: number) => a - b),
  ];
}

function calculateDistance(left: number[], right: number[]): number {
  let result = 0;

  for (let i = 0; i < left.length; i += 1) {
    result += Math.abs(left[i] - right[i]);
  }

  return result;
}

function main(): void {
  const input: string[] = readInput("./input.txt");
  let [left, right]: number[][] = splitLeftAndRight(input);
  [left, right] = sortLeftAndRight(left, right);
  const result = calculateDistance(left, right);
  console.log(result);
}

main();
