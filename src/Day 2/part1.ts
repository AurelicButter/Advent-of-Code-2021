import { readFileSync } from "fs";

let forward = 0;
let depth = 0;
readFileSync("./inputs/Day2.txt", "utf8")
	.split("\n")
	.map((value) => value.split(" "))
	.forEach((direction) => {
		switch (direction[0]) {
			case "forward":
				forward += Number(direction[1]);
				break;
			case "up":
				depth -= Number(direction[1]);
				break;
			case "down":
				depth += Number(direction[1]);
				break;
		}
	});

console.log(forward * depth);
