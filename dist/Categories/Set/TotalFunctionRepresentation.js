"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TotalFunctionRepresentation {
    constructor(totalFunction) {
        this.totalFun = totalFunction;
    }
    then(g) {
        return new TotalFunctionRepresentation(this.totalFun.then(g.totalFun));
    }
    apply(a) {
        return this.totalFun.apply(a);
    }
    appendInPlace(a, b) {
        this.totalFun.getMapping().set(a, b);
    }
    combineInPlace(a) {
        a.totalFun.getMapping().forEach((itemOne, itemTwo, inmap) => this.totalFun.getMapping().set(itemOne, itemTwo));
    }
    equals(g) {
        return this.totalFun.equals(g.totalFun);
    }
}
exports.TotalFunctionRepresentation = TotalFunctionRepresentation;
