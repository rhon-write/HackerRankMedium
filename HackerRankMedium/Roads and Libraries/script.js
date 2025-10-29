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
 * Complete the 'roadsAndLibraries' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c_lib
 *  3. INTEGER c_road
 *  4. 2D_INTEGER_ARRAY cities
 */

function roadsAndLibraries(n, c_lib, c_road, cities) {
    if (c_lib <= c_road) return n * c_lib; // Cheaper to build a library in every city

    // Build adjacency list for the cities
    const adj = Array.from({length: n + 1}, () => []);
    for (const [a, b] of cities) {
        adj[a].push(b);
        adj[b].push(a);
    }
    const visited = Array(n + 1).fill(false);

    let cost = 0;

    function dfs(city) {
        visited[city] = true;
        let count = 1;
        for (const neighbor of adj[city]) {
            if (!visited[neighbor]) count += dfs(neighbor);
        }
        return count;
    }

    // Find connected components, one library per component
    for (let city = 1; city <= n; city++) {
        if (!visited[city]) {
            const citiesInComp = dfs(city);
            // One library, roads to connect each remaining city in component
            cost += c_lib + (citiesInComp - 1) * c_road;
        }
    }
    return cost;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);

        const m = parseInt(firstMultipleInput[1], 10);

        const c_lib = parseInt(firstMultipleInput[2], 10);

        const c_road = parseInt(firstMultipleInput[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().replace(/\s+$/g, '').split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        ws.write(result + '\n');
    }

    ws.end();
}
