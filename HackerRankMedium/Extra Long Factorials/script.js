'use strict';

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
 * Complete the 'extraLongFactorials' function below.
 *
 * The function accepts INTEGER n as parameter.
 */

function extraLongFactorials(n) {
    // Write your code here
    let result = [1];

    for (let i = 2; i <= n; i++) {
        let carry = 0;
        for (let j = 0; j < result.length; j++) {
            let product = result[j] * i + carry;
            result[j] = product % 10;
            carry = Math.floor(product / 10);
        }
        while (carry > 0) {
            result.push(carry % 10);
            carry = Math.floor(carry / 10);
        }
    }

    console.log(result.reverse().join(''));
}

function main() {
    const n = parseInt(readLine().trim(), 10);

    extraLongFactorials(n);
}
