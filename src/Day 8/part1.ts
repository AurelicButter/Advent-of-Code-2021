import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day8.txt", "utf8")
	.split("\n")
	.map((value) => value.trim().split(" | ")[1]);

function deduceNum(input: string): number {
	if (input.length === 2) {
		return 1;
	}
	if (input.length === 3) {
		return 7;
	}
	if (input.length === 4) {
		return 4;
	}
	if (input.length === 7) {
		return 8;
	}
	return 0;
}

let sum = 0;
values.forEach((value) => {
	sum += value.split(" ").filter((x) => deduceNum(x) !== 0).length;
});

console.log(sum);
