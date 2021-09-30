"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphRepresentation = void 0;
const CatSet_1 = require("../Set/CatSet");
const SetCat_1 = require("../Set/SetCat");
const Graph_1 = require("./Graph");
const GraphMorphism_1 = require("./GraphMorphism");
class GraphRepresentation {
    constructor(objCmp, edgeCmp) {
        this.nodeEq = objCmp;
        this.edgeEq = edgeCmp;
        const nodesUniverse = new SetCat_1.SetCat(objCmp);
        const edgeUniverse = new SetCat_1.SetCat(edgeCmp);
        this.internalGraph = new Graph_1.Graph();
        this.internalGraph.nodeSet = new CatSet_1.CatSet(objCmp);
        this.internalGraph.edgeSet = new CatSet_1.CatSet(edgeCmp);
        this.internalGraph.src = new Map();
        this.internalGraph.trg = new Map();
        this.id = (obj) => new GraphMorphism_1.GraphMorphism(obj, obj, nodesUniverse.id(obj.nodeSet).totalFun, edgeUniverse.id(obj.edgeSet).totalFun);
    }
    createNode(node) {
        this.internalGraph.nodeSet.push(node);
    }
    createEdge(from, to, edge) {
        const fromMaybe = this.internalGraph.nodeSet.find(a => this.nodeEq(a, from));
        const toMaybe = this.internalGraph.nodeSet.find(a => this.nodeEq(a, to));
        if (fromMaybe === undefined) {
            this.internalGraph.nodeSet.push(from);
        }
        if (toMaybe === undefined) {
            this.internalGraph.nodeSet.push(to);
        }
        this.internalGraph.edgeSet.push(edge);
        this.internalGraph.src.set(edge, fromMaybe ? fromMaybe : from);
        this.internalGraph.trg.set(edge, toMaybe ? fromMaybe : to);
    }
    getGraph() {
        return this.internalGraph;
    }
    printGraph() {
        // tslint:disable-next-line:no-console
        console.log('Nodes');
        for (const node of this.internalGraph.nodeSet) {
            // tslint:disable-next-line:no-console
            console.log(node);
        }
        // tslint:disable-next-line:no-console
        console.log('Edges');
        for (const edge of this.internalGraph.edgeSet) {
            // tslint:disable-next-line:no-console
            console.log(edge);
        }
    }
}
exports.GraphRepresentation = GraphRepresentation;
