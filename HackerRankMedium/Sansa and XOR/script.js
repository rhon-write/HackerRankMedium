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
 * Complete the 'sansaXor' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function sansaXor(arr) {
    // If n is even, every element gets XORed even times -> result is 0
    // If n is odd, elements at even indices (0-based) get XORed odd times
    let res = 0;
    const n = arr.length;
    if (n % 2 === 0) return 0;
    for (let i = 0; i < n; i += 2) {
        res ^= arr[i];
    }
    return res;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = sansaXor(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
