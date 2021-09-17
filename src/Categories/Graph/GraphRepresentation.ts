import { TotalFunction } from './../Set/TotalFunction';
import { CatSet } from '../Set/CatSet';
import { SetCat } from '../Set/SetCat';
import { Graph } from './Graph';
import { GraphMorphism } from './GraphMorphism';
export class GraphRepresentation<ObjectType,EdgeType>{
    private internalGraph: Graph<ObjectType,EdgeType>
    private nodeEq: (obj1: ObjectType, obj2: ObjectType) => boolean
    private edgeEq: (obj1: EdgeType, obj2: EdgeType) => boolean
    id: (obj: Graph<ObjectType,EdgeType>) => GraphMorphism<ObjectType,EdgeType>;
    constructor(objCmp:(obj1: ObjectType, obj2: ObjectType) => boolean, edgeCmp:(obj1: EdgeType, obj2: EdgeType) => boolean){
        this.nodeEq = objCmp;
        this.edgeEq = edgeCmp;
        const nodesUniverse = new SetCat<ObjectType>(objCmp);
        const edgeUniverse = new SetCat<EdgeType>(edgeCmp);
        this.internalGraph = new Graph();
        this.internalGraph.nodeSet = new CatSet(objCmp)
        this.internalGraph.edgeSet = new CatSet(edgeCmp)
        this.internalGraph.src = new Map()
        this.internalGraph.trg = new Map()
        this.id = (obj) =>  new GraphMorphism(obj,obj, (nodesUniverse.id(obj.nodeSet) as any).totalFun,( edgeUniverse.id(obj.edgeSet) as any).totalFun);
    }
    createNode(node:ObjectType){
        this.internalGraph.nodeSet.push(node);
    }
    createEdge(from:ObjectType,to:ObjectType,edge:EdgeType){
        const fromMaybe = this.internalGraph.nodeSet.find(a => this.nodeEq(a,from))
        const toMaybe = this.internalGraph.nodeSet.find(a => this.nodeEq(a,to))
        if(fromMaybe === undefined){
            this.internalGraph.nodeSet.push(from);
        }
        if(toMaybe === undefined){
            this.internalGraph.nodeSet.push(to);
        }
        this.internalGraph.edgeSet.push(edge);
        this.internalGraph.src.set(edge,fromMaybe ? fromMaybe: from)
        this.internalGraph.trg.set(edge,toMaybe ? fromMaybe: to)
    }
    getGraph(){
        return this.internalGraph
    }
    printGraph(){
        // tslint:disable-next-line:no-console
        console.log('Nodes');
        for(const node of this.internalGraph.nodeSet){
            // tslint:disable-next-line:no-console
            console.log(node);
        }
        // tslint:disable-next-line:no-console
        console.log('Edges');
        for(const edge of this.internalGraph.edgeSet){
            // tslint:disable-next-line:no-console
            console.log(edge);
        }
    }
}