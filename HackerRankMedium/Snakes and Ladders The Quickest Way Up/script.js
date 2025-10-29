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
 * Complete the 'quickestWayUp' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY ladders
 *  2. 2D_INTEGER_ARRAY snakes
 */

function quickestWayUp(ladders, snakes) {
    // Build map from start to end for ladders and snakes
    const move = Array(101).fill(0).map((_, i) => i);
    for (const [start, end] of ladders) move[start] = end;
    for (const [start, end] of snakes) move[start] = end;

    // BFS from square 1 to 100
    const dist = Array(101).fill(-1);
    dist[1] = 0;
    const queue = [1];

    while (queue.length) {
        const s = queue.shift();
        for (let d = 1; d <= 6; d++) {
            let next = s + d;
            if (next > 100) continue;
            next = move[next]; // handle ladder/snake
            if (dist[next] === -1) {
                dist[next] = dist[s] + 1;
                queue.push(next);
            }
        }
    }

    return dist[100];
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        let ladders = Array(n);

        for (let i = 0; i < n; i++) {
            ladders[i] = readLine().replace(/\s+$/g, '').split(' ').map(laddersTemp => parseInt(laddersTemp, 10));
        }

        const m = parseInt(readLine().trim(), 10);

        let snakes = Array(m);

        for (let i = 0; i < m; i++) {
            snakes[i] = readLine().replace(/\s+$/g, '').split(' ').map(snakesTemp => parseInt(snakesTemp, 10));
        }

        const result = quickestWayUp(ladders, snakes);

        ws.write(result + '\n');
    }

    ws.end();
}
