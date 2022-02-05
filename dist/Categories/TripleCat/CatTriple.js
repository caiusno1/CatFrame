"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatTriple = void 0;
class CatTriple {
    constructor(left, right) {
        this.catMorphLeft = left;
        this.catMorphRight = right;
        if (!left.src.equals(right.src)) {
            throw new Error("Inconsistent instanciation");
        }
    }
    getLeftObject() {
        return this.catMorphLeft.trg;
    }
    getRightObject() {
        return this.catMorphRight.trg;
    }
    getMiddleObject() {
        return this.catMorphLeft.src;
    }
    getLeftArrow() {
        return this.catMorphLeft;
    }
    getRightArrow() {
        return this.catMorphRight;
    }
    equals(cat) {
        return this.catMorphLeft.equals(cat.catMorphLeft) && this.catMorphRight.equals(cat.catMorphRight);
    }
}
exports.CatTriple = CatTriple;
