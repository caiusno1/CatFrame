import { CatTriple } from './CatTriple';
import { Cat } from './../Cat/Cat';
import { Arrow } from "../Cat/Arrow";
export declare class TripleMorphism<catobj, tcats extends Cat<catobj>> implements Arrow<CatTriple<catobj, tcats>> {
    leftMorphArrow: Arrow<catobj>;
    middleMorphArrow: Arrow<catobj>;
    rightMorphArrow: Arrow<catobj>;
    constructor(src: CatTriple<catobj, tcats>, trg: CatTriple<catobj, tcats>, leftMap: Arrow<catobj>, rightMap: Arrow<catobj>, middleMap: Arrow<catobj>);
    src: CatTriple<catobj, tcats>;
    trg: CatTriple<catobj, tcats>;
    then(g: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats>;
    equals(g: TripleMorphism<catobj, tcats>): boolean;
}
