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
 * Complete the 'lilysHomework' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function lilysHomework(arr) {
    function countSwaps(arr, sortedArr) {
        let swaps = 0;
        let indexMap = {};
        arr.forEach((val, idx) => indexMap[val] = idx);
        let arrCopy = arr.slice();
        for (let i = 0; i < arrCopy.length; i++) {
            const correctVal = sortedArr[i];
            if (arrCopy[i] !== correctVal) {
                swaps++;
                // Swap arrCopy[i] with the correct value's current index
                let swapIdx = indexMap[correctVal];

                // Update index map for the value being swapped
                indexMap[arrCopy[i]] = swapIdx;
                indexMap[correctVal] = i;

                // Do the swap
                [arrCopy[i], arrCopy[swapIdx]] = [arrCopy[swapIdx], arrCopy[i]];
            }
        }
        return swaps;
    }

    let sortedArr = [...arr].sort((a, b) => a - b);
    let reversedArr = [...sortedArr].reverse();

    return Math.min(countSwaps(arr, sortedArr), countSwaps(arr, reversedArr));
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = lilysHomework(arr);

    ws.write(result + '\n');

    ws.end();
}
