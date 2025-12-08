import type { PuzzleSolver } from "../../core";

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 4_277_556, full: 4_405_895_212_738 },

        solve: (input: string): number => {
            const numbers = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.replace(/\s+/g, " ").trim().split(" "));

            let res = 0;

            for (let col = 0; col < numbers[0].length; col++) {
                const op = numbers[numbers.length - 1][col];
                let colRes = op === "*" ? 1 : 0;
                for (let row = 0; row < numbers.length - 1; row++) {
                    const num = Number(numbers[row][col]);
                    if (op === "*") {
                        colRes *= num;
                    } else if (op === "+") {
                        colRes += num;
                    }
                }

                res += colRes;
            }

            return res;
        }
    },

    part2: {
        expectedResult: { example: 3_263_827, full: 7_450_962_489_289 },

        solve: (input: string): number => {
            const lines = input.split("\n").filter((l) => l !== "");
            const opLine = lines[lines.length - 1].split("");

            let sum = 0;

            let i = 0;
            while (i < lines[0].length) {
                const op = opLine[i];

                const nextOpIndex = opLine.slice(i + 1).findIndex((c) => c === "*" || c === "+");

                let len = 0;
                if (nextOpIndex === -1) {
                    len = lines[0].length - i;
                } else {
                    len = nextOpIndex + 1;
                }

                let colSum = op === "*" ? 1 : 0;

                for (let j = len - 1; j >= 0; j--) {
                    let num = "";
                    for (let row = 0; row < lines.length - 1; row++) {
                        num += lines[row][i + j];
                    }

                    if (num.trim() === "") continue;

                    if (op === "*") {
                        colSum *= Number(num);
                    } else {
                        colSum += Number(num);
                    }
                }

                sum += colSum;

                i += len;
            }

            return sum;
        }
    }
};
