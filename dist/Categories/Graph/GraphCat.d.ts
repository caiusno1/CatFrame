import { GraphMorphism } from './GraphMorphism';
import { Cat } from './../Cat/Cat';
import { Graph } from './Graph';
import { GraphArrowRepresentation } from './GraphArrowRepresentation';
import { GraphRepresentation } from './GraphRepresentation';
export declare class GraphCat<ObjectType, EdgeType> implements Cat<Graph<ObjectType, EdgeType>> {
    private readonly compareObj;
    private readonly compareEdge;
    private readonly nodeCat;
    private readonly edgeCat;
    constructor(objcomp: any, edgecomp: any, mode?: "structureMap" | "productionMap");
    mergeArrow(a: GraphMorphism<ObjectType, EdgeType>, b: GraphMorphism<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>;
    closeTriangle(f: GraphMorphism<ObjectType, EdgeType>, g: GraphMorphism<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>;
    id(obj: Graph<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>;
    then(f: GraphMorphism<ObjectType, EdgeType>, g: GraphMorphism<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>;
    createObject(): GraphRepresentation<ObjectType, EdgeType>;
    createMorphism(): GraphArrowRepresentation<ObjectType, EdgeType>;
    coproduct(F: Graph<ObjectType, EdgeType>, G: Graph<ObjectType, EdgeType>): [GraphMorphism<ObjectType, EdgeType>, GraphMorphism<ObjectType, EdgeType>];
    coequalizer(f: GraphMorphism<ObjectType, EdgeType>, g: GraphMorphism<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>;
    pushout(f: GraphMorphism<ObjectType, EdgeType>, g: GraphMorphism<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>[];
}
