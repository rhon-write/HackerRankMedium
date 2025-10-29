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

function andProduct(a, b) {
    let x = BigInt(a);
    let y = BigInt(b);
    let shift = 0n;
    while (x !== y) {
        x >>= 1n;
        y >>= 1n;
        shift++;
    }
    return (x << shift).toString();
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);
    for (let tItr = 0; tItr < t; tItr++) {
        const [a, b] = readLine().replace(/\s+$/g, '').split(' ').map(Number);
        const result = andProduct(a, b);
        ws.write(result + '\n');
    }
    ws.end();
}
