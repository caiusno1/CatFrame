import { GraphCat } from './../Graph/GraphCat';
import { TCat } from '../TCat/TCat';
import { Graph } from '../Graph/Graph';
export class TGraph<ObjectType, EdgeType> extends TCat<Graph<ObjectType,EdgeType>, GraphCat<ObjectType,EdgeType>>{}