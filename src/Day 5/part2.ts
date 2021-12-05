import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day5.txt", "utf8")
	.split("\n")
	.map((value) => {
		const currParse = value.trim().split(" -> ");
		const firstCoord = currParse[0].split(",").map((value) => Number(value));
		const secondCoord = currParse[1].split(",").map((value) => Number(value));
		firstCoord.push(...secondCoord);

		return firstCoord;
	});

const grid: number[][] = new Array(1000);

for (let x = 0; x < 1000; x++) {
	grid[x] = new Array(1000).fill(0);
}

function updateGrid(start: number, end: number, secondary: number, row = false): void {
	const lesserNum = start < end ? start : end;
	const maxNum = start > end ? start : end;

	for (let x = lesserNum; x <= maxNum; x++) {
		if (row) {
			grid[secondary][x] += 1;
		} else {
			grid[x][secondary] += 1;
		}
	}
}

values.forEach((currSegment) => {
	const startCoord = currSegment.slice(0, 2);
	const endCoord = currSegment.slice(2, 4);

	if (startCoord[0] === endCoord[0]) {
		updateGrid(startCoord[1], endCoord[1], startCoord[0], true);
		return;
	}
	if (startCoord[1] === endCoord[1]) {
		updateGrid(startCoord[0], endCoord[0], startCoord[1]);
		return;
	}

	const increaseX = startCoord[0] < endCoord[0];
	const increaseY = startCoord[1] < endCoord[1];

	let currX = startCoord[0];
	let currY = startCoord[1];

	while (currX !== endCoord[0]) {
		grid[currX][currY] += 1;

		currX = increaseX === true ? currX += 1 : currX -= 1;
		currY = increaseY === true ? currY += 1 : currY -= 1;

		if (currX === endCoord[0]) {
			grid[currX][currY] += 1;
		}
	}
});

const checkCrosses = [];

grid.forEach((row) => {
	checkCrosses.push(row.filter((value) => value > 1).length);
});

console.log(checkCrosses.reduce((prev, curr) => prev + curr));
