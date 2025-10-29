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
 * Complete the 'countSort' function below.
 *
 * The function accepts 2D_STRING_ARRAY arr as parameter.
 */

function countSort(arr) {
    // Write your code here
    const bins = {};
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        const key = parseInt(arr[i][0]);
        const value = (i < n/2) ? '-' : arr[i][1];
        if (!bins[key]) bins[key] = [];
        bins[key].push(value);
    }
    // Output for key order (stable)
    const keys = Object.keys(bins).map(Number).sort((a, b) => a - b);
    let res = [];
    for (let k of keys) {
        res = res.concat(bins[k]);
    }
    console.log(res.join(' '));
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    let arr = Array(n);

    for (let i = 0; i < n; i++) {
        arr[i] = readLine().replace(/\s+$/g, '').split(' ');
    }

    countSort(arr);
}
