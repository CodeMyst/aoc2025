import type { PuzzleSolver } from "../../core";

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 3, full: 1_074 },

        solve: (input: string): number => {
            const instructions = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.replace("L", "-").replace("R", "+"))
                .map(Number);

            let pos = 50;
            let zeroCounter = 0;
            for (const instruction of instructions) {
                pos += instruction;
                pos = ((pos % 100) + 100) % 100;

                if (pos === 0) zeroCounter++;
            }
            return zeroCounter;
        }
    },

    part2: {
        expectedResult: { example: 6, full: 6_254 },

        solve: (input: string): number => {
            const instructions = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.replace("L", "-").replace("R", "+"))
                .map(Number);

            let pos = 50;
            let zeroCounter = 0;
            for (const instruction of instructions) {
                for (let i = 0; i < Math.abs(instruction); i++) {
                    pos += Math.sign(instruction);

                    if (pos === 100) pos = 0;
                    if (pos === -1) pos = 99;

                    if (pos === 0) zeroCounter++;
                }
            }

            return zeroCounter;
        }
    }
};
