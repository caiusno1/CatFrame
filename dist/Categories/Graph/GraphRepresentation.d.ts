import { Graph } from './Graph';
import { GraphMorphism } from './GraphMorphism';
export declare class GraphRepresentation<ObjectType, EdgeType> {
    private internalGraph;
    private nodeEq;
    private edgeEq;
    id: (obj: Graph<ObjectType, EdgeType>) => GraphMorphism<ObjectType, EdgeType>;
    constructor(objCmp: (obj1: ObjectType, obj2: ObjectType) => boolean, edgeCmp: (obj1: EdgeType, obj2: EdgeType) => boolean);
    createNode(node: ObjectType): void;
    createEdge(from: ObjectType, to: ObjectType, edge: EdgeType): void;
    getGraph(): Graph<ObjectType, EdgeType>;
    printGraph(): void;
}
