export interface Node{
    id: string;
    heuristic: number;
    neighbors: string [];
}
export interface Edge{
    id: string;
    from: string;
    to: string;
}
export interface Graph{
    nodes: Record<string, Node>
    edges: Edge[]
    startNode: string;
    endNode: string;
}

export interface OpenNode{
  id: string;
  heuristic: number;
}
export interface Step{
    current: string | null;
    L: OpenNode[];
    D: string[];
    path: string[]; 
}
