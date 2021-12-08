import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day8.txt", "utf8")
	.split("\n")
	.map((value) => value.trim().split(" | "));

function filterLen(input: string, verifier: string): number {
	const verifierSplit = verifier.split("");
	return input.split("").filter((x) => verifierSplit.includes(x)).length;
}

function generateDisplay(input) {
	const numKeys: string[] = new Array(10).fill("");
	input = input.split(" ");

	input.forEach((value) => {
		if (value.length === 2) {
			numKeys[1] = value;
		}
		if (value.length === 3) {
			numKeys[7] = value;
		}
		if (value.length === 4) {
			numKeys[4] = value;
		}
		if (value.length === 7) {
			numKeys[8] = value;
		}
	});

	let index = 0;
	while (index < 2) {
		input.forEach((value) => {
			if (value.length === 2 || value.length === 3 || value.length === 4 || value.length === 7) {
				return;
			}

			if (value.length === 5) {
				if (filterLen(value, numKeys[6]) === 5) {
					numKeys[5] = value;
					return;
				}
				if (filterLen(value, numKeys[1]) === 2) {
					numKeys[3] = value;
					return;
				}
				numKeys[2] = value;
			}

			if (value.length === 6) {
				if (!value.includes(numKeys[1].charAt(0)) || !value.includes(numKeys[1].charAt(1))) {
					numKeys[6] = value;
					return;
				}
				if (filterLen(value, numKeys[4]) === 4) {
					numKeys[9] = value;
					return;
				}
				numKeys[0] = value;
			}
		});

		index++;
	}
	return numKeys;
}

function decode(numkeys: string[], input: string): string {
	const currInput = input.split(" ");
	const msgOutput = [];

	currInput.forEach((value, index) => {
		if (value.length === 2) {
			msgOutput[index] = 1;
			return;
		}
		if (value.length === 3) {
			msgOutput[index] = 7;
			return;
		}
		if (value.length === 4) {
			msgOutput[index] = 4;
			return;
		}
		if (value.length === 7) {
			msgOutput[index] = 8;
			return;
		}

		if (value.length === 5) {
			if (filterLen(value, numkeys[5]) === 5) {
				msgOutput[index] = 5;
				return;
			}
			if (filterLen(value, numkeys[3]) === 5) {
				msgOutput[index] = 3;
				return;
			}
			msgOutput[index] = 2;
			return;
		}

		if (value.length === 6) {
			if (filterLen(value, numkeys[6]) === 6) {
				msgOutput[index] = 6;
				return;
			}
			if (filterLen(value, numkeys[9]) === 6) {
				msgOutput[index] = 9;
				return;
			}
			msgOutput[index] = 0;
			return;
		}
	});
	return msgOutput.join("");
}

let sum = 0;
values.forEach((value) => {
	sum += Number(decode(generateDisplay(value[0]), value[1]));
});

console.log(sum);
