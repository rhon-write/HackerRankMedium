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
 * Complete the 'journeyToMoon' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY astronaut
 */

function journeyToMoon(n, astronaut) {
    // Build adjacency list
    const adj = Array.from({length: n}, () => []);
    for (const [a, b] of astronaut) {
        adj[a].push(b);
        adj[b].push(a);
    }
    const visited = Array(n).fill(false);
    let groupSizes = [];

    function dfs(node) {
        visited[node] = true;
        let count = 1;
        for (const neighbor of adj[node]) {
            if (!visited[neighbor]) count += dfs(neighbor);
        }
        return count;
    }

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            groupSizes.push(dfs(i));
        }
    }

    // Calculate number of valid pairs: sum of sizes[i] * sizes[j] (i < j)
    let total = 0, sum = 0;
    for (let sz of groupSizes) {
        total += sum * sz;
        sum += sz;
    }
    return total;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const p = parseInt(firstMultipleInput[1], 10);

    let astronaut = Array(p);

    for (let i = 0; i < p; i++) {
        astronaut[i] = readLine().replace(/\s+$/g, '').split(' ').map(astronautTemp => parseInt(astronautTemp, 10));
    }

    const result = journeyToMoon(n, astronaut);

    ws.write(result + '\n');

    ws.end();
}
