import { CatTriple } from '../TripleCat/CatTriple';
import { GraphCat } from '../Graph/GraphCat';
import { Graph } from '../Graph/Graph';
export class TripleGraph<ObjectType, EdgeType> extends CatTriple<Graph<ObjectType,EdgeType>, GraphCat<ObjectType,EdgeType>>{}