import { PriorityQueue } from '@datastructures-js/priority-queue';
import type { Graph, Step } from '../Type';

export default function bestFirstSearch(graph: Graph): Step[] {
    const { nodes, startNode, endNode } = graph;

    const L = new PriorityQueue<{
        id: string;
        path: string[];
        heuristic: number;
    }>((a, b) => a.heuristic - b.heuristic);

    L.enqueue({
        id: startNode,
        path: [startNode],
        heuristic: nodes[startNode].heuristic,
    });

    let D: string[] = [];
    let steps: Step[] = [];

    while (!L.isEmpty()) {
        const current = L.dequeue();
        if (!current) break;
        D.push(current.id);
        const neighbors = nodes[current.id]?.neighbors || [];
        for (const neighborId of neighbors) {
            const isInD = D.includes(neighborId);
            const isInL = L.toArray().some((x) => x.id === neighborId);
            if (nodes[neighborId] && !isInD && !isInL) {
                L.enqueue({
                    id: neighborId,
                    path: [...current.path, neighborId],
                    heuristic: nodes[neighborId].heuristic,
                });
            }
        }

        steps.push({
            current: current.id,
            L: L.toArray().map((x) => ({
                id: x.id,
                heuristic: x.heuristic,
            })),
            D: [...D],
            path: current.path,
        });

        if (current.id === endNode) break;
    }

    return steps;
}