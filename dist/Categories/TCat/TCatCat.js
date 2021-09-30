"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCatCat = void 0;
const TCatMorphism_1 = require("./TCatMorphism");
const TCat_1 = require("./TCat");
class TCatCat {
    constructor(a) {
        this.id = (obj) => {
            const objID = this.baseCategory.id(obj.getObject());
            const typeID = this.baseCategory.id(obj.getTypeObject());
            return new TCatMorphism_1.TCatMorphism(obj, obj, objID, typeID);
        };
        this.id = (obj) => new TCatMorphism_1.TCatMorphism(obj, obj, a.id(obj.getObject()), a.id(obj.getTypeObject()));
        this.baseCategory = a;
    }
    mergeArrow(a, b) {
        const objectArrow = this.baseCategory.mergeArrow(a.objectArrow, b.objectArrow);
        const typeArrow = this.baseCategory.mergeArrow(a.typeArrow, b.typeArrow);
        const src = this.coproduct(a.src, b.src)[0].trg;
        const trg = this.coproduct(a.trg, b.trg)[0].trg;
        return new TCatMorphism_1.TCatMorphism(src, trg, objectArrow, typeArrow);
    }
    coproduct(a, b) {
        const objInj = this.baseCategory.coproduct(a.getObject(), b.getObject());
        const typeobjInj = this.baseCategory.coproduct(a.getTypeObject(), b.getTypeObject());
        const typeMorph = this.baseCategory.mergeArrow(a.getTypeMorphism(), b.getTypeMorphism());
        const tcat = new TCat_1.TCat(typeMorph);
        return [
            new TCatMorphism_1.TCatMorphism(a, tcat, objInj[0], typeobjInj[0]),
            new TCatMorphism_1.TCatMorphism(b, tcat, objInj[1], typeobjInj[1])
        ];
    }
    closeTriangle(f, g) {
        if (!f.src.equals(g.src)) {
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fnodemap = f.objectArrow;
        const fedgemap = f.typeArrow;
        const gnodemap = g.objectArrow;
        const gedgemap = g.typeArrow;
        const hnodemap = this.baseCategory.closeTriangle(fnodemap, gnodemap);
        const hedgemap = this.baseCategory.closeTriangle(fedgemap, gedgemap);
        return new TCatMorphism_1.TCatMorphism(g.trg, f.trg, hnodemap, hedgemap);
    }
    coequalizer(a, b) {
        const morphobjectArrow = this.baseCategory.coequalizer(a.objectArrow, b.objectArrow);
        const morphtypeArrow = this.baseCategory.coequalizer(a.typeArrow, b.typeArrow);
        const objObj = morphobjectArrow.trg;
        const typeObj = morphtypeArrow.trg;
        // calculate arrow
        const internalTypeArrow = this.baseCategory.closeTriangle(a.trg.getTypeMorphism().then(morphtypeArrow), morphobjectArrow);
        const trgCat = new TCat_1.TCat(internalTypeArrow);
        return new TCatMorphism_1.TCatMorphism(a.trg, trgCat, morphobjectArrow, morphtypeArrow);
    }
    pushout(f, g) {
        const coproduct = this.coproduct(f.trg, g.trg);
        const equal = this.coequalizer(coproduct[0], coproduct[1]);
        return [coproduct[0].then(equal),
            coproduct[1].then(equal)];
    }
}
exports.TCatCat = TCatCat;
