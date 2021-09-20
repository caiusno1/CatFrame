import { TotalFunction } from './TotalFunction';
export declare class TotalFunctionRepresentation<obj> {
    totalFun: TotalFunction<obj>;
    constructor(totalFunction: TotalFunction<obj>);
    then(g: TotalFunctionRepresentation<obj>): TotalFunctionRepresentation<obj>;
    apply(a: obj): obj;
    appendInPlace(a: obj, b: obj): void;
    combineInPlace(a: TotalFunctionRepresentation<obj>): void;
    equals(g: TotalFunctionRepresentation<obj>): boolean;
}
