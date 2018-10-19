import * as readLine from "readline";
import {shortestPeriod} from "./periodicite";

const rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

rl.question('Give me a string to evaluate: ', (question) => {
	const answer = shortestPeriod(question);
	console.log(`The shortest period I could find within ${question} is "${answer}"`);
});
