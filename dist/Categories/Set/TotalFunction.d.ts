import { StructureMap } from './../../Helpers/StructureMap';
import { Arrow } from '../Cat/Arrow';
import { CatSet } from './CatSet';
export declare class TotalFunction<InternalObjectType> implements Arrow<CatSet<InternalObjectType>> {
    src: CatSet<InternalObjectType>;
    trg: CatSet<InternalObjectType>;
    protected mapping: StructureMap<InternalObjectType>;
    then(g: TotalFunction<InternalObjectType>): TotalFunction<InternalObjectType>;
    apply(a: InternalObjectType): InternalObjectType;
    equals(g: TotalFunction<InternalObjectType>): boolean;
    getMapping(): StructureMap<InternalObjectType>;
    getSrc(): CatSet<InternalObjectType>;
    getTrg(): CatSet<InternalObjectType>;
    constructor(src: CatSet<InternalObjectType>, trg: CatSet<InternalObjectType>, mapping: StructureMap<InternalObjectType>);
}
