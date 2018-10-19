# Here are the usage instructions

## Installation
* install node and npm
* install the dependencies: `npm install`
* verify that everything is fine with `npm test`

## Running the test suite
* execute `npm test`

## Building the project (generating JS code)
* execute `npm tsc` or `npm run tsc`

## Running the CLI for exercise 02 (period)
* build the project
* execute `node ./dist/02-periodicite/periodicite-cli.js`

## Ideas to improve

### 02-periodicite

#### Performance

Investigate if performance improvements are needed.

To be able to know that there is a performance issue:
* benchmark the current algorithm with a relevant test suite
** cpu
** memory

Possibilities to improve if actual performance issues are detected:
* calculate the complexity of the current algorithm (big O notation)
* evaluate other algorithms which improve our test suite / benchmark
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