import { TripleMorphism } from '../TripleCat/TripleMorphism';
import { TGraph } from '../TGraph/TGraph';
import { TGraphCat } from '../TGraph/TGraphCat';
export declare class TypedTripleGraphMorphism<ObjectType, EdgeType> extends TripleMorphism<TGraph<ObjectType, EdgeType>, TGraphCat<ObjectType, EdgeType>> {
}
