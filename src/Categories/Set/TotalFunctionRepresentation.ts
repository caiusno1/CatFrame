import { TotalFunction } from './TotalFunction';
export class TotalFunctionRepresentation<obj>{
    public totalFun: TotalFunction<obj>
    constructor(totalFunction: TotalFunction<obj>){
        this.totalFun = totalFunction
    }
    public then(g: TotalFunctionRepresentation<obj>): TotalFunctionRepresentation<obj> {
        return new TotalFunctionRepresentation(this.totalFun.then(g.totalFun));
    }
    public apply(a: obj): obj {
        return this.totalFun.apply(a)
    }
    public appendInPlace(a: obj, b: obj){
        this.totalFun.getMapping().set(a,b);
    }
    public combineInPlace(a: TotalFunctionRepresentation<obj>){
        a.totalFun.getMapping().forEach((itemOne,itemTwo,inmap) => this.totalFun.getMapping().set(itemOne,itemTwo))
    }
    public equals(g: TotalFunctionRepresentation<obj>): boolean {
        return this.totalFun.equals(g.totalFun)
    }

}