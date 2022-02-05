"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCat = void 0;
const StructureMap_1 = require("../../Helpers/StructureMap");
const CatSet_1 = require("./CatSet");
const TotalFunction_1 = require("./TotalFunction");
const TotalFunctionRepresentation_1 = require("./TotalFunctionRepresentation");
class SetCat {
    constructor(objcomp, mode = "structureMap") {
        // id: (obj: CatSet<obj>) => Arrow<CatSet<obj>>;
        this.id = (objSet) => new TotalFunction_1.TotalFunction(objSet, objSet, new StructureMap_1.StructureMap(Array.from(objSet.values()).map((a, b, c) => [a, a]), this.mode));
        this.compare = objcomp;
        this.mode = mode;
    }
    toAbstractCat() {
        return this;
    }
    mergeArrow(a, b) {
        const src = this.coproduct(a.getSrc(), b.getSrc())[0].trg;
        const trg = this.coproduct(a.getTrg(), b.getTrg())[0].trg;
        const mappings = [...a.getMapping().entries(), ...b.getMapping().entries()];
        return new TotalFunction_1.TotalFunction(src, trg, new StructureMap_1.StructureMap(mappings, this.mode));
    }
    // f = g;out
    closeTriangle(f, g) {
        if (!f.src.equals(g.src)) {
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fmap = f.getMapping();
        const gmap = f.getMapping();
        const hmapentries = new Array();
        for (const gsrc of gmap.keys()) {
            const htrg = f.apply(gsrc);
            const hsrc = g.apply(gsrc);
            hmapentries.push([hsrc, htrg]);
        }
        const hmap = new StructureMap_1.StructureMap(hmapentries, this.mode);
        return new TotalFunction_1.TotalFunction(g.trg, f.trg, hmap);
    }
    then(f, g) {
        return f.then(g);
    }
    createMorphism() {
        const set1 = new CatSet_1.CatSet(this.compare);
        const set2 = new CatSet_1.CatSet(this.compare);
        return new TotalFunctionRepresentation_1.TotalFunctionRepresentation(new TotalFunction_1.TotalFunction(set1, set2, new StructureMap_1.StructureMap([])));
    }
    coproduct(a, b) {
        const set1 = new CatSet_1.CatSet(this.compare, ...a);
        const set2 = new CatSet_1.CatSet(this.compare, ...b);
        const union = new CatSet_1.CatSet(this.compare);
        const mapping1 = new StructureMap_1.StructureMap([], this.mode);
        const mapping2 = new StructureMap_1.StructureMap([], this.mode);
        for (const elem1 of set1) {
            mapping1.set(elem1, elem1);
            union.push(elem1);
        }
        for (const elem2 of set2) {
            mapping2.set(elem2, elem2);
            union.push(elem2);
        }
        return [new TotalFunction_1.TotalFunction(set1, union, mapping1), new TotalFunction_1.TotalFunction(set2, union, mapping2)];
    }
    coequalizer(f, g) {
        const mapping = new StructureMap_1.StructureMap([], this.mode);
        const targetSet = new CatSet_1.CatSet(f.trg.compare);
        for (const srcObj of f.src) {
            if (f.apply(srcObj) && f.apply(srcObj)) {
                mapping.set(f.apply(srcObj), f.apply(srcObj));
                mapping.set(g.apply(srcObj), f.apply(srcObj));
                targetSet.push(f.apply(srcObj));
            }
            else if (f.apply(srcObj)) {
                mapping.set(f.apply(srcObj), f.apply(srcObj));
                targetSet.push(f.apply(srcObj));
            }
            else if (g.apply(srcObj)) {
                mapping.set(g.apply(srcObj), g.apply(srcObj));
                targetSet.push(g.apply(srcObj));
            }
        }
        const haveNoProjectionFromDefinition = Array.from(f.trg).filter((trgObj) => !Array.from(f.getMapping().values()).includes(trgObj) && !Array.from(g.getMapping().values()).includes(trgObj));
        for (const toIdMappable of haveNoProjectionFromDefinition) {
            mapping.set(toIdMappable, toIdMappable);
        }
        return new TotalFunction_1.TotalFunction(f.trg, targetSet, mapping);
    }
    pushout(f, g) {
        const coproduct = this.coproduct(f.trg, g.trg);
        const equal = this.coequalizer(f.then(coproduct[0]), g.then(coproduct[1]));
        return [coproduct[0].then(equal), coproduct[1].then(equal)];
    }
}
exports.SetCat = SetCat;
