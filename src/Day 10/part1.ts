import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day10.txt", "utf8")
	.split("\n")
	.map((value) => value.trim().split(""));

const openKeys = ["<", "[", "{", "("];
const closeKeys = [">", "]", "}", ")"];

let sumErrors = 0;
values.forEach((value) => {
	const stack = [];
	const badKeys = [];

	value.forEach((item) => {
		if (openKeys.includes(item)) {
			stack.push(item);
		}
		if (closeKeys.includes(item)) {
			if (openKeys.indexOf(stack[stack.length - 1]) === closeKeys.indexOf(item)) {
				stack.pop();
			} else {
				badKeys.push(item);
			}
		}
	});

	switch (badKeys[0]) {
		case ")":
			sumErrors += 3;
			break;
		case "]":
			sumErrors += 57;
			break;
		case "}":
			sumErrors += 1197;
			break;
		case ">":
			sumErrors += 25137;
			break;
	}
});

console.log(sumErrors);
