import { GraphMorphism } from './GraphMorphism';
import { StructureMap } from './../../Helpers/StructureMap';
import { GraphCat } from './GraphCat';
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
const cat = new GraphCat(flatObjCompare,LEdgeCompare)
describe('Graph Category unit tests', () => {
    test('Graph create', () => {
        const graph = cat.createObject();
        graph.createNode({name:"Hello World"})
        graph.createNode({name:"Hello Hello World"})
        graph.createEdge({name:"Hello World"},{name:"Hello Hello World"},{name:"Call"})
    })
    test('GraphMorph create', () => {
        const graphMorph = cat.createMorphism();
        const graph = cat.createObject();
        graph.createNode({name:"Hello World"})
        graph.createNode({name:"Hello Hello World"})
        graph.createEdge({name:"Hello World"},{name:"Hello Hello World"},{name:"Call"})

        const Objmap = new StructureMap([])
        Objmap.set({name:"Hello World"},{name:"Hello World"})
        Objmap.set({name:"Hello Hello World"},{name:"Hello Hello World"})

        const Edgemap = new StructureMap([])
        Edgemap.set({name:"Call"},{name:"Call"})

        graphMorph.graphmorphism = new GraphMorphism(graph.getGraph(),graph.getGraph(),Objmap,Edgemap)
    })
    test('Graph coproduct', () => {
        const graph = cat.createObject();
        graph.createNode({name:"Hello World"})
        graph.createNode({name:"Hello Hello World"})
        graph.createEdge({name:"Hello World"},{name:"Hello Hello World"},{name:"Call"})

        const graph2 = cat.createObject();
        graph2.createNode({name:"Hello World2"})
        graph2.createNode({name:"Hello Hello World2"})
        graph2.createEdge({name:"Hello World2"},{name:"Hello Hello World2"},{name:"Call"})
        const graphCombined = cat.coproduct(graph.getGraph(),graph2.getGraph());

        const Tcoproduct = cat.createObject();
        Tcoproduct.createNode({name:"Hello World"})
        Tcoproduct.createNode({name:"Hello Hello World"})
        Tcoproduct.createNode({name:"Hello World2"})
        Tcoproduct.createNode({name:"Hello Hello World2"})
        Tcoproduct.createEdge({name:"Hello World"},{name:"Hello Hello World"},{name:"Call"})
        Tcoproduct.createEdge({name:"Hello World2"},{name:"Hello Hello World2"},{name:"Call"})

        expect(graphCombined[1].trg.equals(Tcoproduct.getGraph())).toBeTruthy()
        expect(graphCombined[0].trg.equals(Tcoproduct.getGraph())).toBeTruthy()
        expect(graphCombined[1].apply(graph2.getGraph()).equals(graph2.getGraph())).toBeTruthy()
        expect(graphCombined[0].apply(graph.getGraph()).equals(graph.getGraph())).toBeTruthy()
    })
    test('Graph simple pushout', () => {
        const emptyGraph = cat.createObject();
        const graph = cat.createObject();
        graph.createNode({name:"Hello World"})
        graph.createNode({name:"Hello Hello World"})
        graph.createEdge({name:"Hello World"},{name:"Hello Hello World"},{name:"Call"})

        const graph2 = cat.createObject();
        graph2.createNode({name:"Hello World2"})
        graph2.createNode({name:"Hello Hello World2"})
        graph2.createEdge({name:"Hello World2"},{name:"Hello Hello World2"},{name:"Call2"})

        const f = cat.createMorphism()
        f.graphmorphism = new GraphMorphism(emptyGraph.getGraph(),graph.getGraph(),new StructureMap([]),new StructureMap([]))
        const g = cat.createMorphism()
        g.graphmorphism = new GraphMorphism(emptyGraph.getGraph(),graph2.getGraph(),new StructureMap([]),new StructureMap([]))
        const PO = cat.pushout(f.graphmorphism,g.graphmorphism)

    })
});