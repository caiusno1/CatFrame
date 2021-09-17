import { TripleCat } from './../TripleCat/TripleCat';
import { GraphCat } from '../Graph/GraphCat';
import { Graph } from '../Graph/Graph';
export class TripleGraphCat<ObjectType, EdgeType> extends TripleCat<Graph<ObjectType,EdgeType>, GraphCat<ObjectType,EdgeType>>{}