import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day9.txt", "utf8")
	.split("\n")
	.map((value) =>
		value
			.trim()
			.split("")
			.map((value) => Number(value))
	);

const lowPoints = [];
for (let x = 0; x < values.length; x++) {
	for (let y = 0; y < values[x].length; y++) {
		const upIndex = [x - 1, y];
		const downIndex = [x + 1, y];
		const leftIndex = [x, y - 1];
		const rightIndex = [x, y + 1];

		const lowerUpper = upIndex.includes(-1) ? true : values[x][y] < values[upIndex[0]][upIndex[1]];
		const lowerDown = downIndex.includes(values.length) ? true : values[x][y] < values[downIndex[0]][downIndex[1]];
		const lowerLeft = leftIndex.includes(-1) ? true : values[x][y] < values[leftIndex[0]][leftIndex[1]];
		const lowerRight = rightIndex.includes(values[x].length)
			? true
			: values[x][y] < values[rightIndex[0]][rightIndex[1]];

		if (lowerDown && lowerLeft && lowerRight && lowerUpper) {
			lowPoints.push(values[x][y] + 1);
		}
	}
}

console.log(lowPoints.reduce((prev, curr) => prev + curr));
