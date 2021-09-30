"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripleMorphism = void 0;
class TripleMorphism {
    constructor(src, trg, leftMap, rightMap, middleMap) {
        this.leftMorphArrow = leftMap;
        this.middleMorphArrow = middleMap;
        this.rightMorphArrow = rightMap;
        this.src = src;
        this.trg = trg;
    }
    then(g) {
        const leftMap = this.leftMorphArrow.then(g.leftMorphArrow);
        const rightMap = this.rightMorphArrow.then(g.rightMorphArrow);
        const middleMap = this.middleMorphArrow.then(g.middleMorphArrow);
        return new TripleMorphism(this.src, g.trg, leftMap, rightMap, middleMap);
    }
    equals(g) {
        return this.leftMorphArrow.equals(g.leftMorphArrow) && this.rightMorphArrow.equals(g.rightMorphArrow) && this.middleMorphArrow.equals(this.middleMorphArrow);
    }
}
exports.TripleMorphism = TripleMorphism;
