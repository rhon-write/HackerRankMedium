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
 * Complete the 'kruskals' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
 */
function kruskals(gNodes, gFrom, gTo, gWeight) {
    // Assemble edge list with indices for tie-break
    const edges = [];
    for (let i = 0; i < gFrom.length; i++) {
        // Convert nodes to zero-based for internal use
        edges.push({u: gFrom[i] - 1, v: gTo[i] - 1, w: gWeight[i], idx: i});
    }
    // Sort by weight, and by input order for ties
    edges.sort((a, b) => (a.w !== b.w ? a.w - b.w : a.idx - b.idx));

    // Union-find structures
    const parent = Array.from({length: gNodes}, (_, i) => i);
    const find = u => {
        if (u !== parent[u]) parent[u] = find(parent[u]);
        return parent[u];
    };
    const union = (u, v) => {
        parent[find(u)] = find(v);
    };

    // Kruskal's algorithm
    let totalWeight = 0;
    let count = 0;
    for (const {u, v, w} of edges) {
        if (find(u) !== find(v)) {
            union(u, v);
            totalWeight += w;
            count++;
            if (count === gNodes - 1) break;
        }
    }
    return totalWeight;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const gNodesEdges = readLine().split(' ');

    const gNodes = parseInt(gNodesEdges[0], 10);
    const gEdges = parseInt(gNodesEdges[1], 10);

    let gFrom = [];
    let gTo = [];
    let gWeight = [];

    for (let i = 0; i < gEdges; i++) {
        const gFromToWeight = readLine().split(' ');

        gFrom.push(parseInt(gFromToWeight[0], 10));
        gTo.push(parseInt(gFromToWeight[1], 10));
        gWeight.push(parseInt(gFromToWeight[2], 10));
    }

    const res = kruskals(gNodes, gFrom, gTo, gWeight);

    ws.write(res + '\n');
    ws.end();
}
