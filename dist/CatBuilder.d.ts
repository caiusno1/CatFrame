import { Cat } from './Categories/Cat/Cat';
import { Graph } from "./Categories/Graph/Graph";
import { GraphMorphism } from "./Categories/Graph/GraphMorphism";
import { TotalFunction } from "./Categories/Set/TotalFunction";
export declare class CatBuilder<type> {
    private comparer;
    constructor(objcomparer: (obj1: type, obj2: type) => boolean);
    createSets(objects: type[], arrows: TotalFunction<type>[]): void;
    createGraphs(objects: Graph<type, type>[], arrows: GraphMorphism<type, type>[]): void;
    createGraphsFromObject(object: any): void;
    typeToInstance(atype: new () => Cat<any>): any;
}
