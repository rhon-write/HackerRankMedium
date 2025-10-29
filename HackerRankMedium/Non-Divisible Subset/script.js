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
 * Complete the 'nonDivisibleSubset' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY s
 */

function nonDivisibleSubset(k, s) {
    // Write your code here
    let remainders = new Array(k).fill(0);

    // Fill frequency array
    for (let num of s) {
        remainders[num % k]++;
    }

    // At most one number with remainder 0 can be picked
    let count = Math.min(remainders[0], 1);

    // For each remainder pair (i, k-i), pick the greater frequency
    for (let i = 1; i <= Math.floor(k / 2); i++) {
        if (i !== k - i) {
            count += Math.max(remainders[i], remainders[k - i]);
        } else {
            // If k is even, only one from remainder k/2 is allowed
            count += 1;
        }
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine().replace(/\s+$/g, '').split(' ').map(sTemp => parseInt(sTemp, 10));

    const result = nonDivisibleSubset(k, s);

    ws.write(result + '\n');

    ws.end();
}
