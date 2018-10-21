import { containsRepetition, countOccurrences } from './string-utils';

/**
 * Returns the shortest period (repeating sub-string) for the given input string
 * Examples:
 * abcd -> (abcd)1
 * aaaa -> a4
 * ababab -> (ab)3
 * @param input the string to search for repetitions in
 * @returns the shortest period found in the input string
 */
export function shortestPeriod(input: string): string {
	if(input == null) {
		throw new Error("The input string is required")
	}
	
	if(!containsRepetition(input)) {
		return `(${input})1`; // in this case there's no repeating pattern, the whole string is the period
	}

	// there's at least some repetition so we start looking for the smallest pattern
	let subStringLength = 0;

	while(true) {
		subStringLength++;

		let subString = input.substring(0, subStringLength);
		let occurrences = countOccurrences(input, subString, false);
		
		//console.log("Substring: ", subString);
		//console.log("Occurrences: ",occurrences);
	
		if(input.length === (occurrences * subStringLength) ) {
			// the current pattern occurs enough times to cover the whole string, so this is the smallest repeating one
			if(subStringLength == 1) {
				return `${subString}${occurrences}`; // e.g., a4
			}else {
				return `(${subString})${occurrences}`; // e.g., (abc)2
			}
		} else if(subStringLength === input.length) {
			return input;
		}
	}
}
