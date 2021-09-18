import { Cat } from './../Cat/Cat';
import { StructureMap } from '../../Helpers/StructureMap';
import { CatSet } from './CatSet';
import { TotalFunction } from './TotalFunction';
import { TotalFunctionRepresentation } from './TotalFunctionRepresentation';
import { Arrow } from '../Cat/Arrow';
export class SetCat<obj> implements Cat<CatSet<obj>>{
    private readonly compare: (obj1: obj, obj2: obj) => boolean
    constructor(objcomp: any){
        this.compare = objcomp;
    }
    mergeArrow(a: TotalFunction<obj>, b: TotalFunction<obj>): TotalFunction<obj>{
        const src = this.coproduct(a.getSrc(),b.getSrc())[0].trg;
        const trg = this.coproduct(a.getTrg(),b.getTrg())[0].trg;
        const mappings = [...a.getMapping().entries(),...b.getMapping().entries()];
        return new TotalFunction(src,trg,new StructureMap(mappings))
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
        const hmap = new StructureMap(hmapentries);
        return new TotalFunction(g.trg,f.trg,hmap);
    }
    // id: (obj: CatSet<obj>) => Arrow<CatSet<obj>>;
    id = (objSet:CatSet<obj>) => new TotalFunction(objSet,objSet,new StructureMap<obj>(Array.from(objSet.values()).map((a,b,c) => [a,a]) as [obj,obj][]))
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
        const mapping1 = new StructureMap<obj>([])
        const mapping2 = new StructureMap<obj>([])
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
        const keys = new Set([...f.src,...g.src])
        const allvalues = new Set([...f.trg,...f.trg])
        const values = new Set([])
        const mappedValues = []
        const mapping = new StructureMap<obj>([])
        for(const key of keys){
            if(f.apply(key) && g.apply(key)){
                mapping.set(f.apply(key),f.apply(key))
                mapping.set(g.apply(key),f.apply(key))
                values.add(f.apply(key))
                mappedValues.push(f.apply(key));
                mappedValues.push(g.apply(key));
                allvalues.delete(f.apply(key))
                allvalues.delete(g.apply(key))
            }
        }
        for(const value of allvalues){
                mapping.set(value,value);
                mappedValues.push(value);
                values.add(value)
        }
        const src = new CatSet(this.compare,...mappedValues)
        const trg = new CatSet(this.compare,...values)
        return new TotalFunction(src,trg,mapping)
    }
    pushout(f:TotalFunction<obj>,g:TotalFunction<obj>){
        const coproduct = this.coproduct(f.trg,g.trg);
        const equal = this.coequalizer(f.then(coproduct[0]),g.then(coproduct[1]))
        return [coproduct[0].then(equal),coproduct[1].then(equal)]
    }
}