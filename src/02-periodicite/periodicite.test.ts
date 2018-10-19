import each from "jest-each"; // reference: https://www.npmjs.com/package/jest-each

import { shortestPeriod } from './periodicite';

// testing library: Jest --> https://jestjs.io/docs

const testDataPoints = [
	// TODO load test data from an external file
	["abcd", "(abcd)1"],
	["aaaa", "a4"],
	["ababab", "(ab)3"],
	["aaaaa", "a5"],
	["abcdabcd", "(abcd)2"],
	["abcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijk", "(abcdefghijk)6"],
	["abcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijkabcdefghijk", "(abcdefghijk)30"]
];

describe('shortestPeriod', () => {
    each(testDataPoints).it(
        'should find the shortest repeating sub-string in %s and should return %s',
        (input: string, expected: string) => {
			const startTime = new Date();
				const output = shortestPeriod(input);
			const endTime = new Date();
			const duration = endTime.getTime() - startTime.getTime();

			expect(output).toBe(expected); // correctness
			expect(duration).toBeLessThanOrEqual(100); // time cost threshold
        },
    );
});
