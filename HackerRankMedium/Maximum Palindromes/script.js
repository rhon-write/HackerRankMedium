'use strict';

const fs = require('fs');
const MOD = 1000000007n;
const ALPHA = 26;

let s;
let prefix = [];
let fact = [];
let invFact = [];

// Fast modular exponentiation (BigInt)
function modPow(a, b, mod) {
    a = BigInt(a) % mod;
    let res = 1n;
    b = BigInt(b);
    while (b > 0n) {
        if (b & 1n) res = (res * a) % mod;
        a = (a * a) % mod;
        b >>= 1n;
    }
    return res;
}

// Modular inverse (Fermat's little theorem)
function modInv(a) {
    return modPow(a, MOD - 2n, MOD);
}

// --- Initialize prefix and factorial arrays ---
function initialize(string) {
    s = string;
    const n = s.length;

    // Build prefix frequency for each letter
    prefix = Array.from({ length: n + 1 }, () => Array(ALPHA).fill(0));
    for (let i = 1; i <= n; i++) {
        const ch = s.charCodeAt(i - 1) - 97;
        for (let j = 0; j < ALPHA; j++) prefix[i][j] = prefix[i - 1][j];
        prefix[i][ch]++;
    }

    // Precompute factorials and modular inverses up to n
    fact = Array(n + 1).fill(1n);
    invFact = Array(n + 1).fill(1n);
    for (let i = 1; i <= n; i++) fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
    invFact[n] = modInv(fact[n]);
    for (let i = n - 1; i >= 0; i--) invFact[i] = (invFact[i + 1] * BigInt(i + 1)) % MOD;
}

// --- Answer a single query ---
function answerQuery(l, r) {
    const count = Array(ALPHA).fill(0);
    for (let j = 0; j < ALPHA; j++) count[j] = prefix[r][j] - prefix[l - 1][j];

    let pairs = 0;
    let odds = 0;
    for (const c of count) {
        pairs += Math.floor(c / 2);
        if (c % 2) odds++;
    }

    // Compute combinations for half of the palindrome
    let result = fact[pairs];
    for (const c of count) {
        if (c >= 2) result = (result * invFact[Math.floor(c / 2)]) % MOD;
    }

    if (odds > 0) result = (result * BigInt(odds)) % MOD;

    return Number(result);
}

// --- HackerRank Main ---
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const s = readLine();
    initialize(s);

    const q = parseInt(readLine().trim(), 10);
    for (let qItr = 0; qItr < q; qItr++) {
        const [l, r] = readLine().trim().split(' ').map(Number);
        const result = answerQuery(l, r);
        ws.write(result + '\n');
    }
    ws.end();
}

// --- HackerRank I/O boilerplate ---
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