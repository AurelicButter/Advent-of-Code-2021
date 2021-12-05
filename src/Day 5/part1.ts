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

const targetSegments = values.filter((values) => values[0] === values[2] || values[1] === values[3]);

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

targetSegments.forEach((currSegment) => {
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
});

const checkCrosses = [];

grid.forEach((row) => {
	checkCrosses.push(row.filter((value) => value > 1).length);
});

console.log(checkCrosses.reduce((prev, curr) => prev + curr));
