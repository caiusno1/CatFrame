"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCatCat = void 0;
const TCatMorphism_1 = require("./TCatMorphism");
const TCat_1 = require("./TCat");
class TCatCat {
    constructor(a) {
        this.id = (obj) => {
            const objID = this.baseCategory.id(obj.getObject());
            return new TCatMorphism_1.TCatMorphism(obj, obj, objID);
        };
        this.id = (obj) => new TCatMorphism_1.TCatMorphism(obj, obj, a.id(obj.getObject()));
        this.baseCategory = a;
    }
    mergeArrow(a, b) {
        const objectArrow = this.baseCategory.mergeArrow(a.objectArrow, b.objectArrow);
        const src = this.coproduct(a.src, b.src)[0].trg;
        const trg = this.coproduct(a.trg, b.trg)[0].trg;
        return new TCatMorphism_1.TCatMorphism(src, trg, objectArrow);
    }
    coproduct(a, b) {
        if (a.getTypeObject() !== b.getTypeObject()) {
            throw new Error("Type object has to be the same");
        }
        const objInj = this.baseCategory.coproduct(a.getObject(), b.getObject());
        const typeMorph = this.baseCategory.mergeArrow(a.getTypeMorphism(), b.getTypeMorphism());
        const tcat = new TCat_1.TCat(typeMorph);
        return [
            new TCatMorphism_1.TCatMorphism(a, tcat, objInj[0]),
            new TCatMorphism_1.TCatMorphism(b, tcat, objInj[1])
        ];
    }
    closeTriangle(f, g) {
        if (!f.src.equals(g.src)) {
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fnodemap = f.objectArrow;
        const gnodemap = g.objectArrow;
        const hnodemap = this.baseCategory.closeTriangle(fnodemap, gnodemap);
        return new TCatMorphism_1.TCatMorphism(g.trg, f.trg, hnodemap);
    }
    coequalizer(a, b) {
        const morphobjectArrow = this.baseCategory.coequalizer(a.objectArrow, b.objectArrow);
        // calculate arrow
        const internalTypeArrow = this.baseCategory.closeTriangle(a.trg.getTypeMorphism(), morphobjectArrow);
        const trgCat = new TCat_1.TCat(internalTypeArrow);
        return new TCatMorphism_1.TCatMorphism(a.trg, trgCat, morphobjectArrow);
    }
    pushout(f, g) {
        const coproduct = this.coproduct(f.trg, g.trg);
        const equal = this.coequalizer(coproduct[0], coproduct[1]);
        return [coproduct[0].then(equal),
            coproduct[1].then(equal)];
    }
}
exports.TCatCat = TCatCat;
