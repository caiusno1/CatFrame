"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCatMorphism = void 0;
class TCatMorphism {
    constructor(srcObj, trgObj, objectMap) {
        this.src = srcObj;
        this.trg = trgObj;
        this.objectArrow = objectMap;
    }
    then(g) {
        const tnodeMap = this.objectArrow.then(g.objectArrow);
        return new TCatMorphism(this.src, g.trg, tnodeMap);
    }
    equals(g) {
        return this.src.equals(g.src) && this.trg.equals(g.trg) && this.objectArrow.equals(g.objectArrow);
    }
}
exports.TCatMorphism = TCatMorphism;
