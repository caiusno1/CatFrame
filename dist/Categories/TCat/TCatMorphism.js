"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCatMorphism = void 0;
class TCatMorphism {
    constructor(srcObj, trgObj, objectMap, typeMap) {
        this.src = srcObj;
        this.trg = trgObj;
        this.objectArrow = objectMap;
        this.typeArrow = typeMap;
    }
    then(g) {
        const tnodeMap = this.objectArrow.then(g.objectArrow);
        const tedgeMap = this.typeArrow.then(g.typeArrow);
        return new TCatMorphism(this.src, g.trg, tnodeMap, tedgeMap);
    }
    equals(g) {
        return this.src.equals(g.src) && this.trg.equals(g.trg) && this.objectArrow.equals(g.objectArrow) && this.typeArrow.equals(g.typeArrow);
    }
}
exports.TCatMorphism = TCatMorphism;
