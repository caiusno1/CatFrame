import { SetCat } from './SetCat';
import { StructureMap } from './../../Helpers/StructureMap';
import { Arrow } from '../Cat/Arrow';
import { CatSet } from './CatSet';
export class TotalFunction<InternalObjectType> implements Arrow<CatSet<InternalObjectType>>{
    public src: CatSet<InternalObjectType>;
    public trg: CatSet<InternalObjectType>;
    protected mapping: StructureMap<InternalObjectType>;

    public then(g: TotalFunction<InternalObjectType>): TotalFunction<InternalObjectType> {
        if (!this.trg.equals(g.src)) {
            throw new Error("Not composable");
        }

        const ftupleMap: [InternalObjectType, InternalObjectType][] = Array.from(
            this.mapping.entries()
        );

        const ftgtupleMap: ([InternalObjectType, InternalObjectType] | [InternalObjectType, null])[] = ftupleMap.map(
            ([key, value]) => {

                // BEGIN Only interesting for partial fun
                /*if (!value) {
                    return [key, null];
                }
                if (!g.mapping.has(value)) {
                    return [key, null]
                }*/

                // END Only interesting for partial fun

                return [key, g.apply(value)]
            }
        ) as ([InternalObjectType, InternalObjectType] | [InternalObjectType, null])[];

        const filteredftgtupleMap: [InternalObjectType, InternalObjectType][] = ftgtupleMap.filter(([key, value]) => value) as [InternalObjectType, InternalObjectType][]
        const map = new StructureMap<InternalObjectType>(filteredftgtupleMap);
        return new TotalFunction<InternalObjectType>(this.src, g.trg, map);
    }
    public apply(a: InternalObjectType): InternalObjectType {
        let val = null
        if(a && this.mapping.has(a)){
            val = this.mapping.get(a)
        } else {
            val = null
        }
        return val;
    }

    public equals(g: TotalFunction<InternalObjectType>): boolean {
        return this.mapping.equals(g.mapping)
    }

    getMapping(){
        return this.mapping;
    }
    getSrc(){
        return this.src;
    }
    getTrg(){
        return this.trg;
    }

    constructor(src: CatSet<InternalObjectType>, trg: CatSet<InternalObjectType>, mapping: StructureMap<InternalObjectType>) {
        this.src = src;
        this.trg = trg;
        this.mapping = mapping;
        const srcList = new CatSet(src.compare, ...Array.from(src.values()));
        const mapKeyList = new CatSet(src.compare, ...Array.from(mapping.keys()));
        if (!srcList.enoughEqual(mapKeyList)) {
            // todo needs rework (maybe)
            throw new Error("Function is not total");
        }
    }

}