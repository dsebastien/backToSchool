import * as readLine from "readline";
import {firstIndexOf} from "./pattern-matcher";

const rl = readLine.createInterface({
	input: process.stdin,
	output: process.stdout
});

// Read the user input
// Since readLine exposes an async API, we leverage promises and async/await
// to be able to ask both questions, wait for the answers and the continue (cfr main function which is async)

const question1 = () => {
	return new Promise(resolve => {
		rl.question('What is the string to look for? ', (answer: string) => {
			resolve(answer)
		});
	})
};

const question2 = () => {
	return new Promise(resolve => {
		rl.question('What is the pattern to look for? ', (answer: string) => {
			resolve(answer);
		});
	})
};

const main = async () => {
	const input = await question1();
	const pattern = await question2();
	rl.close();
	
	const answer = firstIndexOf(input as string, pattern as string);
	if(-1 === answer) {
		console.log("No match found!");
	} else {
		console.log("Found the first match at position ", answer);
	}
};

main();
