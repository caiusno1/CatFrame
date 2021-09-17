import { GraphMorphism } from './GraphMorphism';
export class GraphArrowRepresentation<ObjectType,EdgeType>{
    constructor(f:GraphMorphism<ObjectType,EdgeType>){
        this.graphmorphism = f;
    }
    graphmorphism: GraphMorphism<ObjectType,EdgeType>
    then(g: GraphArrowRepresentation<ObjectType,EdgeType>){
        return this.graphmorphism.then(g.graphmorphism);
    }
}