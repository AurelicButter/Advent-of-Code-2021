import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day10.txt", "utf8")
	.split("\n")
	.map((value) => value.trim().split(""));

const openKeys = ["(", "[", "{", "<"];
const closeKeys = [")", "]", "}", ">"];
const incompletePts = [];

values.forEach((value) => {
	const stack = [];
	let errored = false;

	value.forEach((item) => {
		if (openKeys.includes(item)) {
			stack.push(item);
		}
		if (closeKeys.includes(item)) {
			if (openKeys.indexOf(stack[stack.length - 1]) === closeKeys.indexOf(item)) {
				stack.pop();
			} else {
				errored = true;
			}
		}
	});

	if (stack.length > 0 && !errored) {
		let currItem = stack.pop();
		let myScore = 0;
		while (currItem !== undefined) {
			myScore = myScore * 5 + openKeys.indexOf(currItem) + 1;
			currItem = stack.pop();
		}
		incompletePts.push(myScore);
	}
});

console.log(incompletePts.sort((a, b) => a - b)[Math.floor(incompletePts.length / 2)]);
