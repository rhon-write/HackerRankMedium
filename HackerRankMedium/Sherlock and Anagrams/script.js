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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function sherlockAndAnagrams(s) {
    let total = 0;
    let n = s.length;

    // Map to store sorted substring frequencies
    let freqMap = {};

    // Generate substrings of all possible lengths
    for (let len = 1; len < n; len++) {
        for (let i = 0; i <= n - len; i++) {
            let substr = s.substr(i, len);
            // Sort the substring to normalize anagrams
            let key = substr.split('').sort().join('');
            freqMap[key] = (freqMap[key] || 0) + 1;
        }
    }

    // For each key, count the number of unordered pairs
    for (let key in freqMap) {
        let freq = freqMap[key];
        if (freq > 1) {
            total += (freq * (freq - 1)) / 2;
        }
    }
    return total;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine();

        const result = sherlockAndAnagrams(s);

        ws.write(result + '\n');
    }

    ws.end();
}
