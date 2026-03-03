import type { Graph, Edge, Node } from "../Type";
export function parseInput(input: string): Graph | null {
    const lines = input
        .trim()
        .split("\n")
        .map((L) => L.trim())
        .filter(Boolean);
    if (lines.length < 2) return null;
    const startNode = lines[0];
    const endNode = lines[1];
    const nodes: Record<string, Node> = {};
    const edges: Edge[] = [];

    // sử dụng regex
    // for(let i = 2; i < lines.length; ++i){
    //     const match = lines[i].match(/^(\w+)\s*-\s*(\d+):\s*(.*)$/);
    //     if(!match) continue;
    //     const [, nodeId, h, neighborsStr] = match;
    //     const neighbors = neighborsStr ? neighborsStr.split(/\s+/).filter(Boolean) : [];
    //     nodes[nodeId] = {
    //         id: nodeId,
    //         heuristic: Number(h),
    //         neighbors
    //     };
    //     for(const neighbor of neighbors){
    //         edges.push({
    //             id: `${nodeId}_${neighbor}`,
    //             from: nodeId,
    //             to: neighbor
    //         });
    //     }
    // }
    for (let i = 2; i < lines.length; ++i) {
        const line = lines[i];

        const colonIndex = line.indexOf(":");
        if (colonIndex === -1) continue;

        const leftPart = line.substring(0, colonIndex);
        const rightPart = line.substring(colonIndex + 1).trim();

        const dashIndex = leftPart.indexOf("-");
        if (dashIndex === -1) continue;
        
        const nodeId = leftPart.substring(0, dashIndex).trim();
        const hStr = leftPart.substring(dashIndex + 1).trim();
        const h = Number(hStr);

        const neighbors = rightPart.split(/\s+/).filter(Boolean);

        nodes[nodeId] = {
            id: nodeId,
            heuristic: h,
            neighbors,
        };
    }
    return { nodes, edges, startNode, endNode };
}
