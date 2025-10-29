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
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function isValid(s) {
    // Write your code here
    const freq = {};
    // Count frequency for each character
    for (let ch of s) {
        freq[ch] = (freq[ch] || 0) + 1;
    }
    // Gather all frequencies
    const vals = Object.values(freq);
    // Count frequency of frequencies
    const freqCount = {};
    for (let v of vals) {
        freqCount[v] = (freqCount[v] || 0) + 1;
    }
    const uniqueFreqs = Object.keys(freqCount).map(Number);
    if (uniqueFreqs.length === 1) {
        return "YES";
    }
    // More than 2 distinct frequencies is invalid
    if (uniqueFreqs.length > 2) {
        return "NO";
    }
    // Now, uniqueFreqs.length == 2
    // Find the higher and lower freq
    const [f1, f2] = uniqueFreqs.sort((a, b) => a - b);
    // Valid if: one freq is 1 and occurs once, or higher freq is 1 more than other and occurs once
    if ((freqCount[f1] === 1 && f1 === 1) ||
        (freqCount[f2] === 1 && f2 === f1 + 1)) {
        return "YES";
    }
    return "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
