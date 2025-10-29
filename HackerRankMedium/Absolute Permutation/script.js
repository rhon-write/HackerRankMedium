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
 * Complete the 'absolutePermutation' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 */

function absolutePermutation(n, k) {
    // Write your code here
    if (k === 0) {
        // If k == 0, return the identity permutation
        return Array.from({length: n}, (_, i) => i + 1);
    }

    if (n % (2 * k) !== 0) {
        // Impossible to form a valid permutation
        return [-1];
    }

    let result = [];
    let add = true;

    for (let i = 1; i <= n; i++) {
        if (add) {
            result.push(i + k);
        } else {
            result.push(i - k);
        }
        if (i % k === 0) {
            add = !add;
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const k = parseInt(firstMultipleInput[1], 10);

        const result = absolutePermutation(n, k);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
