import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day11.txt", "utf8")
	.split("\n")
	.map((value) =>
		value
			.trim()
			.split("")
			.map((x) => Number(x))
	);

function updateNeighbours(x: number, y: number) {
	if (y !== 0) {
		values[x][y - 1]++;
	}
	if (y !== values[x].length - 1) {
		values[x][y + 1]++;
	}
	if (x !== 0) {
		if (y !== 0) {
			values[x - 1][y - 1]++;
		}
		if (y !== values[x].length - 1) {
			values[x - 1][y + 1]++;
		}
		values[x - 1][y]++;
	}

	if (x !== values.length - 1) {
		if (y !== 0) {
			values[x + 1][y - 1]++;
		}
		if (y !== values[x].length - 1) {
			values[x + 1][y + 1]++;
		}
		values[x + 1][y]++;
	}
}

let flash = 0;

for (let i = 0; i < 100; i++) {
	for (let x = 0; x < values.length; x++) {
		const currRow = values[x];
		for (let y = 0; y < currRow.length; y++) {
			currRow[y]++;

			if (currRow[y] > 9) {
				updateNeighbours(x, y);
				currRow[y] = -9;
				flash++;
			}
		}
	}

	let doneFlash = false;

	while (doneFlash !== true) {
		let check = true;
		values.forEach((row, x) => {
			row.forEach((item, y) => {
				if (item > 9) {
					flash++;
					values[x][y] = -9;
					updateNeighbours(x, y);
					check = false;
				}
			});
		});
		doneFlash = check;
	}

	values.forEach((row, x) => {
		row.forEach((item, y) => {
			if (values[x][y] < 0) {
				values[x][y] = 0;
			}
		});
	});
}

console.log(flash);
