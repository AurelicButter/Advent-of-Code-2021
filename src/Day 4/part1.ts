import { readFileSync } from "fs";

const values = readFileSync("./inputs/Day4.txt", "utf8").split("\n");

class BingoCard {
	currMarked = [
		new Array(5).fill(false),
		new Array(5).fill(false),
		new Array(5).fill(false),
		new Array(5).fill(false),
		new Array(5).fill(false)
	];
	numList = [];

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	addRow(row: string) {
		this.numList.push(
			...row
				.trim()
				.split(" ")
				.filter((x) => x.trim() !== "")
		);
	}

	updateCard(calledNum: string): void {
		const currIndex = this.numList.indexOf(calledNum);
		if (currIndex === -1) {
			return;
		}

		const row = Math.floor(currIndex / 5);
		const column = currIndex % 5;

		this.currMarked[row][column] = true;
	}

	checkWinner(): boolean {
		let bingo = false;

		this.currMarked.forEach((row) => {
			const count = row.filter((value) => {
				return value === true;
			}).length;
			if (count === 5) {
				bingo = true;
			}
		});

		if (bingo) {
			return true;
		}

		for (let x = 0; x < 5; x++) {
			const column = [
				this.currMarked[0][x],
				this.currMarked[1][x],
				this.currMarked[2][x],
				this.currMarked[3][x],
				this.currMarked[4][x]
			];

			const count = column.filter((value) => {
				return value === true;
			}).length;
			if (count === 5) {
				return true;
			}
		}

		return false;
	}

	unmarkedSum(): number {
		let sum = 0;
		this.numList.forEach((value, index) => {
			const row = Math.floor(index / 5);
			const column = index % 5;

			if (this.currMarked[row][column] === false) {
				sum += Number(value);
			}
		});
		return sum;
	}
}

const bingoCalls = values[0].split(",");
values.shift();
const bingoValues = values.filter((x) => x.trim() !== "");
const bingoCards: BingoCard[] = [];

let currRow = 0;
let currCard: BingoCard;

bingoValues.forEach((value) => {
	if (currRow === 0) {
		currCard = new BingoCard();
		bingoCards.push(currCard);
	}

	currCard.addRow(value);
	currRow = currRow === 4 ? 0 : currRow + 1;
});

let finalCall = 0;
let winningCard: BingoCard;
for (let x = 0; x < bingoCalls.length; x++) {
	bingoCards.forEach((card) => {
		card.updateCard(bingoCalls[x]);
		if (card.checkWinner()) {
			winningCard = card;
			finalCall = Number(bingoCalls[x]);
		}
	});

	if (winningCard) {
		x = bingoCalls.length;
	}
}

console.log(winningCard.unmarkedSum() * finalCall);
