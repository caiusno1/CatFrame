import { Cat } from './Categories/Cat/Cat';
import { SetCat } from './Categories/Set/SetCat';
import { Graph } from "./Categories/Graph/Graph";
import { GraphMorphism } from "./Categories/Graph/GraphMorphism";
import { TotalFunction } from "./Categories/Set/TotalFunction";

export class CatBuilder<type>{
    private comparer: (obj1: type, obj2: type) => boolean;
    constructor(objcomparer: (obj1: type, obj2: type) => boolean) {
        this.comparer = objcomparer;
    }
    createSets(objects: type[], arrows: TotalFunction<type>[]) {
        // check validity
        // return
    }
    createGraphs(objects: Graph<type, type>[], arrows: GraphMorphism<type, type>[]) {
        // check validity
        // return
    }
    createGraphsFromObject(object: any) {
        // check validity
        // return
    }
    typeToInstance(atype: new () => Cat<any>){
        return (new atype()) as any;
    }
}