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
 * Complete the 'pylons' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function pylons(k, arr) {
    const n = arr.length;
    let plants = 0;
    let i = 0;

    while (i < n) {
        // Find the farthest plant that can cover current city i
        let loc = Math.min(i + k - 1, n - 1);
        while (loc >= i - k + 1 && (loc >= 0 && arr[loc] === 0)) {
            loc--;
        }
        // No plant found in the range
        if (loc < i - k + 1 || loc < 0) {
            return -1;
        }
        // Place a plant at loc
        plants++;
        // Next uncovered city is one past the reach of this plant
        i = loc + k;
    }
    return plants;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = pylons(k, arr);

    ws.write(result + '\n');

    ws.end();
}
