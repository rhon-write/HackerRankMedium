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
 * Complete the 'getCost' function below.
 *
 * The function accepts WEIGHTED_INTEGER_GRAPH g as parameter.
 */

/*
 * For the weighted graph, <name>:
 *
 * 1. The number of nodes is <name>Nodes.
 * 2. The number of edges is <name>Edges.
 * 3. An edge exists between <name>From[i] and <name>To[i]. The weight of the edge is <name>Weight[i].
 *
 */

function getCost(gNodes, gFrom, gTo, gWeight) {
    // Adjacency list
    const adj = Array.from({length: gNodes + 1}, () => []);
    for (let i = 0; i < gFrom.length; ++i) {
        adj[gFrom[i]].push([gTo[i], gWeight[i]]);
        adj[gTo[i]].push([gFrom[i], gWeight[i]]);
    }

    const INF = 1e18;
    const dist = Array(gNodes + 1).fill(INF);
    dist[1] = 0;

    // Min heap implementation for [cost,node]
    class MinHeap {
        constructor() { this.data = []; }
        push(x) {
            this.data.push(x);
            let i = this.data.length - 1;
            while (i && this.data[i][0] < this.data[(i-1)>>1][0]) {
                [this.data[i], this.data[(i-1)>>1]] = [this.data[(i-1)>>1], this.data[i]];
                i = (i-1)>>1;
            }
        }
        pop() {
            if (!this.data.length) return null;
            const top = this.data[0];
            const last = this.data.pop();
            if (this.data.length) {
                this.data[0] = last;
                let i = 0;
                while (true) {
                    let L = 2*i+1, R = 2*i+2, smallest = i;
                    if (L < this.data.length && this.data[L][0] < this.data[smallest][0]) smallest = L;
                    if (R < this.data.length && this.data[R][0] < this.data[smallest][0]) smallest = R;
                    if (smallest === i) break;
                    [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
                    i = smallest;
                }
            }
            return top;
        }
        size() { return this.data.length; }
    }

    const heap = new MinHeap();
    heap.push([0,1]);
    const visited = Array(gNodes + 1).fill(false);

    while (heap.size()) {
        const [cost, u] = heap.pop();
        if (visited[u]) continue;
        visited[u] = true;
        if (u === gNodes) break; // Found shortest!

        for (const [v, w] of adj[u]) {
            const newCost = Math.max(cost, w);
            if (!visited[v] && newCost < dist[v]) {
                dist[v] = newCost;
                heap.push([newCost, v]);
            }
        }
    }

    if (dist[gNodes] < INF) {
        console.log(dist[gNodes]);
    } else {
        console.log("NO PATH EXISTS");
    }
}


function main() {
    const gNodesEdges = readLine().split(' ');

    const gNodes = parseInt(gNodesEdges[0], 10);
    const gEdges = parseInt(gNodesEdges[1], 10);

    let gFrom = [];
    let gTo = [];
    let gWeight = [];

    for (let i = 0; i < gEdges; i++) {
        const gFromToWeight = readLine().split(' ');

        gFrom.push(parseInt(gFromToWeight[0], 10));
        gTo.push(parseInt(gFromToWeight[1], 10));
        gWeight.push(parseInt(gFromToWeight[2], 10));
    }

    getCost(gNodes, gFrom, gTo, gWeight);
}
