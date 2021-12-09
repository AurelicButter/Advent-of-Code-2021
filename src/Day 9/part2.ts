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
			lowPoints.push([x, y]);
		}
	}
}

function getNeighbours(x: number, y: number) {
	const upIndex = [x - 1, y];
	const downIndex = [x + 1, y];
	const leftIndex = [x, y - 1];
	const rightIndex = [x, y + 1];

	const lowerUpper = upIndex.includes(-1) ? false : values[upIndex[0]][upIndex[1]] !== 9;
	const lowerDown = downIndex.includes(values.length) ? false : values[downIndex[0]][downIndex[1]] !== 9;
	const lowerLeft = leftIndex.includes(-1) ? false : values[leftIndex[0]][leftIndex[1]] !== 9;
	const lowerRight = rightIndex.includes(values[x].length) ? false : values[rightIndex[0]][rightIndex[1]] !== 9;

	return {
		up: lowerUpper === true ? upIndex : null,
		down: lowerDown === true ? downIndex : null,
		left: lowerLeft === true ? leftIndex : null,
		right: lowerRight === true ? rightIndex : null
	};
}

function findBasinSize(x: number, y: number, visited: string[]): number {
	const myKey = `${x},${y}`;
	if (visited.includes(myKey)) {
		return 0;
	}
	visited.push(myKey);

	const neighbours = getNeighbours(x, y);

	let currTop = 0;
	let currBottom = 0;
	let currLeft = 0;
	let currRight = 0;

	let tempTop, tempBottom, tempLeft, tempRight;
	if (neighbours.up) {
		tempTop = findBasinSize(neighbours.up[0], neighbours.up[1], visited);
	}
	if (neighbours.down) {
		tempBottom = findBasinSize(neighbours.down[0], neighbours.down[1], visited);
	}
	if (neighbours.left) {
		tempLeft = findBasinSize(neighbours.left[0], neighbours.left[1], visited);
	}
	if (neighbours.right) {
		tempRight = findBasinSize(neighbours.right[0], neighbours.right[1], visited);
	}

	if (tempTop > currTop) {
		currTop = tempTop;
	}
	if (tempBottom > currBottom) {
		currBottom = tempBottom;
	}
	if (tempLeft > currLeft) {
		currLeft = tempLeft;
	}
	if (tempRight > currRight) {
		currRight = tempRight;
	}

	return currTop + currBottom + currLeft + currRight + 1;
}

const basins = [];
lowPoints.forEach((value) => {
	basins.push(findBasinSize(value[0], value[1], []));
});

console.log(
	basins
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((prev, curr) => prev * curr)
);
