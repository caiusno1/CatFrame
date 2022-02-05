"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TotalFunction = void 0;
const StructureMap_1 = require("./../../Helpers/StructureMap");
const CatSet_1 = require("./CatSet");
class TotalFunction {
    constructor(src, trg, mapping) {
        this.src = src;
        this.trg = trg;
        this.mapping = mapping;
        const srcList = new CatSet_1.CatSet(src.compare, ...Array.from(src.values()));
        const mapKeyList = new CatSet_1.CatSet(src.compare, ...Array.from(mapping.keys()));
        if (!srcList.enoughEqual(mapKeyList)) {
            // todo needs rework (maybe)
            throw new Error("Function is not total");
        }
    }
    then(g) {
        if (!this.trg.equals(g.src)) {
            throw new Error("Not composable");
        }
        const ftupleMap = Array.from(this.mapping.entries());
        const ftgtupleMap = ftupleMap.map(([key, value]) => {
            // BEGIN Only interesting for partial fun
            /*if (!value) {
                return [key, null];
            }
            if (!g.mapping.has(value)) {
                return [key, null]
            }*/
            // END Only interesting for partial fun
            return [key, g.apply(value)];
        });
        const filteredftgtupleMap = ftgtupleMap.filter(([key, value]) => value);
        const map = new StructureMap_1.StructureMap(filteredftgtupleMap, this.mapping.mode === 0 ? "structureMap" : 'productionMap');
        return new TotalFunction(this.src, g.trg, map);
    }
    apply(a) {
        let val = null;
        if (a && this.mapping.has(a)) {
            val = this.mapping.get(a);
        }
        else {
            val = null;
        }
        return val;
    }
    equals(g) {
        return this.mapping.equals(g.mapping);
    }
    getMapping() {
        return this.mapping;
    }
    getSrc() {
        return this.src;
    }
    getTrg() {
        return this.trg;
    }
}
exports.TotalFunction = TotalFunction;
