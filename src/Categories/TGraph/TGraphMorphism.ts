import { GraphCat } from './../Graph/GraphCat';
import { TCatMorphism } from './../TCat/TCatMorphism';
import { Graph } from '../Graph/Graph';
export class TGraphMorphism<ObjectType, EdgeType> extends TCatMorphism<Graph<ObjectType, EdgeType>, GraphCat<ObjectType,EdgeType>>{}