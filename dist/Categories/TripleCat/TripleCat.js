"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripleCat = void 0;
const TripleMorphism_1 = require("./TripleMorphism");
const CatTriple_1 = require("./CatTriple");
// TODO test
class TripleCat {
    constructor(baseCat) {
        this.baseCategory = baseCat;
        this.id = (obj) => new TripleMorphism_1.TripleMorphism(obj, obj, this.baseCategory.id(obj.getLeftObject()), this.baseCategory.id(obj.getRightObject()), this.baseCategory.id(obj.getLeftObject()));
    }
    mergeArrow(a, b) {
        const leftMerge = this.baseCategory.mergeArrow(a.leftMorphArrow, b.leftMorphArrow);
        const midMerge = this.baseCategory.mergeArrow(a.middleMorphArrow, b.middleMorphArrow);
        const rightMerge = this.baseCategory.mergeArrow(a.rightMorphArrow, b.rightMorphArrow);
        const src = this.coproduct(a.src, b.src)[0].trg;
        const trg = this.coproduct(a.trg, b.trg)[0].trg;
        return new TripleMorphism_1.TripleMorphism(src, trg, leftMerge, rightMerge, midMerge);
    }
    coproduct(a, b) {
        const leftCoProd = this.baseCategory.coproduct(a.getLeftObject(), b.getLeftObject());
        const midCoProd = this.baseCategory.coproduct(a.getMiddleObject(), b.getMiddleObject());
        const rightCoProd = this.baseCategory.coproduct(a.getRightObject(), b.getRightObject());
        const trg = new CatTriple_1.CatTriple(this.baseCategory.closeTriangle(a.getLeftArrow().then(leftCoProd[0]), midCoProd[0]), this.baseCategory.closeTriangle(a.getRightArrow().then(rightCoProd[0]), midCoProd[0]));
        return [new TripleMorphism_1.TripleMorphism(a, trg, leftCoProd[0], rightCoProd[0], midCoProd[0]), new TripleMorphism_1.TripleMorphism(b, trg, leftCoProd[1], rightCoProd[1], midCoProd[1])];
    }
    coequalizer(a, b) {
        const leftcoeq = this.baseCategory.coequalizer(a.leftMorphArrow, b.leftMorphArrow);
        const midcoeq = this.baseCategory.coequalizer(a.middleMorphArrow, b.middleMorphArrow);
        const rightcoeq = this.baseCategory.coequalizer(a.rightMorphArrow, b.rightMorphArrow);
        const trgleft = this.baseCategory.closeTriangle(midcoeq, a.trg.getLeftArrow().then(leftcoeq));
        const trgright = this.baseCategory.closeTriangle(midcoeq, a.trg.getRightArrow().then(rightcoeq));
        const trg = new CatTriple_1.CatTriple(trgleft, trgright);
        return new TripleMorphism_1.TripleMorphism(a.trg, trg, leftcoeq, rightcoeq, midcoeq);
    }
    pushout(f, g) {
        const coproduct = this.coproduct(f.trg, g.trg);
        const equal = this.coequalizer(coproduct[0], coproduct[1]);
        return [coproduct[0].then(equal),
            coproduct[1].then(equal)];
    }
    closeTriangle(f, g) {
        if (!f.src.equals(g.src)) {
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fleft = f.leftMorphArrow;
        const fright = f.rightMorphArrow;
        const fmid = f.middleMorphArrow;
        const gleft = f.leftMorphArrow;
        const gright = f.rightMorphArrow;
        const gmid = f.middleMorphArrow;
        const hleft = this.baseCategory.closeTriangle(fleft, gleft);
        const hright = this.baseCategory.closeTriangle(fright, gright);
        const hmid = this.baseCategory.closeTriangle(fmid, gmid);
        return new TripleMorphism_1.TripleMorphism(g.trg, f.trg, hleft, hright, hmid);
    }
}
exports.TripleCat = TripleCat;
