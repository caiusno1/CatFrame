"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GraphArrowRepresentation {
    constructor(f) {
        this.graphmorphism = f;
    }
    then(g) {
        return this.graphmorphism.then(g.graphmorphism);
    }
}
exports.GraphArrowRepresentation = GraphArrowRepresentation;
