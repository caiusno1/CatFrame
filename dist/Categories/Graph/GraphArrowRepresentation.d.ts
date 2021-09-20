import { GraphMorphism } from './GraphMorphism';
export declare class GraphArrowRepresentation<ObjectType, EdgeType> {
    constructor(f: GraphMorphism<ObjectType, EdgeType>);
    graphmorphism: GraphMorphism<ObjectType, EdgeType>;
    then(g: GraphArrowRepresentation<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>;
}
