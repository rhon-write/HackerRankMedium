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
 * Complete the 'prims' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY edges
 *  3. INTEGER start
 */

function prims(n, edges, start) {
    // Build adjacency list
    const adj = Array.from({length: n + 1}, () => []);
    for (let [u, v, w] of edges) {
        adj[u].push({to: v, weight: w});
        adj[v].push({to: u, weight: w});
    }
    const visited = Array(n + 1).fill(false);

    // Min heap: [weight, node]
    const heap = [];
    heap.push([0, start]);

    let total = 0;

    while (heap.length) {
        // Pop minimum weight edge
        heap.sort((a, b) => a[0] - b[0]);
        const [w, u] = heap.shift();
        if (visited[u]) continue;
        visited[u] = true;
        total += w;

        for (const {to, weight} of adj[u]) {
            if (!visited[to]) heap.push([weight, to]);
        }
    }
    return total;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let edges = Array(m);

    for (let i = 0; i < m; i++) {
        edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
    }

    const start = parseInt(readLine().trim(), 10);

    const result = prims(n, edges, start);

    ws.write(result + '\n');

    ws.end();
}
