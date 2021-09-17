import { Cat } from './../Cat/Cat';
import { TCat } from './TCat';
import { Arrow } from "../Cat/Arrow";


export class TCatMorphism<tcatobj,tcat extends Cat<tcatobj>> implements Arrow<TCat<tcatobj,tcat>>{
    src: TCat<tcatobj,tcat>;
    trg: TCat<tcatobj,tcat>;
    objectArrow: Arrow<tcatobj>;
    typeArrow: Arrow<tcatobj>;
    constructor(srcObj: TCat<tcatobj,tcat>, trgObj: TCat<tcatobj,tcat>, objectMap: Arrow<tcatobj>, typeMap: Arrow<tcatobj>) {
        this.src = srcObj;
        this.trg = trgObj;
        this.objectArrow = objectMap;
        this.typeArrow = typeMap;
    }
    then(g: Arrow<TCat<tcatobj, tcat>>): Arrow<TCat<tcatobj, tcat>> {
        const tnodeMap = this.objectArrow.then((g as TCatMorphism<tcatobj,tcat>).objectArrow);
        const tedgeMap = this.typeArrow.then((g as TCatMorphism<tcatobj,tcat>).typeArrow);
        return new TCatMorphism<tcatobj,tcat>(this.src, g.trg, tnodeMap, tedgeMap);
    }
    equals(g: Arrow<TCat<tcatobj, tcat>>): boolean {
        return this.src.equals(g.src) && this.trg.equals(g.trg) && this.objectArrow.equals((g as TCatMorphism<tcatobj,tcat>).objectArrow) && this.typeArrow.equals((g as TCatMorphism<tcatobj,tcat>).typeArrow);
    }
}