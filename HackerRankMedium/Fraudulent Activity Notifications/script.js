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
 * Complete the 'activityNotifications' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY expenditure
 *  2. INTEGER d
 */

function activityNotifications(expenditure, d) {
    let notifications = 0;
    const count = new Array(201).fill(0);

    // Initialize counting sort for the first d days
    for (let i = 0; i < d; i++) {
        count[expenditure[i]]++;
    }

    function getMedian(count, d) {
        let sum = 0;
        if (d % 2 === 1) {
            const mid = Math.floor(d / 2) + 1;
            for (let i = 0; i < count.length; i++) {
                sum += count[i];
                if (sum >= mid) {
                    return i;
                }
            }
        } else {
            let mid1 = Math.floor(d / 2);
            let mid2 = mid1 + 1;
            let m1 = null, m2 = null;
            for (let i = 0; i < count.length; i++) {
                sum += count[i];
                if (m1 === null && sum >= mid1) m1 = i;
                if (m2 === null && sum >= mid2) {
                    m2 = i;
                    break;
                }
            }
            return (m1 + m2) / 2;
        }
    }

    for (let i = d; i < expenditure.length; i++) {
        let median = getMedian(count, d);
        if (expenditure[i] >= 2 * median) {
            notifications++;
        }
        // Update counting sort
        count[expenditure[i - d]]--;
        count[expenditure[i]]++;
    }

    return notifications;
}


function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const d = parseInt(firstMultipleInput[1], 10);

    const expenditure = readLine().replace(/\s+$/g, '').split(' ').map(expenditureTemp => parseInt(expenditureTemp, 10));

    const result = activityNotifications(expenditure, d);

    ws.write(result + '\n');

    ws.end();
}
