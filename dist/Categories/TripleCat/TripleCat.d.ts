import { Cat } from './../Cat/Cat';
import { TripleMorphism } from './TripleMorphism';
import { CatTriple } from './CatTriple';
export declare class TripleCat<catobj, tcats extends Cat<catobj>> implements Cat<CatTriple<catobj, tcats>> {
    id: (obj: CatTriple<catobj, tcats>) => TripleMorphism<catobj, tcats>;
    baseCategory: tcats;
    leftCat: catobj;
    rightCat: catobj;
    middleCat: catobj;
    constructor(baseCat: tcats);
    mergeArrow(a: TripleMorphism<catobj, tcats>, b: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats>;
    coproduct(a: CatTriple<catobj, tcats>, b: CatTriple<catobj, tcats>): [TripleMorphism<catobj, tcats>, TripleMorphism<catobj, tcats>];
    coequalizer(a: TripleMorphism<catobj, tcats>, b: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats>;
    pushout(f: TripleMorphism<catobj, tcats>, g: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats>[];
    closeTriangle(f: TripleMorphism<catobj, tcats>, g: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats>;
}
