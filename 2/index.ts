function readInput(input: string): string[] {
  return Deno.readTextFileSync(input).split("\n");
}

function computeReports(input: string[]): number[][] {
  const result: number[][] = [];
  for (const line of input) {
    const splittedLine = line.split(" ").map(Number);
    result.push(splittedLine);
  }
  return result;
}

function isMonotonic(report: number[]): boolean {
  let increasing: boolean = true;
  let decreasing: boolean = true;

  for (let i = 0; i < report.length - 1; i += 1) {
    if (report[i] > report[i + 1]) {
      increasing = false;
    } else if (report[i] < report[i + 1]) {
      decreasing = false;
    }
  }

  return increasing || decreasing;
}

function checkAdjacentLevels(report: number[]): boolean {
  const safeLevelDifferences: number[] = [1, 2, 3];

  for (let i = 0; i < report.length - 1; i += 1) {
    const levelDifferences = Math.abs(report[i] - report[i + 1]);
    if (!safeLevelDifferences.includes(levelDifferences)) {
      return false;
    }
  }

  return true;
}

function countSafeReports(reports: number[][]): number {
  let result: number = 0;
  for (const report of reports) {
    if (isMonotonic(report) && checkAdjacentLevels(report)) {
      result += 1;
    }
  }
  return result;
}

function main(): void {
  const input: string[] = readInput("input.txt");
  const reports: number[][] = computeReports(input);
  const result = countSafeReports(reports);
  console.log(result);
}

main();
