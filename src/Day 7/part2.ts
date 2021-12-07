import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day7.txt", "utf8")
	.split(",")
	.map((value) => Number(value))
	.sort((a, b) => a - b);

const means = Math.round(values.reduce((a, b) => a + b) / values.length);

function getFuel(mean: number) {
	let avgFuel = 0;
	values.forEach((num) => {
		const currDistance = Math.abs(num - mean);
		avgFuel += currDistance * (currDistance + 1) * 0.5;
	});
	return avgFuel;
}

console.log([getFuel(means - 1), getFuel(means), getFuel(means + 1)].sort((a, b) => a - b)[0]);
