import type { PuzzleSolver } from "../../core";

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 1_227_775_554, full: 1_391_9717_792 },

        solve: (input: string): number => {
            const ranges = input.split(",").map((l) => l.split("-").map(Number));

            let invalidIdSum = 0;

            for (const range of ranges) {
                const [start, end] = range;

                for (let i = start; i <= end; i++) {
                    const s = String(i);

                    if (s.length % 2 !== 0) continue;

                    const firstPart = s.slice(0, s.length / 2);
                    const secondPart = s.slice(s.length / 2, s.length);

                    if (firstPart === secondPart) invalidIdSum += i;
                }
            }

            return invalidIdSum;
        }
    },

    part2: {
        expectedResult: { example: 4_174_379_265, full: 14_582_313_461 },

        solve: (input: string): number => {
            const ranges = input.split(",").map((l) => l.split("-").map(Number));

            let invalidIdSum = 0;

            const chunksAreSame = (num: string, size: number): boolean => {
                for (let i = size; i < num.length; i += size) {
                    if (num.slice(i - size, i) !== num.slice(i, i + size)) return false;
                }

                return true;
            };

            const checkIfPattern = (num: string): boolean => {
                for (let i = 1; i < num.length; i++) {
                    if (chunksAreSame(num, i)) return true;
                }

                return false;
            };

            for (const range of ranges) {
                const [start, end] = range;

                for (let i = start; i <= end; i++) {
                    const s = String(i);

                    if (checkIfPattern(s)) invalidIdSum += i;
                }
            }

            return invalidIdSum;
        }
    }
};
