# Back to school! :)

## About
This is a small repository containing two examples that I was asked to work on:

### 01: Pattern matching

Given a string `s` to search in and a pattern `t` of length `m` to look for, find the first index `i` such that `t` is a factor of `s` at position `i`.

Find the pattern `t` in string `s` and return its position `i` in the string.

If not found, return `-1`

| Input | Pattern | Output |
| :-----: | :------: | :------: |
| lalopalalali | lala | 6 |
| aaaa | a | 0 |
| aaaa | b | -1 |
| abcd | a | 0 |
| abcd | b | 1 | 

### 02: Power strings
Given an input containing periods/repetitions (or not), find the shortest sub-string that is repeating
Relaxed constraint: the length of the input is a multiple of the period.

Examples:

| Input | Output |
| :-----: | :------: |
| abcd | (abcd)1 |
| aaaa | a4 |
| ababab | (ab)3 |

## Installation
* install node and npm
* install the dependencies: `npm install`
* verify that everything is fine with `npm test`

## Running the test suite
* execute `npm test`

## Building the project (generating JS code)
* execute `npm tsc` or `npm run tsc`

## Running the CLI for exercise 01 (pattern matching)
* build the project
* execute `node ./dist/01-recherche-motif/pattern-matcher-cli.js`

## Running the CLI for exercise 02 (period)
* build the project
* execute `node ./dist/02-periodicite/periodicite-cli.js`

## Approach and rationale

### 01: Pattern matching
Approach taken so far:
* naive implementation using the standard `indexOf` function available in Node and most languages
* the comparison is case insensitive and takes the available locales into account.

This is naive because it could prove problematic depending on the data sets, the locale(s) of the data, its length, ...

Computationally, if we assume that a given pattern has to be checked against a large set of input strings, then looping over all the input strings and applying toLower/indexOf to each entry will be very costly: O(n²). It gets worse if there are multiple patterns to check against each input string, as there would be an additional loop, hence O(m*n²) -- I'm not sure about this, I need to review my algorithms courses and books from Donald Knuth.

Written in TypeScript, using the Jest testing library and the `jest-each` package for parameterized testing in order to allow to easily define and use a test data set.

### 02: Power strings
Approach taken at first: naive implementation iterating through the string.
Afterwards, I've looked at more efficient algorithms that could be applicable here such as Knuth-Morris-Pratt (KMP).

Same language and testing approach.

## Ideas to improve

### 01-recherche-motif

If we consider the harder case, having a lot of data to parse / check and maybe multiple patterns to try and match, then caching could be useful. For example, I could use a hashmap which has O(1) lookup time. In it, assuming that patterns are short, I could use the pattern as key and map it to a set of matching inputs. At runtime, this data structure could drastically reduce the amount of checks needed and would improve performance over time, at the cost of more memory usage.

This makes sense if patterns are not too long and if we can dedicate enough memory to the process.

If we have a known list of patterns, then we could also construct such maps at startup in order to have a "hot" cache. To host the cache, we could use things like Redis (in-memory data store). It all depends on the use case and non-functional requirements.

If the use case is not real-time checks, then we could also consider implementing such checks as batch jobs, executed at night with lower priority, ...

### 02-periodicite

#### Performance

First of all, before optimizing we need to investigate if there are actual performance issues.

To be able to know that there is a performance issue:
* benchmark the current algorithm with a relevant test suite (i.e., with relevant/sufficient data)
** cpu
** memory

Possibilities to improve if actual performance issues are detected (depending on their type):
* first, calculate the time complexity of the current algorithm (big O notation)
* avoid processing the string multiple times, first by learning to using KMP properly: https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/
** evaluate against the benchmark
* optimize based on the problem description: "input length is a multiple of the period"
  * it is probably possible to skip some processing
  * idea that I had in mind at first (to review):
    * supposing that len == n
      * 1) divide by len / GCD and take the substring (first character). Check occurrences
      * 2) divide by len / next divisor
      
* if not sufficient, then evaluate other algorithms which improve our test suite / benchmark
  * Two-Way string matching algorithm: http://www-igm.univ-mlv.fr/~lecroq/string/node26.html
  * guarantees linear complexity with constant space
  * can be combined with Boyer-Moore string search algorithm: http://en.wikipedia.org/wiki/Boyer-Moore_string_search_algorithm
  * tradeoff with memory requirements: https://stackoverflow.com/questions/19543547/why-does-string-indexof-not-use-kmp
* the occurrences counting can also be made faster: https://jsperf.com/string-ocurrence-split-vs-match/2

Other interesting links:
* https://reponroy.wordpress.com/2015/04/29/kmp-minimum-length-of-a-repeated-string/
* http://git.savannah.gnu.org/gitweb/?p=gnulib.git;a=blob;f=lib/memmem.c;h=622a034;hb=9d8d6cd
* https://www.programering.com/a/MDO3QTNwATQ.html
* https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/
* https://stackoverflow.com/questions/31865174/implementation-of-z-algorithm
* https://ivanyu.me/blog/2013/10/15/z-algorithm/
