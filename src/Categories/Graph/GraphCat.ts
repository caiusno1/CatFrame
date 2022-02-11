import { SetCat } from './../Set/SetCat';
import { StructureMap } from './../../Helpers/StructureMap';
import { GraphMorphism } from './GraphMorphism';
import { Cat } from './../Cat/Cat';
import { Graph } from './Graph';
import { GraphArrowRepresentation } from './GraphArrowRepresentation';
import { GraphRepresentation } from './GraphRepresentation';
export class GraphCat<ObjectType,EdgeType> implements Cat<Graph<ObjectType,EdgeType>>{
    private readonly compareObj: (obj1: ObjectType, obj2: ObjectType) => boolean
    private readonly compareEdge: (obj1: EdgeType, obj2: EdgeType) => boolean
    private readonly nodeCat: SetCat<ObjectType>
    private readonly edgeCat: SetCat<EdgeType>
    constructor(objcomp: any, edgecomp: any, mode: "structureMap"|"productionMap" = "structureMap"){
        this.compareObj = objcomp;
        this.compareEdge = edgecomp;
        this.nodeCat = new SetCat<ObjectType>(this.compareObj,mode)
        this.edgeCat = new SetCat<EdgeType>(this.compareEdge, mode)
    }
    mergeArrow(a: GraphMorphism<ObjectType, EdgeType>, b: GraphMorphism<ObjectType, EdgeType>): GraphMorphism<ObjectType, EdgeType>{
        const nodeArrow = this.nodeCat.mergeArrow(a.nodeArrow,b.nodeArrow)
        const edgeArrow = this.edgeCat.mergeArrow(a.edgeArrow,b.edgeArrow)
        const src = this.coproduct(a.src,b.src)[0].trg;
        const trg = this.coproduct(a.trg,b.trg)[0].trg;
        return new GraphMorphism(src,trg,nodeArrow,edgeArrow)
    }
    closeTriangle(f: GraphMorphism<ObjectType,EdgeType>,g: GraphMorphism<ObjectType,EdgeType>): GraphMorphism<ObjectType,EdgeType>{
        if(!f.src.equals(g.src)){
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fnodemap = f.nodeArrow;
        const fedgemap = f.edgeArrow;
        const gnodemap = g.nodeArrow;
        const gedgemap = g.edgeArrow;

        const hnodemap = this.nodeCat.closeTriangle(fnodemap,gnodemap);
        const hedgemap =this.edgeCat.closeTriangle(fedgemap,gedgemap);
        return new GraphMorphism(g.trg,f.trg,hnodemap,hedgemap);
    }
    id(obj: Graph<ObjectType, EdgeType>){
        const nodeMap = new StructureMap(obj.nodeSet.map((element) => [element,element]) as [ObjectType,ObjectType][])
        const edgeMap = new StructureMap(obj.edgeSet.map((element) => [element,element]) as [EdgeType,EdgeType][])
        return new GraphMorphism(obj,obj,nodeMap,edgeMap);
    }

    then(f: GraphMorphism<ObjectType,EdgeType>,g: GraphMorphism<ObjectType,EdgeType>){
        return f.then(g);
    }
    createObject():GraphRepresentation<ObjectType,EdgeType> {
        return new GraphRepresentation<ObjectType,EdgeType>(this.compareObj,this.compareEdge);
    }
    createMorphism():GraphArrowRepresentation<ObjectType,EdgeType>{
        return new GraphArrowRepresentation<ObjectType,EdgeType>(null);
    }
    coproduct(F:Graph<ObjectType, EdgeType>, G: Graph<ObjectType, EdgeType>): [GraphMorphism<ObjectType, EdgeType>,GraphMorphism<ObjectType, EdgeType>]{
        const HnodeCoproduct = this.nodeCat.coproduct(F.nodeSet,G.nodeSet)
        const HedgeCoproduct = this.edgeCat.coproduct(F.edgeSet,G.edgeSet)

        // dirty fix for switching to right map mode (be consistent "to the rest execution")
        // can't use id here because than the trg set would be incorrect
        const nodeMapF = new StructureMap(F.nodeSet.map(node => [node,node], (HnodeCoproduct[0].getMapping() as any).mode) as [ObjectType,ObjectType][])
        const edgeMapF = new StructureMap(F.edgeSet.map(edge => [edge,edge], (HnodeCoproduct[0].getMapping() as any).mode) as [EdgeType,EdgeType][])

        const nodeMapG = new StructureMap(G.nodeSet.map(node => [node,node], (HnodeCoproduct[0].getMapping() as any).mode) as [ObjectType,ObjectType][])
        const edgeMapG = new StructureMap(G.edgeSet.map(edge => [edge,edge], (HnodeCoproduct[0].getMapping() as any).mode) as [EdgeType,EdgeType][])

        const H = new Graph<ObjectType,EdgeType>()
        H.nodeSet = HnodeCoproduct[0].trg;
        H.edgeSet = HedgeCoproduct[0].trg;
        // Not tested by now
        H.src = new Map(F.edgeSet.map( edge => [HedgeCoproduct[0].apply(edge),HnodeCoproduct[0].apply(F.src.get(edge))])
                .concat(G.edgeSet.map( edge => [HedgeCoproduct[1].apply(edge),HnodeCoproduct[1].apply(G.src.get(edge))])) as [EdgeType,ObjectType][])
        H.trg = new Map(F.edgeSet.map( edge => [HedgeCoproduct[0].apply(edge),HnodeCoproduct[0].apply(F.trg.get(edge))])
                .concat(G.edgeSet.map( edge => [HedgeCoproduct[1].apply(edge),HnodeCoproduct[1].apply(G.trg.get(edge))])) as [EdgeType,ObjectType][])

        return [new GraphMorphism(F,H,nodeMapF,edgeMapF)
            ,new GraphMorphism(G,H,nodeMapG,edgeMapG)]
    }
    coequalizer(f: GraphMorphism<ObjectType,EdgeType>, g: GraphMorphism<ObjectType,EdgeType>){
        const edgeEqual = this.edgeCat.coequalizer(f.edgeArrow, g.edgeArrow);
        const nodeEqual = this.nodeCat.coequalizer(f.nodeArrow, g.nodeArrow);
        const G = new Graph<ObjectType,EdgeType>();
        G.edgeSet = edgeEqual.trg
        G.nodeSet = nodeEqual.trg

        G.src = new Map(f.trg.edgeSet.map(edge => [edgeEqual.apply(edge),nodeEqual.apply(f.trg.src.get(edge))])
                .concat(g.trg.edgeSet.map(edge => [edgeEqual.apply(edge),nodeEqual.apply(g.trg.src.get(edge))])) as [EdgeType,ObjectType][])
        G.trg = new Map(f.trg.edgeSet.map(edge => [edgeEqual.apply(edge),nodeEqual.apply(f.trg.trg.get(edge))])
                .concat(g.trg.edgeSet.map(edge => [edgeEqual.apply(edge),nodeEqual.apply(g.trg.trg.get(edge))])) as [EdgeType,ObjectType][])

        return new GraphMorphism(f.trg,G,nodeEqual,edgeEqual)
    }
    pushout(f: GraphMorphism<ObjectType,EdgeType>, g: GraphMorphism<ObjectType,EdgeType>){
        const coproduct = this.coproduct(f.trg,g.trg);
        const equal = this.coequalizer(f.then(coproduct[0]),g.then(coproduct[1]))
        return [coproduct[0].then(equal),
        coproduct[1].then(equal)]
    }
}