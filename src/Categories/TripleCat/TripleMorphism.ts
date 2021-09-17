import { TripleCat } from './TripleCat';
import { CatTriple } from './CatTriple';
import { Cat } from './../Cat/Cat';
import { Arrow } from "../Cat/Arrow";

export class TripleMorphism<catobj,tcats extends Cat<catobj>> implements Arrow<CatTriple<catobj,tcats>>{
    leftMorphArrow: Arrow<catobj>;
    middleMorphArrow: Arrow<catobj>;
    rightMorphArrow: Arrow<catobj>;
    constructor(src: CatTriple<catobj,tcats>,trg: CatTriple<catobj,tcats>,leftMap: Arrow<catobj>, rightMap: Arrow<catobj>, middleMap: Arrow<catobj>) {
        this.leftMorphArrow = leftMap;
        this.middleMorphArrow = middleMap;
        this.rightMorphArrow = rightMap;
        this.src = src;
        this.trg = trg;
    }
    src: CatTriple<catobj, tcats>;
    trg: CatTriple<catobj, tcats>;
    then(g: TripleMorphism<catobj,tcats>): TripleMorphism<catobj,tcats> {
        const leftMap = this.leftMorphArrow.then(g.leftMorphArrow);
        const rightMap = this.rightMorphArrow.then(g.rightMorphArrow);
        const middleMap = this.middleMorphArrow.then(g.middleMorphArrow);
        return new TripleMorphism<catobj,tcats>(this.src,g.trg,leftMap, rightMap, middleMap);
    }
    equals(g: TripleMorphism<catobj,tcats>): boolean {
        return this.leftMorphArrow.equals(g.leftMorphArrow) && this.rightMorphArrow.equals(g.rightMorphArrow) && this.middleMorphArrow.equals(this.middleMorphArrow)
    }
}