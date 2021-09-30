"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatSet = void 0;
class CatSet extends Array {
    constructor(objcomparer, ...elements) {
        if (elements.length > 1 || elements.length < 1) {
            super(...elements);
        }
        else {
            super();
            this.push(elements[0]);
        }
        this.compare = objcomparer;
    }
    equals(b) {
        if (this.length !== b.length) {
            return false;
        }
        const set1Vals = Array.from(this.values());
        const set2Vals = Array.from(b.values());
        if (set1Vals.every((anElement) => set2Vals.some((arrayElement) => this.compare(anElement, arrayElement)))) {
            return true;
        }
        return false;
    }
    isomorph(b) {
        return this.length === b.length;
    }
    enoughEqual(b) {
        const set1Vals = Array.from(this.values());
        const set2Vals = Array.from(b.values());
        if (set1Vals.every((anElement) => set2Vals.some((arrayElement) => this.compare(anElement, arrayElement)))) {
            return true;
        }
        return false;
    }
}
exports.CatSet = CatSet;
