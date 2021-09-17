import { TGraphCat } from './../TGraph/TGraphCat';
import { TGraph } from './../TGraph/TGraph';
import { CatTriple } from '../TripleCat/CatTriple';
export class TypedTripleGraph<ObjectType, EdgeType> extends CatTriple<TGraph<ObjectType,EdgeType>, TGraphCat<ObjectType,EdgeType>>{}