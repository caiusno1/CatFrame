"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphMorphism = void 0;
const StructureMap_1 = require("./../../Helpers/StructureMap");
const TotalFunction_1 = require("../Set/TotalFunction");
const Graph_1 = require("./Graph");
class GraphMorphism {
    constructor(srcObj, trgObj, nodeMap, edgeMap) {
        if ((nodeMap instanceof StructureMap_1.StructureMap) && (edgeMap instanceof StructureMap_1.StructureMap)) {
            this.pconstructor1(srcObj, trgObj, nodeMap, edgeMap);
        }
        else if ((nodeMap instanceof TotalFunction_1.TotalFunction) && (edgeMap instanceof TotalFunction_1.TotalFunction)) {
            this.pconstructor2(srcObj, trgObj, nodeMap, edgeMap);
        }
        else {
            throw Error("wrong instantiation");
        }
    }
    pconstructor1(srcObj, trgObj, nodeMap, edgeMap) {
        this.src = srcObj;
        this.trg = trgObj;
        this.nodeArrow = new TotalFunction_1.TotalFunction(this.src.nodeSet, this.trg.nodeSet, nodeMap);
        this.edgeArrow = new TotalFunction_1.TotalFunction(this.src.edgeSet, this.trg.edgeSet, edgeMap);
    }
    pconstructor2(srcObj, trgObj, nodeMap, edgeMap) {
        this.src = srcObj;
        this.trg = trgObj;
        this.nodeArrow = nodeMap;
        this.edgeArrow = edgeMap;
    }
    then(g) {
        const tnodeMap = this.nodeArrow.then(g.nodeArrow);
        const tedgeMap = this.edgeArrow.then(g.edgeArrow);
        return new GraphMorphism(this.src, g.trg, tnodeMap, tedgeMap);
    }
    equals(g) {
        return this.src.equals(g.src) && this.trg.equals(g.trg) && this.nodeArrow.equals(g.nodeArrow) && this.edgeArrow.equals(g.edgeArrow);
    }
    apply(G) {
        const nodeSet = G.nodeSet.map(node => this.nodeArrow.apply(node));
        const edgeSet = G.edgeSet.map(node => this.edgeArrow.apply(node));
        const srcSet = Array.from(G.src.entries()).map(([edge, node]) => [this.edgeArrow.apply(edge), this.nodeArrow.apply(node)]);
        const trgSet = Array.from(G.trg.entries()).map(([edge, node]) => [this.edgeArrow.apply(edge), this.nodeArrow.apply(node)]);
        const G2 = new Graph_1.Graph();
        G2.nodeSet = nodeSet;
        G2.edgeSet = edgeSet;
        G2.src = new Map(srcSet);
        G2.trg = new Map(trgSet);
        return G2;
    }
}
exports.GraphMorphism = GraphMorphism;
