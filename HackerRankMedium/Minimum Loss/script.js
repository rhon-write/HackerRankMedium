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
 * Complete the 'minimumLoss' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts LONG_INTEGER_ARRAY price as parameter.
 */

function minimumLoss(price) {
    const indexed = price.map((p, i) => [p, i]);
    // Sort by price ascending
    indexed.sort((a, b) => a[0] - b[0]);

    let minLoss = Number.MAX_SAFE_INTEGER;

    // For every adjacent pair in sorted, check if you can sell after you buy.
    for (let i = 1; i < indexed.length; i++) {
        const higher = indexed[i][0], higherIdx = indexed[i][1];
        const lower = indexed[i - 1][0], lowerIdx = indexed[i - 1][1];
        if (higherIdx < lowerIdx) { // must buy first, then sell
            minLoss = Math.min(minLoss, higher - lower);
        }
    }

    return minLoss;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const price = readLine().replace(/\s+$/g, '').split(' ').map(priceTemp => parseInt(priceTemp, 10));

    const result = minimumLoss(price);

    ws.write(result + '\n');

    ws.end();
}
