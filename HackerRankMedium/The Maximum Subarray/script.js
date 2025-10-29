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
 * Complete the 'maxSubarray' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function maxSubarray(arr) {
    // Maximum contiguous subarray sum (Kadane's Algorithm)
    let maxContig = arr[0];
    let curContig = arr[0];

    for (let i = 1; i < arr.length; i++) {
        curContig = Math.max(arr[i], curContig + arr[i]);
        maxContig = Math.max(maxContig, curContig);
    }

    // Maximum non-contiguous subarray sum
    // Pick all positive numbers; if all negative, pick largest
    let maxNonContig = arr.filter(x => x > 0).reduce((a,b) => a+b, 0);
    if (maxNonContig === 0) {
        maxNonContig = Math.max(...arr);
    }

    return [maxContig, maxNonContig];
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = maxSubarray(arr);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
