import { StructureMap } from './../../Helpers/StructureMap';
import { TotalFunction } from '../Set/TotalFunction';
import { Arrow } from "../Cat/Arrow";
import { Graph } from './Graph';
export declare class GraphMorphism<ObjectType, EdgeType> implements Arrow<Graph<ObjectType, EdgeType>> {
    src: Graph<ObjectType, EdgeType>;
    trg: Graph<ObjectType, EdgeType>;
    nodeArrow: TotalFunction<ObjectType>;
    edgeArrow: TotalFunction<EdgeType>;
    constructor(srcObj: Graph<ObjectType, EdgeType>, trgObj: Graph<ObjectType, EdgeType>, nodeMap: StructureMap<ObjectType> | TotalFunction<ObjectType>, edgeMap: StructureMap<EdgeType> | TotalFunction<EdgeType>);
    pconstructor1(srcObj: Graph<ObjectType, EdgeType>, trgObj: Graph<ObjectType, EdgeType>, nodeMap: StructureMap<ObjectType>, edgeMap: StructureMap<EdgeType>): void;
    pconstructor2(srcObj: Graph<ObjectType, EdgeType>, trgObj: Graph<ObjectType, EdgeType>, nodeMap: TotalFunction<ObjectType>, edgeMap: TotalFunction<EdgeType>): void;
    then(g: GraphMorphism<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>;
    equals(g: GraphMorphism<ObjectType, EdgeType>): boolean;
    apply(G: Graph<ObjectType, EdgeType>): Graph<{}, {}>;
}
