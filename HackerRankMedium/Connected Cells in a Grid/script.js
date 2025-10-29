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
 * Complete the 'connectedCell' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts 2D_INTEGER_ARRAY matrix as parameter.
 */

function connectedCell(matrix) {
    const n = matrix.length;
    const m = matrix[0].length;
    let maxRegion = 0;

    // directions including diagonals
    const dirs = [
        [0,1], [1,0], [0,-1], [-1,0],
        [1,1], [1,-1], [-1,1], [-1,-1]
    ];

    // Track visited cells
    const visited = Array.from({length: n}, () => Array(m).fill(false));

    function dfs(r, c) {
        if (r < 0 || r >= n || c < 0 || c >= m || visited[r][c] || matrix[r][c] === 0) return 0;
        visited[r][c] = true;
        let regionSize = 1;
        for (let [dr, dc] of dirs) {
            regionSize += dfs(r + dr, c + dc);
        }
        return regionSize;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (!visited[i][j] && matrix[i][j] === 1) {
                maxRegion = Math.max(maxRegion, dfs(i, j));
            }
        }
    }
    return maxRegion;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const m = parseInt(readLine().trim(), 10);

    let matrix = Array(n);

    for (let i = 0; i < n; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    const result = connectedCell(matrix);

    ws.write(result + '\n');

    ws.end();
}
