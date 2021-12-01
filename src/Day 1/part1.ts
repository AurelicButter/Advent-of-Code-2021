import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day1.txt", "utf8").split("\n");

let oldValue = 0;
let counter = 0;
values.forEach((currVal) => {
	const currNum = Number(currVal);

	if (oldValue === 0) {
		oldValue = currNum;
		return;
	}

	if (currNum > oldValue) {
		counter++;
	}
	oldValue = currNum;
});
console.log(counter);
