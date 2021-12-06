import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day6.txt", "utf8")
	.split(",")
	.map((value) => Number(value));

let school = {
	0: values.filter((x) => x === 0).length,
	1: values.filter((x) => x === 1).length,
	2: values.filter((x) => x === 2).length,
	3: values.filter((x) => x === 3).length,
	4: values.filter((x) => x === 4).length,
	5: values.filter((x) => x === 5).length,
	6: values.filter((x) => x === 6).length,
	7: values.filter((x) => x === 7).length,
	8: values.filter((x) => x === 8).length
};

for (let x = 0; x < 80; x++) {
	const tempSchool = {
		0: null,
		1: null,
		2: null,
		3: null,
		4: null,
		5: null,
		6: null,
		7: null,
		8: null
	};

	tempSchool[0] = school[1];
	tempSchool[1] = school[2];
	tempSchool[2] = school[3];
	tempSchool[3] = school[4];
	tempSchool[4] = school[5];
	tempSchool[5] = school[6];
	tempSchool[6] = school[7] + school[0];
	tempSchool[7] = school[8];
	tempSchool[8] = school[0];

	school = tempSchool;
}

console.log(Object.values(school).reduce((prev, curr) => prev + curr));
