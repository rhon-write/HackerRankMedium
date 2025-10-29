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

// Complete the evenForest function below.
function evenForest(t_nodes, t_edges, t_from, t_to) {
    // Build adjacency list, 1-based node indices
    const adj = Array.from({length: t_nodes + 1}, () => []);
    for (let i = 0; i < t_edges; i++) {
        adj[t_from[i]].push(t_to[i]);
        adj[t_to[i]].push(t_from[i]);
    }

    const visited = Array(t_nodes + 1).fill(false);
    let cutEdges = 0;

    function dfs(node) {
        visited[node] = true;
        let subTreeSize = 1;
        for (let neighbor of adj[node]) {
            if (!visited[neighbor]) {
                const size = dfs(neighbor);
                if (size % 2 === 0) {
                    cutEdges++;
                } else {
                    subTreeSize += size;
                }
            }
        }
        return subTreeSize;
    }

    dfs(1); // Problem states node 1 is root

    return cutEdges;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const tNodesEdges = readLine().split(' ');

    const tNodes = parseInt(tNodesEdges[0], 10);
    const tEdges = parseInt(tNodesEdges[1], 10);

    let tFrom = [];
    let tTo = [];

    for (let i = 0; i < tEdges; i++) {
        const tFromTo = readLine().split(' ');
        tFrom.push(parseInt(tFromTo[0], 10));
        tTo.push(parseInt(tFromTo[1], 10));
    }

    const res = evenForest(tNodes, tEdges, tFrom, tTo);

    ws.write(res + '\n');
    ws.end();
}
