'use strict';

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
 * Complete the 'almostSorted' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function almostSorted(arr) {
    // Write your code here
    let n = arr.length;
    let start = -1, end = -1;

    // Find first disorder from left
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            start = i;
            break;
        }
    }

    // Entire array already sorted
    if (start === -1) {
        console.log('yes');
        return;
    }

    // Find last disorder from right
    for (let i = n - 1; i > 0; i--) {
        if (arr[i] < arr[i - 1]) {
            end = i;
            break;
        }
    }

    // Try swap
    let swapped = arr.slice();
    [swapped[start], swapped[end]] = [swapped[end], swapped[start]];
    if (isSorted(swapped)) {
        console.log('yes');
        console.log(`swap ${start + 1} ${end + 1}`);
        return;
    }

    // Try reverse
    let reversed = arr.slice(0, start)
        .concat(arr.slice(start, end + 1).reverse())
        .concat(arr.slice(end + 1));
    if (isSorted(reversed)) {
        console.log('yes');
        console.log(`reverse ${start + 1} ${end + 1}`);
        return;
    }

    // No single swap or reverse sorts the array
    console.log('no');

    function isSorted(a) {
        for (let i = 1; i < a.length; i++) {
            if (a[i] < a[i - 1]) return false;
        }
        return true;
    }
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    almostSorted(arr);
}
