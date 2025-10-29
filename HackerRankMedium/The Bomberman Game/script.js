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
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

function bomberMan(n, grid) {
    // Write your code here
    if (n === 1) return grid;

    const R = grid.length;
    const C = grid[0].length;

    // Function to get next grid after bombs detonate
    function detonate(currGrid) {
        let nextGrid = Array.from({length: R}, () => Array(C).fill('O'));
        for (let i = 0; i < R; i++) {
            for (let j = 0; j < C; j++) {
                if (currGrid[i][j] === 'O') {
                    nextGrid[i][j] = '.';
                    if (i > 0) nextGrid[i-1][j] = '.';
                    if (i < R-1) nextGrid[i+1][j] = '.';
                    if (j > 0) nextGrid[i][j-1] = '.';
                    if (j < C-1) nextGrid[i][j+1] = '.';
                }
            }
        }
        return nextGrid.map(row => row.join(''));
    }

    // After n=2 all filled with bombs
    if (n % 2 === 0) return Array(R).fill('O'.repeat(C));

    // Odd, so it cycles: detonate once or twice
    const firstDetonate = detonate(grid);
    const secondDetonate = detonate(firstDetonate);

    return n % 4 === 3 ? firstDetonate : secondDetonate;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r = parseInt(firstMultipleInput[0], 10);

    const c = parseInt(firstMultipleInput[1], 10);

    const n = parseInt(firstMultipleInput[2], 10);

    let grid = [];

    for (let i = 0; i < r; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = bomberMan(n, grid);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
