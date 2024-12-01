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

function createNumberMap(left: number[]): Map<number, number> {
  const map: Map<number, number> = new Map();
  left.map((number: number) => map.set(number, 0));
  return map;
}

function countOccurrences(
  map: Map<number, number>,
  right: number[]
): Map<number, number> {
  const result: Map<number, number> = map;

  for (const number of right) {
    const entry: number | undefined = result.get(number);
    if (entry !== undefined) {
      result.set(number, entry + 1);
    }
  }

  return result;
}

function calculateSimilary(map: Map<number, number>): number {
  let result: number = 0;

  for (const [key, value] of map) {
    result += key * value;
  }

  return result;
}

function main(): void {
  const input = readInput("input.txt");
  const [left, right]: number[][] = splitLeftAndRight(input);
  const map = createNumberMap(left);
  const occurences = countOccurrences(map, right);
  const similarity = calculateSimilary(occurences);
  console.log(similarity);
}

main();
