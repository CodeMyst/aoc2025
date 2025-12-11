import type { PuzzleSolver } from "../../core";

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 50, full: 4_758_598_740 },

        solve: (input: string): number => {
            type RedTile = [number, number];

            const redTiles = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split(",").map(Number) as RedTile);

            const allPairs: [RedTile, RedTile][] = [];

            for (let i = 0; i < redTiles.length; i++) {
                for (let j = i + 1; j < redTiles.length; j++) {
                    allPairs.push([redTiles[i], redTiles[j]]);
                }
            }

            let maxArea = 0;
            for (const pair of allPairs) {
                const x1 = Math.max(pair[0][0], pair[1][0]);
                const x2 = Math.min(pair[0][0], pair[1][0]);
                const y1 = Math.max(pair[0][1], pair[1][1]);
                const y2 = Math.min(pair[0][1], pair[1][1]);

                const area = (x1 - x2 + 1) * (y1 - y2 + 1);

                if (area > maxArea) maxArea = area;
            }

            return maxArea;
        }
    },

    part2: {
        expectedResult: { example: 25_272, full: 8_759_985_540 },

        solve: (input: string): number => {}
    }
};
