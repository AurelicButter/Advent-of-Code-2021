import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day1.txt", "utf8").split("\n");

let counter = 0;
let newCombo = [];
let oldCombo = [Number(values[0]), Number(values[1]), Number(values[2])];

for (let i = 1; i < values.length; i++) {
	newCombo = [Number(values[i]), Number(values[i + 1]), Number(values[i + 2])];

	if (Number.isNaN(newCombo[0]) || Number.isNaN(newCombo[1]) || Number.isNaN(newCombo[2])) {
		continue;
	}

	if (
		newCombo.reduce((partial, newNum) => partial + newNum, 0) >
		oldCombo.reduce((partial, newNum) => partial + newNum, 0)
	) {
		counter++;
	}
	oldCombo = newCombo;
}
console.log(counter);
