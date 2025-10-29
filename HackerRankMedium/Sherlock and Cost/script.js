'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'cost' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY B as parameter.
 */

function cost(B) {
    let n = B.length;
    // dpLow: max sum if current element is 1
    // dpHigh: max sum if current element is B[i]
    let dpLow = 0, dpHigh = 0;

    for (let i = 1; i < n; i++) {
        let lowToLow = dpLow + 0; // both set to 1: |1-1|=0
        let lowToHigh = dpLow + Math.abs(B[i] - 1); // prev 1, curr B[i]
        let highToLow = dpHigh + Math.abs(1 - B[i - 1]); // prev B[i-1], curr 1
        let highToHigh = dpHigh + Math.abs(B[i] - B[i - 1]); // both max

        let newLow = Math.max(lowToLow, highToLow);
        let newHigh = Math.max(lowToHigh, highToHigh);

        dpLow = newLow;
        dpHigh = newHigh;
    }

    return Math.max(dpLow, dpHigh);
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const B = readLine().replace(/\s+$/g, '').split(' ').map(BTemp => parseInt(BTemp, 10));

        const result = cost(B);

        ws.write(result + '\n');
    }

    ws.end();
}
