import { StructureMap } from './../../Helpers/StructureMap';
import { CatSet } from '../Set/CatSet';
import { Graph } from './Graph';
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
describe('Graph unit tests', () => {
    test('Graph (node only) equality', () => {
        const G = new Graph<object,LEdge>()
        const F = new Graph<object,LEdge>()
        G.nodeSet = new CatSet<object>(flatObjCompare)
        G.edgeSet = new CatSet<LEdge>(LEdgeCompare)
        F.nodeSet = new CatSet<object>(flatObjCompare)
        F.edgeSet = new CatSet<LEdge>(LEdgeCompare)
        expect(G.equals(F)).toBeTruthy()
        G.nodeSet.push({a:7})
        F.nodeSet.push({a:7})
        expect(G.equals(F)).toBeTruthy()
        F.nodeSet.push({g:9})
        expect(G.equals(F)).toBeFalsy()
        G.nodeSet.push({g:10})
        expect(G.equals(F)).toBeFalsy()
    })
    test('Graph (with edge) equality', () => {
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
        expect(G.equals(F)).toBeTruthy()
    })
})