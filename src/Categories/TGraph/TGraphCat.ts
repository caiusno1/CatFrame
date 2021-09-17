import { GraphCat } from './../Graph/GraphCat';
import { Graph } from './../Graph/Graph';
import { TCatCat } from './../TCat/TCatCat';
export class TGraphCat<ObjectType, EdgeType> extends TCatCat<Graph<ObjectType,EdgeType>, GraphCat<ObjectType,EdgeType>>{}