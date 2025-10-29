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
 * Complete the 'encryption' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function encryption(s) {
    // Write your code here
    s = s.replace(/ /g, ''); // Remove spaces
    const L = s.length;
    const rows = Math.floor(Math.sqrt(L));
    const cols = Math.ceil(Math.sqrt(L));
    let r = rows, c = cols;
    if (r * c < L) r++;

    let result = [];
    for (let i = 0; i < c; i++) {
        let str = '';
        for (let j = 0; j < r; j++) {
            if (i + j * c < L) {
                str += s[i + j * c];
            }
        }
        result.push(str);
    }
    return result.join(' ');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const result = encryption(s);

    ws.write(result + '\n');

    ws.end();
}
