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
 * Complete the 'substrings' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING n as parameter.
 */

function substrings(n) {
    const MOD = 1000000007;
    const s = n.toString();
    let totalSum = 0;
    let prev = 0;

    for (let i = 0; i < s.length; i++) {
        const digit = Number(s[i]);
        // Each digit can be a new substring or appended to all previous substrings
        prev = (prev * 10 + digit * (i + 1)) % MOD;
        totalSum = (totalSum + prev) % MOD;
    }
    return totalSum;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = readLine();

    const result = substrings(n);

    ws.write(result + '\n');

    ws.end();
}
