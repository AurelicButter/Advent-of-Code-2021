import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day1.txt", "utf8").split("\n");

let counter = 0;
let oldCombo = Number(values[0]);

for (let i = 1; i < values.length; i++) {
	const newCombo = Number(values[i + 2]);

	if (Number.isNaN(newCombo)) {
		continue;
	}
	if (oldCombo < newCombo) {
		counter++;
	}
	oldCombo = Number(values[i]);
}
console.log(counter);
