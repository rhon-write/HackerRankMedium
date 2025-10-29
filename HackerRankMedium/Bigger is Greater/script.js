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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

function biggerIsGreater(w) {
    // Write your code here
    let arr = w.split('');
    let i = arr.length - 2;

    // Step 1: Find the rightmost character which is smaller than its next character
    while (i >= 0 && arr[i] >= arr[i + 1]) {
        i--;
    }

    if (i < 0) {
        // The string is the highest permutation
        return 'no answer';
    }

    // Step 2: Find the rightmost character to the right of arr[i] that is greater than arr[i]
    let j = arr.length - 1;
    while (arr[j] <= arr[i]) {
        j--;
    }

    // Step 3: Swap them
    [arr[i], arr[j]] = [arr[j], arr[i]];

    // Step 4: Reverse the sequence after index i
    let left = i + 1;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }

    return arr.join('');

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
