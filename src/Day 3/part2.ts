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

function findBinary(values: string[], uncommon = false): string {
	let index = 0;
	while (values.length > 1) {
		const target = getCommonChar(values, index, uncommon);
		values = values.filter((x) => x.charAt(index) === target);
		index++;
	}
	return values[0];
}

const currOXY = findBinary(values);
const currCO2 = findBinary(values, true);
console.log(parseInt(currOXY, 2) * parseInt(currCO2, 2));
