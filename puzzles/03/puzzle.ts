import type { PuzzleSolver } from "../../core";

const getMaxJolts = (bank: number[], batteriesToTurnOn: number): number => {
    let res = 0;

    let leftIndex = 0;
    for (let i = 0; i < batteriesToTurnOn; i++) {
        const leftPart = bank.slice(leftIndex, bank.length - (batteriesToTurnOn - 1 - i));
        let max = -1;
        let maxIndex = -1;
        for (let j = 0; j < leftPart.length; j++) {
            if (leftPart[j] > max) {
                max = leftPart[j];
                maxIndex = j;
            }
        }
        leftIndex += maxIndex + 1;
        res = res * 10 + max;
    }

    return res;
};

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 357, full: 17_113 },

        solve: (input: string): number => {
            return input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split("").map(Number))
                .map((b) => getMaxJolts(b, 2))
                .reduce((a, b) => a + b, 0);
        }
    },

    part2: {
        expectedResult: { example: 3_121_910_778_619, full: 169_709_990_062_889 },

        solve: (input: string): number => {
            return input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split("").map(Number))
                .map((b) => getMaxJolts(b, 12))
                .reduce((a, b) => a + b, 0);
        }
    }
};
