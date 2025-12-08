import type { PuzzleSolver } from "../../core";

type Range = {
    min: number;
    max: number;
};

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 3, full: 558 },

        solve: (input: string): number => {
            const [rangesInput, idsInput] = input.split("\n\n");

            const ranges = rangesInput
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => {
                    const [min, max] = l.split("-").map(Number);
                    return { min, max } as Range;
                });

            const ids = idsInput
                .split("\n")
                .filter((l) => l !== "")
                .map(Number);

            return ids.filter((id) => ranges.some((r) => id >= r.min && id <= r.max)).length;
        }
    },

    part2: {
        expectedResult: { example: 14, full: 344_813_017_450_467 },

        solve: (input: string): number => {
            const rangesInput = input
                .split("\n\n")[0]
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split("-").map(Number))
                .map((l) => ({ min: l[0], max: l[1] }) as Range);

            rangesInput.sort((a, b) => a.min - b.min);

            const ranges: Range[] = [rangesInput[0]];

            for (const range of rangesInput.slice(1)) {
                const previous = ranges[ranges.length - 1];

                if (range.min <= previous.max) {
                    previous.max = Math.max(previous.max, range.max);
                } else {
                    ranges.push(range);
                }
            }

            return ranges.reduce((a, b) => a + b.max - b.min + 1, 0);
        }
    }
};
