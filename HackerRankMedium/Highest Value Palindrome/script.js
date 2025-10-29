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
 * Complete the 'highestValuePalindrome' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER n
 *  3. INTEGER k
 */

function highestValuePalindrome(s, n, k) {
    let chars = s.split('');
    let changes = new Array(n).fill(0);
    let left = 0, right = n - 1;

    // First pass: Make palindrome with minimal changes
    while (left < right) {
        if (chars[left] !== chars[right]) {
            const maxChar = chars[left] > chars[right] ? chars[left] : chars[right];
            chars[left] = chars[right] = maxChar;
            changes[left] = changes[right] = 1;
            k--;
        }
        left++;
        right--;
    }
    if (k < 0) return "-1";

    // Second pass: Maximize digits with remaining k
    left = 0;
    right = n - 1;
    while (left <= right) {
        if (left == right && k > 0 && chars[left] != '9') {
            chars[left] = '9';
            k--;
        }
        if (chars[left] < '9') {
            let need = changes[left] || changes[right] ? 1 : 2;
            if (k >= need) {
                chars[left] = chars[right] = '9';
                k -= need;
            }
        }
        left++;
        right--;
    }
    return chars.join('');
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const s = readLine();

    const result = highestValuePalindrome(s, n, k);

    ws.write(result + '\n');

    ws.end();
}
