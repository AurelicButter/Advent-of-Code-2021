import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day6.txt", "utf8")
	.split(",")
	.map((value) => Number(value));

let school = [
	values.filter((x) => x === 0).length,
	values.filter((x) => x === 1).length,
	values.filter((x) => x === 2).length,
	values.filter((x) => x === 3).length,
	values.filter((x) => x === 4).length,
	values.filter((x) => x === 5).length,
	values.filter((x) => x === 6).length,
	values.filter((x) => x === 7).length,
	values.filter((x) => x === 8).length
];

for (let x = 0; x < 256; x++) {
	const tempSchool = [
		school[1],
		school[2],
		school[3],
		school[4],
		school[5],
		school[6],
		school[7] + school[0],
		school[8],
		school[0]
	];

	school = tempSchool;
}

console.log(Object.values(school).reduce((prev, curr) => prev + curr));
