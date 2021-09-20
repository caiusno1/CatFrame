"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Graph {
    equals(graph) {
        return graph.nodeSet.equals(this.nodeSet) && graph.edgeSet.equals(this.edgeSet);
    }
}
exports.Graph = Graph;
