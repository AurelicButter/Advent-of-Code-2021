import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day7.txt", "utf8")
	.split(",")
	.map((value) => Number(value))
	.sort((a, b) => a - b);

const medianNum = values[values.length / 2];

let needFuel = 0;
values.forEach((num) => {
	needFuel += Math.abs(num - medianNum);
});

console.log(needFuel);
