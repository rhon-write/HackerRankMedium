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
 * Complete the 'longestCommonSubsequence' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY a
 *  2. INTEGER_ARRAY b
 */

function longestCommonSubsequence(a, b) {
    const n = a.length, m = b.length;
    // DP table: dp[i][j] = length of LCS of a[0..i-1], b[0..j-1]
    const dp = Array.from({length: n + 1}, () =>
        Array(m + 1).fill(0)
    );

    // Fill DP table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i-1] === b[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    // Reconstruct LCS sequence (returns array)
    let i = n, j = m;
    const result = [];
    while (i > 0 && j > 0) {
        if (a[i-1] === b[j-1]) {
            result.push(a[i-1]);
            i--;
            j--;
        } else if (dp[i-1][j] >= dp[i][j-1]) {
            i--;
        } else {
            j--;
        }
    }
    return result.reverse();
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const b = readLine().replace(/\s+$/g, '').split(' ').map(bTemp => parseInt(bTemp, 10));

    const result = longestCommonSubsequence(a, b);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
