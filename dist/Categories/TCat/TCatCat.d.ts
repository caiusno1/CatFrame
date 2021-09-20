import { Arrow } from './../Cat/Arrow';
import { TCatMorphism } from './TCatMorphism';
import { TCat } from './TCat';
import { Cat } from '../Cat/Cat';
export declare class TCatCat<catobj, cat extends Cat<catobj>> implements Cat<TCat<catobj, cat>> {
    id: (obj: TCat<catobj, cat>) => TCatMorphism<catobj, cat>;
    baseCategory: cat;
    constructor(a: cat);
    mergeArrow(a: TCatMorphism<catobj, cat>, b: TCatMorphism<catobj, cat>): TCatMorphism<catobj, cat>;
    coproduct(a: TCat<catobj, cat>, b: TCat<catobj, cat>): [TCatMorphism<catobj, cat>, TCatMorphism<catobj, cat>];
    closeTriangle(f: TCatMorphism<catobj, cat>, g: TCatMorphism<catobj, cat>): TCatMorphism<catobj, cat>;
    coequalizer(a: TCatMorphism<catobj, cat>, b: TCatMorphism<catobj, cat>): TCatMorphism<catobj, cat>;
    pushout(f: TCatMorphism<catobj, cat>, g: TCatMorphism<catobj, cat>): Arrow<TCat<catobj, cat>>[];
}
