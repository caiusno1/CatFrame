import { Cat } from './../Cat/Cat';
import { CatSet } from './CatSet';
import { TotalFunction } from './TotalFunction';
import { TotalFunctionRepresentation } from './TotalFunctionRepresentation';
export declare class SetCat<obj> implements Cat<CatSet<obj>> {
    private readonly compare;
    private readonly mode;
    constructor(objcomp: any, mode?: "structureMap" | "productionMap");
    toAbstractCat(): Cat<CatSet<obj>>;
    mergeArrow(a: TotalFunction<obj>, b: TotalFunction<obj>): TotalFunction<obj>;
    closeTriangle(f: TotalFunction<obj>, g: TotalFunction<obj>): TotalFunction<obj>;
    id: (objSet: CatSet<obj>) => TotalFunction<obj>;
    then(f: TotalFunctionRepresentation<obj>, g: TotalFunctionRepresentation<obj>): TotalFunctionRepresentation<obj>;
    createMorphism(): TotalFunctionRepresentation<obj>;
    coproduct(a: obj[], b: obj[]): [TotalFunction<obj>, TotalFunction<obj>];
    coequalizer(f: TotalFunction<obj>, g: TotalFunction<obj>): TotalFunction<obj>;
    pushout(f: TotalFunction<obj>, g: TotalFunction<obj>): TotalFunction<obj>[];
}
