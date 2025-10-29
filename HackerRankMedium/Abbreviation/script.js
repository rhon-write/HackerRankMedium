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
 * Complete the 'abbreviation' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING a
 *  2. STRING b
 */

function abbreviation(a, b) {
    const n = a.length, m = b.length;
    // dp[i][j] = true if a[0..i-1] can be converted to b[0..j-1]
    const dp = Array.from({length: n + 1}, () => Array(m + 1).fill(false));
    dp[0][0] = true;
    for (let i = 1; i <= n; i++) {
        // Can delete all lower-case up to i
        dp[i][0] = dp[i-1][0] && (a[i-1] === a[i-1].toLowerCase());
    }
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (a[i-1].toUpperCase() === b[j-1]) {
                // Use a[i-1] as upper, or delete it if lower-case
                dp[i][j] = dp[i-1][j-1] || (a[i-1] === a[i-1].toLowerCase() && dp[i-1][j]);
            } else {
                // Can only delete if a[i-1] is lower-case
                dp[i][j] = (a[i-1] === a[i-1].toLowerCase()) && dp[i-1][j];
            }
        }
    }
    return dp[n][m] ? "YES" : "NO";
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const a = readLine();

        const b = readLine();

        const result = abbreviation(a, b);

        ws.write(result + '\n');
    }

    ws.end();
}
