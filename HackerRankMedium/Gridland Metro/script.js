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
 * Complete the 'gridlandMetro' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER m
 *  3. INTEGER k
 *  4. 2D_INTEGER_ARRAY track
 */

function gridlandMetro(n, m, k, track) {
  const rows = new Map();

  // Step 1: Group tracks by row
  for (let i = 0; i < k; i++) {
    const [r, c1, c2] = track[i];
    if (!rows.has(r)) rows.set(r, []);
    rows.get(r).push([Math.min(c1, c2), Math.max(c1, c2)]);
  }

  let occupied = 0n; // BigInt

  // Step 2: Merge intervals per row
  for (const intervals of rows.values()) {
    intervals.sort((a, b) => a[0] - b[0]);
    let [start, end] = intervals[0];

    for (let i = 1; i < intervals.length; i++) {
      const [currStart, currEnd] = intervals[i];
      if (currStart <= end) {
        end = Math.max(end, currEnd);
      } else {
        occupied += BigInt(end - start + 1);
        [start, end] = [currStart, currEnd];
      }
    }
    occupied += BigInt(end - start + 1);
  }

  // Step 3: Total cells - occupied cells (use BigInt math)
  const total = BigInt(n) * BigInt(m);
  return (total - occupied).toString(); // return as string to avoid BigInt serialization issue
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const k = parseInt(firstMultipleInput[2], 10);

    let track = Array(k);

    for (let i = 0; i < k; i++) {
        track[i] = readLine().replace(/\s+$/g, '').split(' ').map(trackTemp => parseInt(trackTemp, 10));
    }

    const result = gridlandMetro(n, m, k, track);

    ws.write(result + '\n');

    ws.end();
}
