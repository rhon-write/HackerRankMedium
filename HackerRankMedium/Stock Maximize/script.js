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
 * Complete the 'stockmax' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY prices as parameter.
 */

function stockmax(prices) {
    let maxProfit = 0;
    let n = prices.length;
    let maxSeen = 0;

    // Traverse from right to left
    for (let i = n - 1; i >= 0; i--) {
        maxSeen = Math.max(maxSeen, prices[i]);
        maxProfit += maxSeen - prices[i];
    }
    return maxProfit;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const prices = readLine().replace(/\s+$/g, '').split(' ').map(pricesTemp => parseInt(pricesTemp, 10));

        const result = stockmax(prices);

        ws.write(result + '\n');
    }

    ws.end();
}
