import { Cat } from './../Cat/Cat';
import { TripleMorphism } from './TripleMorphism';
import { CatTriple } from './CatTriple';

// TODO test

export class TripleCat<catobj,tcats extends Cat<catobj>> implements Cat<CatTriple<catobj,tcats>>{
    id: (obj: CatTriple<catobj,tcats>) => TripleMorphism<catobj,tcats>;
    baseCategory: tcats;
    leftCat: catobj
    rightCat: catobj
    middleCat: catobj
    constructor(baseCat: tcats) {
        this.baseCategory = baseCat;
        this.id = (obj: CatTriple<catobj,tcats>) => new TripleMorphism(obj,obj,this.baseCategory.id(obj.getLeftObject()),this.baseCategory.id(obj.getRightObject()),this.baseCategory.id(obj.getLeftObject()));
    }
    mergeArrow(a: TripleMorphism<catobj, tcats>, b: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats>{
        const leftMerge = this.baseCategory.mergeArrow(a.leftMorphArrow,b.leftMorphArrow);
        const midMerge = this.baseCategory.mergeArrow(a.middleMorphArrow,b.middleMorphArrow);
        const rightMerge = this.baseCategory.mergeArrow(a.rightMorphArrow,b.rightMorphArrow);

        const src = this.coproduct(a.src,b.src)[0].trg;
        const trg = this.coproduct(a.trg,b.trg)[0].trg;

        return new TripleMorphism(src,trg,leftMerge,rightMerge,midMerge);
    }
    coproduct(a: CatTriple<catobj, tcats>, b: CatTriple<catobj, tcats>): [TripleMorphism<catobj, tcats>, TripleMorphism<catobj, tcats>]{
        const leftCoProd = this.baseCategory.coproduct(a.getLeftObject(),b.getLeftObject());
        const midCoProd = this.baseCategory.coproduct(a.getMiddleObject(),b.getMiddleObject());
        const rightCoProd = this.baseCategory.coproduct(a.getRightObject(),b.getRightObject());

        const trg = new CatTriple<catobj,tcats>(this.baseCategory.closeTriangle(a.getLeftArrow().then(leftCoProd[0]),midCoProd[0]),this.baseCategory.closeTriangle(a.getRightArrow().then(rightCoProd[0]),midCoProd[0]))

        return [new TripleMorphism<catobj,tcats>(a,trg,leftCoProd[0],rightCoProd[0],midCoProd[0]),new TripleMorphism(b,trg,leftCoProd[1],rightCoProd[1],midCoProd[1])]
    }
    coequalizer(a: TripleMorphism<catobj, tcats>, b: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats>{
        const leftcoeq = this.baseCategory.coequalizer(a.leftMorphArrow,b.leftMorphArrow);
        const midcoeq = this.baseCategory.coequalizer(a.middleMorphArrow,b.middleMorphArrow);
        const rightcoeq = this.baseCategory.coequalizer(a.rightMorphArrow,b.rightMorphArrow);

        const trgleft = this.baseCategory.closeTriangle(midcoeq,a.trg.getLeftArrow().then(leftcoeq))
        const trgright = this.baseCategory.closeTriangle(midcoeq,a.trg.getRightArrow().then(rightcoeq))
        const trg = new CatTriple(trgleft,trgright)
        return new TripleMorphism(a.trg,trg,leftcoeq,rightcoeq,midcoeq)
    }
    pushout(f: TripleMorphism<catobj,tcats>, g: TripleMorphism<catobj,tcats>){
        const coproduct = this.coproduct(f.trg,g.trg);
        const equal = this.coequalizer(coproduct[0],coproduct[1])
        return [coproduct[0].then(equal),
        coproduct[1].then(equal)]
    }
    closeTriangle(f: TripleMorphism<catobj, tcats>, g: TripleMorphism<catobj, tcats>): TripleMorphism<catobj, tcats> {
        if(!f.src.equals(g.src)){
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fleft = f.leftMorphArrow;
        const fright = f.rightMorphArrow;
        const fmid = f.middleMorphArrow;

        const gleft = f.leftMorphArrow;
        const gright = f.rightMorphArrow;
        const gmid = f.middleMorphArrow;

        const hleft = this.baseCategory.closeTriangle(fleft,gleft);
        const hright = this.baseCategory.closeTriangle(fright,gright);
        const hmid = this.baseCategory.closeTriangle(fmid,gmid);

        return new TripleMorphism(g.trg,f.trg,hleft,hright,hmid);
    }
}