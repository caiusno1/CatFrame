/*
Can currently only handle flat objects and numbers
*/
export class StructureMap<obj> implements Map<obj,obj>{
    private interanlMap: Map<string,obj>
    private interanlMap1: Map<obj,obj>
    private mode = 0;
    clear(): void {
        if(this.mode === 0){
            return this.interanlMap.clear()
        }
        else {
            return this.interanlMap1.clear()
        }
    }
    delete(key: obj): boolean {
        if(this.mode === 0){
            return this.interanlMap.delete(this.serializeStructure(key))
        } else {
            return this.interanlMap1.delete(key)
        }
    }
    forEach(callbackfn: (value: obj, key: obj, map: Map<obj, obj>) => void, thisArg?: any): void {
        if(this.mode === 0){
            return this.interanlMap.forEach((v,k,m) => callbackfn(v,this.deserializeStructure(k),this),thisArg);
        } else {
            return this.interanlMap1.forEach((v,k,m) => callbackfn(v,k,this),thisArg);
        }
    }
    get(key: obj): obj {
        if(this.mode === 0){
            return this.interanlMap.get(this.serializeStructure(key))
        } else {
            return this.interanlMap1.get(key)
        }
    }
    has(key: obj): boolean {
        if(this.mode === 0){
            return this.interanlMap.has(this.serializeStructure(key))
        } else {
            return this.interanlMap1.has(key)
        }
    }
    set(key: obj, value: obj): this {
        if(this.mode === 0){
            this.interanlMap.set(this.serializeStructure(key),value)
        } else {
            this.interanlMap1.set(key,value)
        }
        return this
    }
    equals(map: StructureMap<obj>){
        if(this.mode === 0){
            return Array.from(this.interanlMap.entries()).every(([key, value]) => this.serializeStructure(map.interanlMap.get(key)) === this.serializeStructure(value))
                // tslint:disable-next-line: triple-equals
                && Array.from(map.interanlMap.entries()).every(([key, value]) => this.serializeStructure(this.interanlMap.get(key)) === this.serializeStructure(value))
        } else {
            return Array.from(this.interanlMap1.entries()).every(([key, value]) => map.interanlMap1.get(key) === value)
                // tslint:disable-next-line: triple-equals
                && Array.from(map.interanlMap1.entries()).every(([key, value]) => this.interanlMap1.get(key) === value)
        }
    }
    size: number
    [Symbol.iterator](): IterableIterator<[obj, obj]> {
        if(this.mode === 0){
            return Array.from(this.interanlMap.entries()).map(([a,b],i,self) => [this.deserializeStructure(a),b] as [obj,obj])[Symbol.iterator]()
        } else {
            return Array.from(this.interanlMap1.entries()).map(([a,b],i,self) => [a,b] as [obj,obj])[Symbol.iterator]()
        }
    }
    entries(): IterableIterator<[obj, obj]> {
        if(this.mode === 0){
            return Array.from(this.interanlMap.entries()).map(([a,b],i,self) => [this.deserializeStructure(a),b] as [obj,obj])[Symbol.iterator]()
        } else {
            return Array.from(this.interanlMap1.entries()).map(([a,b],i,self) => [a,b] as [obj,obj])[Symbol.iterator]()
        }
    }
    keys(): IterableIterator<obj> {
        if(this.mode === 0){
            return Array.from(this.interanlMap.keys()).map((key,i,self) => this.deserializeStructure(key))[Symbol.iterator]()
        } else {
            return Array.from(this.interanlMap1.keys()).map((key,i,self) => key)[Symbol.iterator]()
        }
    }
    values(): IterableIterator<obj> {
        if(this.mode === 0){
            return this.interanlMap.values()
        } else {
            return this.interanlMap1.values()
        }
    }
    constructor(a:[obj,obj][], mode:"structureMap"|"productionMap" = "structureMap"){
        if(mode === "structureMap"){
            this.interanlMap = new Map<string,obj>(a.map(o => [this.serializeStructure(o[0]),o[1]]) as [string, obj][])
            this.mode = 0;
        }
        else {
            this.interanlMap1 = new Map<obj,obj>(a);
            this.mode = 1;
        }
    }
    [Symbol.toStringTag]: string
    private serializeStructure(a:obj):string{
        // Could be implemented faster
        if(isNaN(a as any as number)){
            const newObj:any = {}
            for(const key of Object.getOwnPropertyNames(a).sort()){
                newObj[key] = (a as any)[key]
            }
            return JSON.stringify(newObj)
        } else {
            return ""+a
        }
    }
    private deserializeStructure(a:string):obj{
        // Could be implemented faster
        // assumes that an object in JSON format starts with '{'
        if(a.startsWith("{"))
            return JSON.parse(a)
        else if (!isNaN(a as any as number))
            return Number.parseFloat(a) as any as obj
    }
}