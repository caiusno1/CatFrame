"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphArrowRepresentation = void 0;
class GraphArrowRepresentation {
    constructor(f) {
        this.graphmorphism = f;
    }
    then(g) {
        return this.graphmorphism.then(g.graphmorphism);
    }
}
exports.GraphArrowRepresentation = GraphArrowRepresentation;
