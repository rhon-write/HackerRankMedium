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
 * Complete the 'shortPalindrome' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function shortPalindrome(s) {
    const MOD = 1000000007;
    const count1 = new Array(26).fill(0);
    const count2 = Array.from({ length: 26 }, () => new Array(26).fill(0));
    const count3 = new Array(26).fill(0);
    let result = 0;

    for (const ch of s) {
        const idx = ch.charCodeAt(0) - 97;

        // Add count of 3-letter patterns ending with this character
        result = (result + count3[idx]) % MOD;

        // Update 3-letter pattern counts
        for (let j = 0; j < 26; j++) {
            count3[j] = (count3[j] + count2[j][idx]) % MOD;
        }

        // Update 2-letter pattern counts
        for (let j = 0; j < 26; j++) {
            count2[j][idx] = (count2[j][idx] + count1[j]) % MOD;
        }

        // Update single character count
        count1[idx]++;
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = shortPalindrome(s);

    ws.write(result + '\n');

    ws.end();
}
