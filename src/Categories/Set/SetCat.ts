import { Cat } from './../Cat/Cat';
import { StructureMap } from '../../Helpers/StructureMap';
import { CatSet } from './CatSet';
import { TotalFunction } from './TotalFunction';
import { TotalFunctionRepresentation } from './TotalFunctionRepresentation';
import { Arrow } from '../Cat/Arrow';
export class SetCat<obj> implements Cat<CatSet<obj>>{
    private readonly compare: (obj1: obj, obj2: obj) => boolean
    private readonly mode: "structureMap"|"productionMap"
    constructor(objcomp: any, mode: "structureMap"|"productionMap" = "structureMap"){
        this.compare = objcomp;
        this.mode = mode
    }
    toAbstractCat(){
        return this as Cat<CatSet<obj>>
    }
    mergeArrow(a: TotalFunction<obj>, b: TotalFunction<obj>): TotalFunction<obj>{
        const src = this.coproduct(a.getSrc(),b.getSrc())[0].trg;
        const trg = this.coproduct(a.getTrg(),b.getTrg())[0].trg;
        const mappings = [...a.getMapping().entries(),...b.getMapping().entries()];
        return new TotalFunction(src,trg,new StructureMap(mappings, this.mode))
    }
    // f = g;out
    closeTriangle(f: TotalFunction<obj>,g: TotalFunction<obj>): TotalFunction<obj>{
        if(!f.src.equals(g.src)){
            // tslint:disable-next-line:no-console
            console.log("input is invalid");
        }
        const fmap = f.getMapping();
        const gmap = f.getMapping();

        const hmapentries:[obj,obj][] = new Array<[obj,obj]>();
        for(const gsrc of gmap.keys()){
            const htrg = f.apply(gsrc);
            const hsrc = g.apply(gsrc);
            hmapentries.push([hsrc,htrg])
        }
        const hmap = new StructureMap(hmapentries, this.mode);
        return new TotalFunction(g.trg,f.trg,hmap);
    }
    // id: (obj: CatSet<obj>) => Arrow<CatSet<obj>>;
    id = (objSet:CatSet<obj>) => new TotalFunction(objSet,objSet,new StructureMap<obj>(Array.from(objSet.values()).map((a,b,c) => [a,a]) as [obj,obj][], this.mode))
    then(f: TotalFunctionRepresentation<obj>,g: TotalFunctionRepresentation<obj>){
        return f.then(g);
    }
    createMorphism(): TotalFunctionRepresentation<obj>{
        const set1 = new CatSet<obj>(this.compare);
        const set2 = new CatSet<obj>(this.compare);
        return new TotalFunctionRepresentation<obj>(new TotalFunction<obj>(set1,set2,new StructureMap<obj>([])));
    }
    coproduct(a:obj[],b:obj[]): [TotalFunction<obj>,TotalFunction<obj>]{
        const set1 = new CatSet<obj>(this.compare,...a)
        const set2 = new CatSet<obj>(this.compare,...b)
        const union = new CatSet<obj>(this.compare)
        const mapping1 = new StructureMap<obj>([], this.mode)
        const mapping2 = new StructureMap<obj>([], this.mode)
        for(const elem1 of set1){
            mapping1.set(elem1,elem1)
            union.push(elem1)
        }
        for(const elem2 of set2){
            mapping2.set(elem2,elem2)
            union.push(elem2)
        }
        return [new TotalFunction(set1,union,mapping1),new TotalFunction(set2,union,mapping2)];
    }
    coequalizer(f:TotalFunction<obj>,g:TotalFunction<obj>): TotalFunction<obj>{
        const mapping = new StructureMap<obj>([], this.mode)
        const targetSet = new CatSet(f.trg.compare)
        for(const srcObj of f.src){
            if(f.apply(srcObj) && f.apply(srcObj)){
                mapping.set(f.apply(srcObj),f.apply(srcObj))
                mapping.set(g.apply(srcObj),f.apply(srcObj))
                targetSet.push(f.apply(srcObj))
            }
            else if(f.apply(srcObj)){
                mapping.set(f.apply(srcObj),f.apply(srcObj))
                targetSet.push(f.apply(srcObj))
            }
            else if(g.apply(srcObj)){
                mapping.set(g.apply(srcObj),g.apply(srcObj))
                targetSet.push(g.apply(srcObj))
            }
        }
        const haveNoProjectionFromDefinition = Array.from(f.trg).filter((trgObj) => !Array.from(f.getMapping().values()).includes(trgObj) && ! Array.from(g.getMapping().values()).includes(trgObj))
        for(const toIdMappable of haveNoProjectionFromDefinition){
            mapping.set(toIdMappable,toIdMappable)
        }
        return new TotalFunction(f.trg, targetSet,mapping)
    }
    pushout(f:TotalFunction<obj>,g:TotalFunction<obj>){
        const coproduct = this.coproduct(f.trg,g.trg);
        const equal = this.coequalizer(f.then(coproduct[0]),g.then(coproduct[1]))
        return [coproduct[0].then(equal),coproduct[1].then(equal)]
    }
}