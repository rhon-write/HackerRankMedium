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
 * Complete the 'counterGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts LONG_INTEGER n as parameter.
 */

function counterGame(n) {
    let num = BigInt(n);
    let moves = 0;
    while (num > 1n) {
        if ((num & (num - 1n)) === 0n) {
            // n is a power of 2
            num /= 2n;
        } else {
            // Remove the largest power of 2 less than n
            let power = 1n;
            while ((power << 1n) <= num) {
                power <<= 1n;
            }
            num -= power;
        }
        moves++;
    }
    return (moves % 2 === 0) ? "Richard" : "Louise";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const result = counterGame(n);

        ws.write(result + '\n');
    }

    ws.end();
}
