import { StructureMap } from './../../Helpers/StructureMap';
import { GraphMorphism } from './GraphMorphism';
import { CatSet } from "../Set/CatSet";
import { Graph } from "./Graph";

class LEdge{
    public name:string
    constructor(pname:string){
        this.name = pname
    }
}
function flatObjCompare(a:any,b:any){
    if(Object.keys(a).every((item) => !['number','string'].includes(typeof a[item]) || a[item] === b[item])) {
        return true;
    }
    return false;
}
function LEdgeCompare(a:LEdge,b:LEdge){
    return a.name === b.name
}
describe('GraphMorphism unit tests', () => {
    test('Graphmorphism constructable', () => {
        const G = new Graph<object,LEdge>()
        const F = new Graph<object,LEdge>()
        G.nodeSet = new CatSet<object>(flatObjCompare)
        G.edgeSet = new CatSet<LEdge>(LEdgeCompare)
        F.nodeSet = new CatSet<object>(flatObjCompare)
        F.edgeSet = new CatSet<LEdge>(LEdgeCompare)
        G.nodeSet.push({a:7})
        G.nodeSet.push({a:9})
        F.nodeSet.push({a:7})
        F.nodeSet.push({a:9})
        G.edgeSet.push(new LEdge("t"))
        F.edgeSet.push(new LEdge("t"))
        G.src = new Map();
        G.trg = new Map();
        F.src = new Map();
        F.trg = new Map()
        G.src.set(new LEdge("t"),{a:7})
        G.trg.set(new LEdge("t"),{a:9})
        F.src.set(new LEdge("t"),{a:7})
        F.trg.set(new LEdge("t"),{a:9})
        const mappingNode = new StructureMap([]);
        mappingNode.set({a:7},{a:7})
        mappingNode.set({a:9},{a:9})
        const mappingEdge= new StructureMap([]);
        mappingEdge.set(new LEdge("t"),new LEdge("t"))
        const f = new GraphMorphism(F,G,mappingNode,mappingEdge)
    })
    test('Graphmorphism composable', () => {
        const G = new Graph<object,LEdge>()
        const F = new Graph<object,LEdge>()
        G.nodeSet = new CatSet<object>(flatObjCompare)
        G.edgeSet = new CatSet<LEdge>(LEdgeCompare)
        F.nodeSet = new CatSet<object>(flatObjCompare)
        F.edgeSet = new CatSet<LEdge>(LEdgeCompare)
        G.nodeSet.push({a:7})
        G.nodeSet.push({a:9})
        F.nodeSet.push({a:7})
        F.nodeSet.push({a:9})
        G.edgeSet.push(new LEdge("t"))
        F.edgeSet.push(new LEdge("t"))
        G.src = new Map();
        G.trg = new Map();
        F.src = new Map();
        F.trg = new Map()
        G.src.set(new LEdge("t"),{a:7})
        G.trg.set(new LEdge("t"),{a:9})
        F.src.set(new LEdge("t"),{a:7})
        F.trg.set(new LEdge("t"),{a:9})
        const mappingNode = new StructureMap([]);
        mappingNode.set({a:7},{a:7})
        mappingNode.set({a:9},{a:9})
        const mappingEdge= new StructureMap([]);
        mappingEdge.set(new LEdge("t"),new LEdge("t"))
        const f = new GraphMorphism(F,G,mappingNode,mappingEdge)

        const H = new Graph<object,LEdge>()
        H.nodeSet = new CatSet<object>(flatObjCompare)
        H.edgeSet = new CatSet<LEdge>(LEdgeCompare)
        H.nodeSet.push({a:7})
        H.edgeSet.push(new LEdge("s"))
        H.src = new Map();
        H.trg = new Map();
        H.src.set(new LEdge("s"),{a:7})
        H.trg.set(new LEdge("s"),{a:7})
        const mappingNode2 = new StructureMap([]);
        mappingNode2.set({a:7},{a:7})
        mappingNode2.set({a:9},{a:7})
        const mappingEdge2= new StructureMap([]);
        mappingEdge2.set(new LEdge("t"),new LEdge("s"))
        const g = new GraphMorphism(G,H,mappingNode2,mappingEdge2)
        const h = f.then(g)
        expect(h.equals(g)).toBeTruthy()
    })
})