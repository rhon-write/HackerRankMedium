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
 * Complete the 'legoBlocks' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 */

function legoBlocks(n, m) {
    const MOD = 1e9 + 7;

    const singleRow = new Array(m + 1).fill(0);
    singleRow[0] = 1;
    for (let i = 1; i <= m; i++) {
        for (let block of [1, 2, 3, 4]) {
            if (i - block >= 0) {
                singleRow[i] = (singleRow[i] + singleRow[i - block]) % MOD;
            }
        }
    }

    const totalWays = singleRow.map(val => BigInt(val) ** BigInt(n) % BigInt(MOD));

    const solid = new Array(m + 1).fill(0);
    solid[0] = 1;
    for (let i = 1; i <= m; i++) {
        solid[i] = totalWays[i];
        for (let j = 1; j < i; j++) {
            solid[i] = (solid[i] - (solid[j] * totalWays[i - j]) % BigInt(MOD) + BigInt(MOD)) % BigInt(MOD);
        }
    }

    return Number(solid[m]);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const result = legoBlocks(n, m);

        ws.write(result + '\n');
    }

    ws.end();
}
