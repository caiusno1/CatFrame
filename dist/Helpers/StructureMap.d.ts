export declare class StructureMap<obj> implements Map<obj, obj> {
    private interanlMap;
    private interanlMap1;
    private mode;
    clear(): void;
    delete(key: obj): boolean;
    forEach(callbackfn: (value: obj, key: obj, map: Map<obj, obj>) => void, thisArg?: any): void;
    get(key: obj): obj;
    has(key: obj): boolean;
    set(key: obj, value: obj): this;
    equals(map: StructureMap<obj>): boolean;
    size: number;
    [Symbol.iterator](): IterableIterator<[obj, obj]>;
    entries(): IterableIterator<[obj, obj]>;
    keys(): IterableIterator<obj>;
    values(): IterableIterator<obj>;
    constructor(a: [obj, obj][], mode?: "structureMap" | "productionMap");
    [Symbol.toStringTag]: string;
    private serializeStructure;
    private deserializeStructure;
}
