/**
 * Count the occurrences of the given substring in the whole string
 * @param str the string to search in
 * @param subString the substring to look for
 * @param allowOverlapping whether to allow overlapping or not
 */
export function countOccurrences(str: string, subString: string, allowOverlapping: boolean): number {
	if (subString.length <= 0) {
		return str.length + 1;
	}
  
	let occurrences = 0;
	let pos = 0;
	let step = (allowOverlapping) ? (1) : (subString.length);
  
	while (true) {
		pos = str.indexOf(subString, pos);
		if (pos >= 0) {
			occurrences++;
			pos += step;
		} else {
			break;
		}
	}
	return occurrences;
}

/**
 * Returns true if str contains repeated sub-strings
 * References:
 * https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
 * https://epubs.siam.org/doi/abs/10.1137/0206024
 * 
 * @param str the string to check
 * @returns true if str is contains repeated sub-strings
 */
export function containsRepetition(str: string): boolean {
	let length: number = str.length;
	
	// Compute the LPS values of the KMP algorithm
	let lps: number[] = computeLPSArray(str); 

	// Find length of longest suffix which is also prefix of str.
	let len: number = lps[length-1];
	
	// If there is a suffix which is also prefix AND Length of the remaining substring divides total length,
	// then str[0..n-len-1] is the substring that repeats n/(n-len) times
	if(len > 0 && length%(length - len) === 0) {
		return true;
	} else {
		return false;
	}
}

/**
 * Computes a the prefix array used in the KMP algorithm
 * Reference: https://www.geeksforgeeks.org/archives/11902
 * @param str the string to computer the prefix array for
 */
export function computeLPSArray(str: string): number[] {
	let lps: number[] = [str.length];

	// length of the previous
	// longest prefix suffix
	let length: number = 0;
	let i: number = 1;
	lps[0] = 0; // lps[0] is always 0

	// the loop calculates lps[i]
	while (i < str.length) { 
		if (str.charAt(i) === str.charAt(length)) { 
			length++;
			lps[i] = length;
			i++;
		} else  {
			if (length != 0) { 
				// This is tricky. Consider the example AAACAAAA and i = 7.
				length = lps[length-1]; 
				// Also, note that we do not increment i here
			} else {
				lps[i] = 0;
				i++;
			}
		}
	}
	return lps;
}

/**
 * Generates the Z array for the given string.
 * Related to the Z algorithm:
 * explanation:
 * https://ivanyu.me/blog/2013/10/15/z-algorithm/  
 * http://codeforces.com/blog/entry/3107
 * code taken from: https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/
 * visual help: https://www.utdallas.edu/~besp/demo/John2010/z-algorithm.htm
 * @param str the string to generate the Z array for
 * @return the Z array for the input string
 */
export function computeZArray(str: string): number[] {
	let Z: number[] = [];

	const n = str.length;

	// left, right: define a window which matches with the prefix of the input
	let L = 0, R=0;

	for(let i = 1; i < n; ++i) {
		if(i > R){ 
  
			L = R = i; 

			// R-L = 0 in starting, so it will start 
			// checking from 0'th index. For example, 
			// for "ababab" and i = 1, the value of R 
			// remains 0 and Z[i] becomes 0. For string 
			// "aaaaaa" and i = 1, Z[i] and R become 5 

			while(R < n && str.charAt(R - L) == str.charAt(R)) 
				R++; 
			  
			Z[i] = R - L; 
			R--; 

		} 
		else{ 
			// k = i-L so k corresponds to number which 
			// matches in [L,R] interval. 
			let k = i - L; 

			// if Z[k] is less than remaining interval 
			// then Z[i] will be equal to Z[k]. 
			// For example, str = "ababab", i = 3, R = 5 
			// and L = 2 
			if(Z[k] < R - i + 1) 
				Z[i] = Z[k]; 

			// For example str = "aaaaaa" and i = 2, R is 5, 
			// L is 0 
			else{ 
				// start from R and check manually 
				L = i; 
				while(R < n && str.charAt(R - L) == str.charAt(R)){ 
					R++; 
				}
				Z[i] = R - L; 
				R--; 
			} 
		} 
	}

	return Z;
}
