"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructureMap = void 0;
/*
Can currently only handle flat objects and numbers
*/
class StructureMap {
    constructor(a, mode = "structureMap") {
        this.mode = 0;
        if (mode === "structureMap") {
            this.interanlMap = new Map(a.map(o => [this.serializeStructure(o[0]), o[1]]));
            this.mode = 0;
        }
        else {
            this.interanlMap1 = new Map(a);
            this.mode = 1;
        }
    }
    clear() {
        if (this.mode === 0) {
            return this.interanlMap.clear();
        }
        else {
            return this.interanlMap1.clear();
        }
    }
    delete(key) {
        if (this.mode === 0) {
            return this.interanlMap.delete(this.serializeStructure(key));
        }
        else {
            return this.interanlMap1.delete(key);
        }
    }
    forEach(callbackfn, thisArg) {
        if (this.mode === 0) {
            return this.interanlMap.forEach((v, k, m) => callbackfn(v, this.deserializeStructure(k), this), thisArg);
        }
        else {
            return this.interanlMap1.forEach((v, k, m) => callbackfn(v, k, this), thisArg);
        }
    }
    get(key) {
        if (this.mode === 0) {
            return this.interanlMap.get(this.serializeStructure(key));
        }
        else {
            return this.interanlMap1.get(key);
        }
    }
    has(key) {
        if (this.mode === 0) {
            return this.interanlMap.has(this.serializeStructure(key));
        }
        else {
            return this.interanlMap1.has(key);
        }
    }
    set(key, value) {
        if (this.mode === 0) {
            this.interanlMap.set(this.serializeStructure(key), value);
        }
        else {
            this.interanlMap1.set(key, value);
        }
        return this;
    }
    equals(map) {
        if (this.mode === 0) {
            return Array.from(this.interanlMap.entries()).every(([key, value]) => this.serializeStructure(map.interanlMap.get(key)) === this.serializeStructure(value))
                // tslint:disable-next-line: triple-equals
                && Array.from(map.interanlMap.entries()).every(([key, value]) => this.serializeStructure(this.interanlMap.get(key)) === this.serializeStructure(value));
        }
        else {
            return Array.from(this.interanlMap1.entries()).every(([key, value]) => map.interanlMap1.get(key) === value)
                // tslint:disable-next-line: triple-equals
                && Array.from(map.interanlMap1.entries()).every(([key, value]) => this.interanlMap1.get(key) === value);
        }
    }
    [Symbol.iterator]() {
        if (this.mode === 0) {
            return Array.from(this.interanlMap.entries()).map(([a, b], i, self) => [this.deserializeStructure(a), b])[Symbol.iterator]();
        }
        else {
            return Array.from(this.interanlMap1.entries()).map(([a, b], i, self) => [a, b])[Symbol.iterator]();
        }
    }
    entries() {
        if (this.mode === 0) {
            return Array.from(this.interanlMap.entries()).map(([a, b], i, self) => [this.deserializeStructure(a), b])[Symbol.iterator]();
        }
        else {
            return Array.from(this.interanlMap1.entries()).map(([a, b], i, self) => [a, b])[Symbol.iterator]();
        }
    }
    keys() {
        if (this.mode === 0) {
            return Array.from(this.interanlMap.keys()).map((key, i, self) => this.deserializeStructure(key))[Symbol.iterator]();
        }
        else {
            return Array.from(this.interanlMap1.keys()).map((key, i, self) => key)[Symbol.iterator]();
        }
    }
    values() {
        if (this.mode === 0) {
            return this.interanlMap.values();
        }
        else {
            return this.interanlMap1.values();
        }
    }
    serializeStructure(a) {
        // Could be implemented faster
        if (isNaN(a)) {
            const newObj = {};
            for (const key of Object.getOwnPropertyNames(a).sort()) {
                newObj[key] = a[key];
            }
            return JSON.stringify(newObj);
        }
        else {
            return "" + a;
        }
    }
    deserializeStructure(a) {
        // Could be implemented faster
        // assumes that an object in JSON format starts with '{'
        if (a.startsWith("{"))
            return JSON.parse(a);
        else if (!isNaN(a))
            return Number.parseFloat(a);
    }
}
exports.StructureMap = StructureMap;
