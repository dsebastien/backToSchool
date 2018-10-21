
/**
 * Returns the index of the first occurrence of the given pattern in the input string.
 * Matching is case insensitive
 * Examples:
 * lalopalalali lala -> 6
 * la l -> 0
 * La l -> 0
 * la L -> 0
 * aa b -> -1
 * abc b -> 1
 * abc c -> 2
 
 * @param input the string to search in
 * @param pattern the pattern to search for
 * @returns the index of the first occurrence of the pattern in the input string or -1 if not found
 */
export function firstIndexOf(input: string, pattern: string): number {
	if(input == null) {
		throw new Error("The input string is required")
	}else if (pattern == null) {
		throw new Error("The pattern is required");
	}
	
	const inputLowercase: string = input.toLocaleLowerCase(); // TODO check why TS doesn't allow passing a list of locales
	const patternLowercase: string = pattern.toLocaleLowerCase();
	
	return inputLowercase.indexOf(patternLowercase);
}
