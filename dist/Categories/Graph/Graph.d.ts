import { CatSet } from '../Set/CatSet';
export declare class Graph<ObjectType, EdgeType> {
    nodeSet: CatSet<ObjectType>;
    edgeSet: CatSet<EdgeType>;
    src: Map<EdgeType, ObjectType>;
    trg: Map<EdgeType, ObjectType>;
    equals(graph: Graph<ObjectType, EdgeType>): boolean;
}
