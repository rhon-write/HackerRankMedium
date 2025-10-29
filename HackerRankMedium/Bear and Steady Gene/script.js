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
 * Complete the 'steadyGene' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING gene as parameter.
 */

function steadyGene(gene) {
    const n = gene.length;
    const need = n / 4;
    const count = {A:0, C:0, G:0, T:0};

    // Count initial frequency
    for (let char of gene) count[char]++;

    // If all are already steady, no replacement needed.
    if (Object.values(count).every(c => c === need)) return 0;

    let minLen = n;
    let left = 0;
    // Try to shrink window [left, right]
    for (let right = 0; right < n; right++) {
        count[gene[right]]--;
        while (
            count['A'] <= need &&
            count['C'] <= need &&
            count['G'] <= need &&
            count['T'] <= need &&
            left <= right
        ) {
            minLen = Math.min(minLen, right - left + 1);
            count[gene[left]]++;
            left++;
        }
    }
    return minLen;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const gene = readLine();

    const result = steadyGene(gene);

    ws.write(result + '\n');

    ws.end();
}
