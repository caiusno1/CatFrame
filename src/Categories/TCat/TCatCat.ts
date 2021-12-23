import { Arrow } from './../Cat/Arrow';
import { TCatMorphism } from './TCatMorphism';
import { TCat } from './TCat';
import { Cat } from '../Cat/Cat';

export class TCatCat<catobj,cat extends Cat<catobj>> implements Cat<TCat<catobj,cat>>{
    id = (obj: TCat<catobj,cat>) => {
        const objID = this.baseCategory.id(obj.getObject())
        return new TCatMorphism<catobj,cat>(obj,obj,objID)
    }
    baseCategory: cat;
    constructor(a:cat) {
        this.id = (obj) => new TCatMorphism(obj, obj, a.id(obj.getObject()))
        this.baseCategory = a;
    }
    mergeArrow(a: TCatMorphism<catobj,cat>, b: TCatMorphism<catobj,cat>): TCatMorphism<catobj,cat>{
        const objectArrow = this.baseCategory.mergeArrow(a.objectArrow,b.objectArrow);
        const src = this.coproduct(a.src,b.src)[0].trg;
        const trg = this.coproduct(a.trg,b.trg)[0].trg;
        return new TCatMorphism(src,trg,objectArrow)

    }
    coproduct(a:TCat<catobj, cat>,b:TCat<catobj, cat>): [TCatMorphism<catobj, cat>,TCatMorphism<catobj,cat>]{
        if(a.getTypeObject() !== b.getTypeObject()){
            throw new Error("Type object has to be the same")
        }
        const objInj = (this.baseCategory as any).coproduct(a.getObject(), b.getObject())
        const typeMorph = this.baseCategory.mergeArrow(a.getTypeMorphism(),b.getTypeMorphism())
        const tcat = new TCat(typeMorph);
        return [
            new TCatMorphism(a,tcat,objInj[0]),
            new TCatMorphism(b,tcat,objInj[1])
        ]
    }
    closeTriangle(f: TCatMorphism<catobj,cat>,g: TCatMorphism<catobj,cat>): TCatMorphism<catobj,cat>{
        if(!f.src.equals(g.src)){
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fnodemap = f.objectArrow;
        const gnodemap = g.objectArrow;

        const hnodemap = this.baseCategory.closeTriangle(fnodemap,gnodemap);
        return new TCatMorphism(g.trg,f.trg,hnodemap);
    }
    coequalizer(a:TCatMorphism<catobj, cat>,b:TCatMorphism<catobj, cat>): TCatMorphism<catobj, cat>{
        const morphobjectArrow = this.baseCategory.coequalizer(a.objectArrow,b.objectArrow);
        // calculate arrow
        const internalTypeArrow: Arrow<catobj> = this.baseCategory.closeTriangle(a.trg.getTypeMorphism(),morphobjectArrow);
        const trgCat = new TCat(internalTypeArrow)

        return new TCatMorphism(a.trg,trgCat,morphobjectArrow)
    }
    pushout(f: TCatMorphism<catobj,cat>, g: TCatMorphism<catobj,cat>){
        const coproduct = this.coproduct(f.trg,g.trg);
        const equal = this.coequalizer(coproduct[0],coproduct[1])
        return [coproduct[0].then(equal),
        coproduct[1].then(equal)]
    }
}