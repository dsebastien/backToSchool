const fs = require('fs');

const testData = fs.readFileSync('test-data.txt','utf-8');

console.log(testData);