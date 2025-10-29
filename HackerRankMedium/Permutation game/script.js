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
 * Complete the 'permutationGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function permutationGame(arr) {
    // Memoization to speed up repeated state checking
    const memo = new Map();

    function isSorted(a) {
        for (let i = 1; i < a.length; i++) {
            if (a[i] < a[i - 1]) return false;
        }
        return true;
    }

    function grundy(a) {
        const key = a.join(',');
        if (memo.has(key)) return memo.get(key);

        if (isSorted(a)) {
            memo.set(key, 0);
            return 0;
        }

        let moves = new Set();
        for (let i = 0; i < a.length; i++) {
            const next = a.slice(0, i).concat(a.slice(i + 1));
            moves.add(grundy(next));
        }

        // Mex (minimum excludant): smallest non-negative integer not in moves
        let g = 0;
        while (moves.has(g)) g++;
        memo.set(key, g);
        return g;
    }

    return grundy(arr) !== 0 ? "Alice" : "Bob";
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const arrCount = parseInt(readLine().trim(), 10);

        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result = permutationGame(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
