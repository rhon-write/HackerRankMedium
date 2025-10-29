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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
    // Write your code here
    const directions = [
        [1, 0],    // up
        [-1, 0],   // down
        [0, 1],    // right
        [0, -1],   // left
        [1, 1],    // up-right
        [1, -1],   // up-left
        [-1, 1],   // down-right
        [-1, -1]   // down-left
    ];

    // Convert obstacles to a Set for O(1) lookups
    const obstacleSet = new Set(obstacles.map(ob => `${ob[0]}_${ob[1]}`));
    let count = 0;

    for (const [dr, dc] of directions) {
        let currRow = r_q + dr;
        let currCol = c_q + dc;
        while (
            currRow >= 1 && currRow <= n &&
            currCol >= 1 && currCol <= n &&
            !obstacleSet.has(`${currRow}_${currCol}`)
        ) {
            count++;
            currRow += dr;
            currCol += dc;
        }
    }

    return count;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r_q = parseInt(secondMultipleInput[0], 10);

    const c_q = parseInt(secondMultipleInput[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');

    ws.end();
}
