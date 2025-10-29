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
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function twoPluses(grid) {
    // Write your code here
    const n = grid.length, m = grid[0].length;
    // Find all possible pluses with their centers and arm size
    const pluses = [];
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < m; ++j) {
            if (grid[i][j] !== 'G') continue;
            let arm = 0;
            while (
                i - arm >= 0 && i + arm < n &&
                j - arm >= 0 && j + arm < m &&
                grid[i - arm][j] === 'G' &&
                grid[i + arm][j] === 'G' &&
                grid[i][j - arm] === 'G' &&
                grid[i][j + arm] === 'G'
            ) {
                pluses.push({i, j, arm, area: 1 + arm * 4});
                arm++;
            }
        }
    }

    let maxProduct = 0;

    function overlaps(a, b) {
        const occupied = new Set();
        for (let k = 0; k <= a.arm; ++k) {
            occupied.add(`${a.i + k},${a.j}`);
            occupied.add(`${a.i - k},${a.j}`);
            occupied.add(`${a.i},${a.j + k}`);
            occupied.add(`${a.i},${a.j - k}`);
        }
        for (let k = 0; k <= b.arm; ++k) {
            if (
                occupied.has(`${b.i + k},${b.j}`) ||
                occupied.has(`${b.i - k},${b.j}`) ||
                occupied.has(`${b.i},${b.j + k}`) ||
                occupied.has(`${b.i},${b.j - k}`)
            ) return true;
        }
        return false;
    }

    pluses.sort((a,b)=>b.area-a.area);

    for (let i = 0; i < pluses.length; ++i) {
        for (let j = i + 1; j < pluses.length; ++j) {
            if (!overlaps(pluses[i], pluses[j])) {
                maxProduct = Math.max(maxProduct, pluses[i].area * pluses[j].area);
                break; // Largest plus first = no need to check smaller for pluses[i]
            }
        }
    }
    return maxProduct;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = twoPluses(grid);

    ws.write(result + '\n');

    ws.end();
}
