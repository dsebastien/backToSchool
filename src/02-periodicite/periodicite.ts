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

// TODO investigate later if performance improvements are needed
// Two-Way string matching algorithm: http://www-igm.univ-mlv.fr/~lecroq/string/node26.html
// --> guarantees linear complexity with constant space
// can be combined with Boyer-Moore string search algorithm: http://en.wikipedia.org/wiki/Boyer-Moore_string_search_algorithm
// --> tradeoff with memory requirements: https://stackoverflow.com/questions/19543547/why-does-string-indexof-not-use-kmp
//
// The occurrences counting can also be made faster: https://jsperf.com/string-ocurrence-split-vs-match/2
// Other interesting links:
// https://reponroy.wordpress.com/2015/04/29/kmp-minimum-length-of-a-repeated-string/
// http://git.savannah.gnu.org/gitweb/?p=gnulib.git;a=blob;f=lib/memmem.c;h=622a034;hb=9d8d6cd
// https://www.programering.com/a/MDO3QTNwATQ.html
// https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/
// https://stackoverflow.com/questions/31865174/implementation-of-z-algorithm
// https://ivanyu.me/blog/2013/10/15/z-algorithm/
