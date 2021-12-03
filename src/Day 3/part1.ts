import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day3.txt", "utf8")
	.split("\n")
	.map((value) => value.trim().replace("\r", ""));

function getCommonChar(row: string[], index: number, uncommon = false): string {
	const currRow = row.filter((x) => x.charAt(index) === "1").length;

	if (currRow >= row.length / 2) {
		if (uncommon) {
			return "0";
		}
		return "1";
	}
	if (uncommon) {
		return "1";
	}
	return "0";
}

let gamma = "";
let epsilon = "";
let index = 0;
while (index !== values[0].length) {
	gamma += getCommonChar(values, index);
	epsilon += getCommonChar(values, index, true);
	index++;
}

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
