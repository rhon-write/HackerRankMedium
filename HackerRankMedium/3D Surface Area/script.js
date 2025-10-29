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
 * Complete the 'surfaceArea' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY A as parameter.
 */

function surfaceArea(A) {
    // Write your code here
    const H = A.length;         // number of rows
    const W = A[0].length;      // number of columns
    let area = 0;

    for (let i = 0; i < H; i++) {
        for (let j = 0; j < W; j++) {
            if (A[i][j] > 0) {
                // Contribution from top and bottom surfaces
                area += 2;

                // Contribution from sides
                // Up
                area += Math.max(A[i][j] - (i > 0 ? A[i - 1][j] : 0), 0);
                // Down
                area += Math.max(A[i][j] - (i < H - 1 ? A[i + 1][j] : 0), 0);
                // Left
                area += Math.max(A[i][j] - (j > 0 ? A[i][j - 1] : 0), 0);
                // Right
                area += Math.max(A[i][j] - (j < W - 1 ? A[i][j + 1] : 0), 0);
            }
        }
    }

    return area;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const H = parseInt(firstMultipleInput[0], 10);

    const W = parseInt(firstMultipleInput[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    const result = surfaceArea(A);

    ws.write(result + '\n');

    ws.end();
}
