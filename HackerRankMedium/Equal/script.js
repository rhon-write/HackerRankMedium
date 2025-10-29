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
 * Complete the 'equal' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function equal(arr) {
    const min = Math.min(...arr);
    let answer = Infinity;

    // For each base decrement (0 to 4)
    for (let base = 0; base <= 4; base++) {
        let current = 0;
        for (let a of arr) {
            let diff = a - (min - base);
            // Number of 5s, 2s, and 1s needed
            current += Math.floor(diff / 5);
            diff %= 5;
            current += Math.floor(diff / 2);
            diff %= 2;
            current += diff;
        }
        answer = Math.min(answer, current);
    }
    return answer;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = equal(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
