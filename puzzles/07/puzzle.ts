import type { PuzzleSolver } from "../../core";

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 21, full: 1_646 },

        solve: (input: string): number => {
            const map = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split(""));

            let splits = 0;

            for (let y = 0; y < map.length; y++) {
                for (let x = 0; x < map[0].length; x++) {
                    const tile = map[y][x];

                    if (tile === "S") {
                        const hasDown = y + 1 < map.length;

                        if (hasDown) {
                            const downTile = map[y + 1][x];

                            if (downTile === "^") {
                                splits++;

                                if (x + 1 < map[0].length) map[y + 1][x + 1] = "S";
                                if (x - 1 > 0) map[y + 1][x - 1] = "S";
                            } else {
                                map[y + 1][x] = "S";
                            }
                        }

                        map[y][x] = ".";
                    }
                }
            }

            return splits;
        }
    },

    part2: {
        expectedResult: { example: 40, full: 32_451_134_474_991 },

        solve: (input: string): number => {
            const map = input
                .split("\n")
                .filter((l) => l !== "")
                .map((l) => l.split(""));

            const cache: Map<string, number> = new Map();

            const simulate = (map: string[][]): number => {
                let timelines = 0;

                const formattedMap = map.map((row) => row.join("")).join("\n");
                if (cache.has(formattedMap)) return cache.get(formattedMap)!;

                for (let y = 0; y < map.length; y++) {
                    for (let x = 0; x < map[0].length; x++) {
                        const tile = map[y][x];

                        if (tile === "S") {
                            const hasDown = y + 1 < map.length;

                            if (hasDown) {
                                const downTile = map[y + 1][x];

                                if (downTile === "^") {
                                    if (x + 1 < map[0].length) {
                                        const newMap = map.map((row) => row.slice());
                                        newMap[y + 1][x + 1] = "S";
                                        newMap[y][x] = ".";
                                        timelines += simulate(newMap);
                                    }

                                    if (x - 1 > 0) {
                                        const newMap = map.map((row) => row.slice());
                                        newMap[y + 1][x - 1] = "S";
                                        newMap[y][x] = ".";
                                        timelines += simulate(newMap);
                                    }
                                } else {
                                    map[y][x] = ".";
                                    map[y + 1][x] = "S";
                                }
                            } else {
                                cache.set(formattedMap, timelines + 1);
                                return timelines + 1;
                            }
                        }
                    }
                }

                cache.set(formattedMap, timelines);
                return timelines;
            };

            return 1 + simulate(map);
        }
    }
};
