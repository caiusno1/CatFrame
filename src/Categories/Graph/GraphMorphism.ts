import { StructureMap } from './../../Helpers/StructureMap';
import { TotalFunction } from '../Set/TotalFunction';
import { Arrow } from "../Cat/Arrow";
import { Graph } from './Graph';
import { CatSet } from '../Set/CatSet';

export class GraphMorphism<ObjectType,EdgeType> implements Arrow<Graph<ObjectType,EdgeType>>{
    src: Graph<ObjectType,EdgeType>;
    trg: Graph<ObjectType,EdgeType>;
    nodeArrow: TotalFunction<ObjectType>;
    edgeArrow: TotalFunction<EdgeType>;
    constructor(srcObj:Graph<ObjectType,EdgeType>, trgObj:Graph<ObjectType,EdgeType>, nodeMap: StructureMap<ObjectType>|TotalFunction<ObjectType>, edgeMap:StructureMap<EdgeType>|TotalFunction<EdgeType>){
        if((nodeMap instanceof StructureMap) && (edgeMap instanceof StructureMap)){
            this.pconstructor1(srcObj,trgObj,nodeMap as StructureMap<ObjectType> ,edgeMap as StructureMap<EdgeType>);
        } else if((nodeMap instanceof TotalFunction) && (edgeMap instanceof TotalFunction)){
            this.pconstructor2(srcObj,trgObj,nodeMap as TotalFunction<ObjectType>,edgeMap as TotalFunction<EdgeType>);
        } else {
            throw Error("wrong instantiation");
        }
    }

    pconstructor1(srcObj:Graph<ObjectType,EdgeType>, trgObj:Graph<ObjectType,EdgeType>, nodeMap: StructureMap<ObjectType>, edgeMap:StructureMap<EdgeType>){
        this.src = srcObj;
        this.trg = trgObj;
        this.nodeArrow = new TotalFunction(this.src.nodeSet,this.trg.nodeSet,nodeMap);
        this.edgeArrow = new TotalFunction(this.src.edgeSet,this.trg.edgeSet,edgeMap);
    }
    pconstructor2(srcObj:Graph<ObjectType,EdgeType>, trgObj:Graph<ObjectType,EdgeType>, nodeMap: TotalFunction<ObjectType>, edgeMap:TotalFunction<EdgeType>){
        this.src = srcObj;
        this.trg = trgObj;
        this.nodeArrow = nodeMap;
        this.edgeArrow = edgeMap;
    }

    then(g: GraphMorphism<ObjectType,EdgeType>): GraphMorphism<ObjectType,EdgeType>{
        const tnodeMap = this.nodeArrow.then(g.nodeArrow);
        const tedgeMap = this.edgeArrow.then(g.edgeArrow);
        return new GraphMorphism<ObjectType,EdgeType>(this.src,g.trg,tnodeMap,tedgeMap);
    }
    equals(g:GraphMorphism<ObjectType,EdgeType>): boolean{
        return this.src.equals(g.src) && this.trg.equals(g.trg) && this.nodeArrow.equals(g.nodeArrow) && this.edgeArrow.equals(g.edgeArrow);
    }
    apply(G:Graph<ObjectType,EdgeType>){
        const nodeSet = G.nodeSet.map(node => this.nodeArrow.apply(node)) as CatSet<ObjectType>
        const edgeSet = G.edgeSet.map(node => this.edgeArrow.apply(node)) as CatSet<EdgeType>
        const srcSet = Array.from(G.src.entries()).map( ([edge,node]) => [this.edgeArrow.apply(edge), this.nodeArrow.apply(node)]) as [EdgeType,ObjectType][]
        const trgSet = Array.from(G.trg.entries()).map( ([edge,node]) => [this.edgeArrow.apply(edge), this.nodeArrow.apply(node)]) as [EdgeType,ObjectType][]
        const G2 = new Graph()
        G2.nodeSet = nodeSet;
        G2.edgeSet = edgeSet;
        G2.src = new Map(srcSet)
        G2.trg = new Map(trgSet)
        return G2
    }
}