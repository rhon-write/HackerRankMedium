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
 * Complete the 'superDigit' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING n
 *  2. INTEGER k
 */

function superDigit(n, k) {
    // Helper recursive function that computes super digit
    function getSuperDigit(x) {
        if (x.length === 1) return x;
        let sum = 0;
        for (let i = 0; i < x.length; i++) {
            sum += Number(x[i]);
        }
        return getSuperDigit(sum.toString());
    }
    // Compute sum of digits once, multiply by k, recur!
    let sumOnce = 0;
    for (let i = 0; i < n.length; i++) sumOnce += Number(n[i]);
    let total = (sumOnce * k).toString();
    return Number(getSuperDigit(total));
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = firstMultipleInput[0];

    const k = parseInt(firstMultipleInput[1], 10);

    const result = superDigit(n, k);

    ws.write(result + '\n');

    ws.end();
}
