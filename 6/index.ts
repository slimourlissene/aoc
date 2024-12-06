const map: string[][] = readInput("input.txt");
let playerPosition: number[] = findPlayerPosition(map);
let playerDirection: number = 0;
const playerPositionHistory: number[][] = [[...playerPosition]];

function readInput(input: string): string[][] {
  return Deno.readTextFileSync(input).split("\n").map(line => line.split(""));
}

function movePlayer(dx: number, dy: number, symbol: string): void {
  map[playerPosition[1]][playerPosition[0]] = ".";
  playerPosition = [playerPosition[0] + dx, playerPosition[1] + dy];
  map[playerPosition[1]][playerPosition[0]] = symbol;
  if (!playerPositionHistory.some(position => position[0] === playerPosition[0] && position[1] === playerPosition[1])) {
    playerPositionHistory.push([...playerPosition]);
  }
}

function moveUp(): void {
  movePlayer(0, -1, "^");
}

function moveRight(): void {
  movePlayer(1, 0, "^");
}

function moveLeft(): void {
  movePlayer(-1, 0, "^");
}

function moveDown(): void {
  movePlayer(0, 1, "^");
}

function findExit(): void {
  const directions = [
    { dx: 0, dy: -1, move: moveUp },
    { dx: 1, dy: 0, move: moveRight },
    { dx: 0, dy: 1, move: moveDown },
    { dx: -1, dy: 0, move: moveLeft }
  ];

  while (playerPosition[0] !== 0 && playerPosition[1] !== 0 && playerPosition[0] !== map.length - 1 && playerPosition[1] !== map[0].length - 1) {
    const direction = directions[playerDirection % 360 / 90];
    const [dx, dy] = [direction.dx, direction.dy];
    if (map[playerPosition[1] + dy][playerPosition[0] + dx] !== "#") {
      direction.move();
    } else {
      playerDirection += 90;
    }
  }
}

function findPlayerPosition(map: string[][]): number[] {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "^") {
        return [x, y];
      }
    }
  }
  return [0, 0];
}

function main(): void {
  findExit();
  console.log(playerPositionHistory.length);
}

main();
