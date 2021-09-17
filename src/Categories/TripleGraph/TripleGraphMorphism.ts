import { TripleMorphism } from './../TripleCat/TripleMorphism';
import { GraphCat } from '../Graph/GraphCat';
import { Graph } from '../Graph/Graph';
export class TripleGraphMorphism<ObjectType, EdgeType> extends TripleMorphism<Graph<ObjectType, EdgeType>, GraphCat<ObjectType,EdgeType>>{}