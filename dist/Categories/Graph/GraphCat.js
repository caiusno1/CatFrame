"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphCat = void 0;
const SetCat_1 = require("./../Set/SetCat");
const StructureMap_1 = require("./../../Helpers/StructureMap");
const GraphMorphism_1 = require("./GraphMorphism");
const Graph_1 = require("./Graph");
const GraphArrowRepresentation_1 = require("./GraphArrowRepresentation");
const GraphRepresentation_1 = require("./GraphRepresentation");
class GraphCat {
    constructor(objcomp, edgecomp, mode = "structureMap") {
        this.compareObj = objcomp;
        this.compareEdge = edgecomp;
        this.nodeCat = new SetCat_1.SetCat(this.compareObj, mode);
        this.edgeCat = new SetCat_1.SetCat(this.compareEdge, mode);
    }
    mergeArrow(a, b) {
        const nodeArrow = this.nodeCat.mergeArrow(a.nodeArrow, b.nodeArrow);
        const edgeArrow = this.edgeCat.mergeArrow(a.edgeArrow, b.edgeArrow);
        const src = this.coproduct(a.src, b.src)[0].trg;
        const trg = this.coproduct(a.trg, b.trg)[0].trg;
        return new GraphMorphism_1.GraphMorphism(src, trg, nodeArrow, edgeArrow);
    }
    closeTriangle(f, g) {
        if (!f.src.equals(g.src)) {
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fnodemap = f.nodeArrow;
        const fedgemap = f.edgeArrow;
        const gnodemap = g.nodeArrow;
        const gedgemap = g.edgeArrow;
        const hnodemap = this.nodeCat.closeTriangle(fnodemap, gnodemap);
        const hedgemap = this.edgeCat.closeTriangle(fedgemap, gedgemap);
        return new GraphMorphism_1.GraphMorphism(g.trg, f.trg, hnodemap, hedgemap);
    }
    id(obj) {
        const nodeMap = new StructureMap_1.StructureMap(obj.nodeSet.map((element) => [element, element]));
        const edgeMap = new StructureMap_1.StructureMap(obj.edgeSet.map((element) => [element, element]));
        return new GraphMorphism_1.GraphMorphism(obj, obj, nodeMap, edgeMap);
    }
    then(f, g) {
        return f.then(g);
    }
    createObject() {
        return new GraphRepresentation_1.GraphRepresentation(this.compareObj, this.compareEdge);
    }
    createMorphism() {
        return new GraphArrowRepresentation_1.GraphArrowRepresentation(null);
    }
    coproduct(F, G) {
        const HnodeCoproduct = this.nodeCat.coproduct(F.nodeSet, G.nodeSet);
        const HedgeCoproduct = this.edgeCat.coproduct(F.edgeSet, G.edgeSet);
        // dirty fix for switching to right map mode (be consistent "to the rest execution")
        // can't use id here because than the trg set would be incorrect
        const nodeMapF = new StructureMap_1.StructureMap(F.nodeSet.map(node => [node, node], HnodeCoproduct[0].getMapping().mode));
        const edgeMapF = new StructureMap_1.StructureMap(F.edgeSet.map(edge => [edge, edge], HnodeCoproduct[0].getMapping().mode));
        const nodeMapG = new StructureMap_1.StructureMap(G.nodeSet.map(node => [node, node], HnodeCoproduct[0].getMapping().mode));
        const edgeMapG = new StructureMap_1.StructureMap(G.edgeSet.map(edge => [edge, edge], HnodeCoproduct[0].getMapping().mode));
        const H = new Graph_1.Graph();
        H.nodeSet = HnodeCoproduct[0].trg;
        H.edgeSet = HedgeCoproduct[0].trg;
        // Not tested by now
        H.src = new Map(F.edgeSet.map(edge => [HedgeCoproduct[0].apply(edge), HnodeCoproduct[0].apply(F.src.get(edge))])
            .concat(G.edgeSet.map(edge => [HedgeCoproduct[1].apply(edge), HnodeCoproduct[1].apply(G.src.get(edge))])));
        H.trg = new Map(F.edgeSet.map(edge => [HedgeCoproduct[0].apply(edge), HnodeCoproduct[0].apply(F.trg.get(edge))])
            .concat(G.edgeSet.map(edge => [HedgeCoproduct[1].apply(edge), HnodeCoproduct[1].apply(G.trg.get(edge))])));
        return [new GraphMorphism_1.GraphMorphism(F, H, nodeMapF, edgeMapF),
            new GraphMorphism_1.GraphMorphism(G, H, nodeMapG, edgeMapG)];
    }
    coequalizer(f, g) {
        const edgeEqual = this.edgeCat.coequalizer(f.edgeArrow, g.edgeArrow);
        const nodeEqual = this.nodeCat.coequalizer(f.nodeArrow, g.nodeArrow);
        const G = new Graph_1.Graph();
        G.edgeSet = edgeEqual.trg;
        G.nodeSet = nodeEqual.trg;
        G.src = new Map(f.trg.edgeSet.map(edge => [edgeEqual.apply(edge), nodeEqual.apply(f.trg.src.get(edge))])
            .concat(g.trg.edgeSet.map(edge => [edgeEqual.apply(edge), nodeEqual.apply(g.trg.src.get(edge))])));
        G.trg = new Map(f.trg.edgeSet.map(edge => [edgeEqual.apply(edge), nodeEqual.apply(f.trg.trg.get(edge))])
            .concat(g.trg.edgeSet.map(edge => [edgeEqual.apply(edge), nodeEqual.apply(g.trg.trg.get(edge))])));
        return new GraphMorphism_1.GraphMorphism(f.trg, G, nodeEqual, edgeEqual);
    }
    pushout(f, g) {
        const coproduct = this.coproduct(f.trg, g.trg);
        const equal = this.coequalizer(f.then(coproduct[0]), g.then(coproduct[1]));
        return [coproduct[0].then(equal),
            coproduct[1].then(equal)];
    }
}
exports.GraphCat = GraphCat;
