import type { PuzzleSolver } from "../../core";

type Roll = 1 | 0;

const getAccessibleRolls = (map: Roll[][]): number[][] => {
    const accessibleRolls = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] !== 1) continue;

            let neighbours = 0;
            for (let ny = -1; ny <= 1; ny++) {
                for (let nx = -1; nx <= 1; nx++) {
                    if (ny === 0 && nx === 0) continue;
                    if (y + ny < 0 || y + ny >= map.length) continue;
                    if (x + nx < 0 || x + nx >= map[y].length) continue;

                    neighbours += map[y + ny][x + nx];
                }
            }

            if (neighbours < 4) {
                accessibleRolls.push([y, x]);
            }
        }
    }

    return accessibleRolls;
};

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 13, full: 1_467 },

        solve: (input: string): number => {
            const map = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split("").map((c) => (c === "@" ? 1 : 0)));

            return getAccessibleRolls(map).length;
        }
    },

    part2: {
        expectedResult: { example: 43, full: 8484 },

        solve: (input: string): number => {
            const map = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split("").map((c) => (c === "@" ? 1 : 0)));

            let accessibleRolls = 0;

            while (true) {
                const rollsToRemove = getAccessibleRolls(map);

                if (rollsToRemove.length === 0) break;

                accessibleRolls += rollsToRemove.length;

                for (const roll of rollsToRemove) {
                    map[roll[0]][roll[1]] = 0;
                }
            }

            return accessibleRolls;
        }
    }
};
