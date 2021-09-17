import { StructureMap } from './../../Helpers/StructureMap';
import { Arrow } from './../Cat/Arrow';
import { CatBuilder } from './../../CatBuilder';
import { TCatMorphism } from './TCatMorphism';
import { TCat } from './TCat';
import { Cat } from '../Cat/Cat';

export class TCatCat<catobj,cat extends Cat<catobj>> implements Cat<TCat<catobj,cat>>{
    id = (obj: TCat<catobj,cat>) => {
        const objID = this.baseCategory.id(obj.getObject())
        const typeID = this.baseCategory.id(obj.getTypeObject())
        return new TCatMorphism<catobj,cat>(obj,obj,objID,typeID)
    }
    baseCategory: cat;
    constructor(a:cat) {
        this.id = (obj) => new TCatMorphism(obj, obj, a.id(obj.getObject()), a.id(obj.getTypeObject()));
        this.baseCategory = a;
    }
    mergeArrow(a: TCatMorphism<catobj,cat>, b: TCatMorphism<catobj,cat>): TCatMorphism<catobj,cat>{
        const objectArrow = this.baseCategory.mergeArrow(a.objectArrow,b.objectArrow);
        const typeArrow = this.baseCategory.mergeArrow(a.typeArrow,b.typeArrow);
        const src = this.coproduct(a.src,b.src)[0].trg;
        const trg = this.coproduct(a.trg,b.trg)[0].trg;
        return new TCatMorphism(src,trg,objectArrow,typeArrow)

    }
    coproduct(a:TCat<catobj, cat>,b:TCat<catobj, cat>): [TCatMorphism<catobj, cat>,TCatMorphism<catobj,cat>]{
        const objInj = (this.baseCategory as any).coproduct(a.getObject(), b.getObject())
        const typeobjInj = (this.baseCategory as any).coproduct(a.getTypeObject(), b.getTypeObject())
        const typeMorph = this.baseCategory.mergeArrow(a.getTypeMorphism(),b.getTypeMorphism())
        const tcat = new TCat(typeMorph);
        return [
            new TCatMorphism(
                a,tcat,objInj[0],
                typeobjInj[0]),
            new TCatMorphism(
                b,tcat,objInj[1],
                typeobjInj[1]
            )
        ]
    }
    closeTriangle(f: TCatMorphism<catobj,cat>,g: TCatMorphism<catobj,cat>): TCatMorphism<catobj,cat>{
        if(!f.src.equals(g.src)){
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fnodemap = f.objectArrow;
        const fedgemap = f.typeArrow;
        const gnodemap = g.objectArrow;
        const gedgemap = g.typeArrow;

        const hnodemap = this.baseCategory.closeTriangle(fnodemap,gnodemap);
        const hedgemap =this.baseCategory.closeTriangle(fedgemap,gedgemap);
        return new TCatMorphism(g.trg,f.trg,hnodemap,hedgemap);
    }
    coequalizer(a:TCatMorphism<catobj, cat>,b:TCatMorphism<catobj, cat>): TCatMorphism<catobj, cat>{
        const morphobjectArrow = this.baseCategory.coequalizer(a.objectArrow,b.objectArrow);
        const morphtypeArrow = this.baseCategory.coequalizer(a.typeArrow,b.typeArrow);

        const objObj = morphobjectArrow.trg
        const typeObj = morphtypeArrow.trg
        // calculate arrow
        const internalTypeArrow: Arrow<catobj> = this.baseCategory.closeTriangle(a.trg.getTypeMorphism().then(morphtypeArrow),morphobjectArrow);
        const trgCat = new TCat(internalTypeArrow)

        return new TCatMorphism(a.trg,trgCat,morphobjectArrow,morphtypeArrow)
    }
    pushout(f: TCatMorphism<catobj,cat>, g: TCatMorphism<catobj,cat>){
        const coproduct = this.coproduct(f.trg,g.trg);
        const equal = this.coequalizer(coproduct[0],coproduct[1])
        return [coproduct[0].then(equal),
        coproduct[1].then(equal)]
    }
}