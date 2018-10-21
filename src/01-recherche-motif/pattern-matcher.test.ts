import each from "jest-each";
import {firstIndexOf} from "./pattern-matcher";

const testDataPoints = [
	// TODO load test data from an external file
	["lalopalalali", "lala", 6],
	["la", "l", 0],
	["La", "l", 0],
	["la", "L", 0],
	["aa", "b", -1],
	["abc", "b", 1],
	["abc", "c", 2],
	["aaaa", "a", 0],
	["aaaa", "b", -1],
	["abcd", "a", 0],
	["abcd", "b", 1],
	["abcd", "c", 2],
	["abcd", "d", 3],
	["", "", 0],
	["", "a", -1]
];

describe('firstIndexOf', () => {
    each(testDataPoints).it(
        'should find the shortest repeating sub-string in %s and should return %s',
        (input: string, pattern: string, expected: string) => {
			const startTime = new Date();
				const output = firstIndexOf(input, pattern);
			const endTime = new Date();
			const duration = endTime.getTime() - startTime.getTime();

			expect(output).toBe(expected); // correctness
			expect(duration).toBeLessThanOrEqual(100); // time cost threshold
        },
    );
});
