"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
class Graph {
    equals(graph) {
        return graph.nodeSet.equals(this.nodeSet) && graph.edgeSet.equals(this.edgeSet);
    }
}
exports.Graph = Graph;
