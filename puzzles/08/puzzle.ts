import type { PuzzleSolver } from "../../core";

type JunctionBox = {
    x: number;
    y: number;
    z: number;
};

type JunctionBoxPair = [JunctionBox, JunctionBox];

type Circuit = Set<JunctionBox>;

const euclidianDistance = (a: JunctionBox, b: JunctionBox): number => {
    return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2) + Math.pow(a.z - b.z, 2);
};

const parseInput = (input: string): JunctionBox[] => {
    return input
        .split("\n")
        .filter((l) => l !== "")
        .map((l) => {
            const [x, y, z] = l.split(",").map(Number);
            return { x, y, z } as JunctionBox;
        });
};

const generateAllPairs = (junctionBoxes: JunctionBox[]): JunctionBoxPair[] => {
    const allPairs: JunctionBoxPair[] = [];

    for (let i = 0; i < junctionBoxes.length; i++) {
        for (let j = i + 1; j < junctionBoxes.length; j++) {
            allPairs.push([junctionBoxes[i], junctionBoxes[j]]);
        }
    }

    return allPairs;
};

const connectPair = (circuits: Circuit[], pair: JunctionBoxPair) => {
    const existingA = circuits.find((c) => c.has(pair![0]));
    const existingB = circuits.find((c) => c.has(pair![1]));

    if (existingA && existingB && existingA !== existingB) {
        for (const con of existingB) {
            existingA.add(con);
        }

        const circuitToRemoveIndex = circuits.findIndex(c => c === existingB);
        circuits.splice(circuitToRemoveIndex, 1);
    } else if (existingA && existingB && existingA === existingB) {
        return;
    } else if (existingA) {
        existingA.add(pair[0]);
        existingA.add(pair[1]);
    } else if (existingB) {
        existingB.add(pair[0]);
        existingB.add(pair[1]);
    }
};

export const solve: PuzzleSolver = {
    part1: {
        expectedResult: { example: 40, full: 103_488 },

        solve: (input: string): number => {
            const junctionBoxes = parseInput(input);

            const allPairs = generateAllPairs(junctionBoxes);

            allPairs.sort((a, b) => euclidianDistance(a[0], a[1]) - euclidianDistance(b[0], b[1]));

            const circuits: Circuit[] = junctionBoxes.map((j) => new Set([j]));

            const iterations = junctionBoxes.length > 500 ? 1000 : 10;

            for (let i = 0; i < iterations; i++) {
                connectPair(circuits, allPairs[i]);
            }

            return circuits
                .map((c) => c.size)
                .sort((a, b) => b - a)
                .slice(0, 3)
                .reduce((a, b) => a * b, 1);
        }
    },

    part2: {
        expectedResult: { example: 25_272, full: 8_759_985_540 },

        solve: (input: string): number => {
            const junctionBoxes = parseInput(input);

            const allPairs = generateAllPairs(junctionBoxes);

            allPairs.sort((a, b) => euclidianDistance(a[0], a[1]) - euclidianDistance(b[0], b[1]));

            const circuits: Circuit[] = junctionBoxes.map((j) => new Set([j]));

            let pair: JunctionBoxPair | undefined;
            let currentPair = 0;
            while (circuits.length !== 1) {
                pair = allPairs[currentPair++];

                connectPair(circuits, pair);
            }

            return pair![0].x * pair![1].x;
        }
    }
};
