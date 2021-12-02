import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day2.txt", "utf8")
	.split("\n")
	.map((value) => value.split(" "));

let forward = 0;
let depth = 0;
let aim = 0;
values.forEach((direction) => {
	const currNum = Number(direction[1]);
	switch (direction[0]) {
		case "forward":
			forward += currNum;
			depth += currNum * aim;
			break;
		case "up":
			aim -= currNum;
			break;
		case "down":
			aim += currNum;
			break;
	}
});

console.log(forward * depth);
