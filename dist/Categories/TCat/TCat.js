"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TCat = void 0;
class TCat {
    constructor(ptypeMorphism) {
        this.typeMorphism = ptypeMorphism;
    }
    getObject() {
        return this.typeMorphism.src;
    }
    getTypeObject() {
        return this.typeMorphism.trg;
    }
    getTypeMorphism() {
        return this.typeMorphism;
    }
    equals(cat) {
        return this.typeMorphism.equals(cat.typeMorphism);
    }
}
exports.TCat = TCat;
