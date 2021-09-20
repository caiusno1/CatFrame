export declare class CatSet<a> extends Array<a> {
    readonly compare: (obj1: a, obj2: a) => boolean;
    constructor(objcomparer: (obj1: a, obj2: a) => boolean, ...elements: a[]);
    equals(b: CatSet<a>): boolean;
    isomorph(b: CatSet<a>): boolean;
    enoughEqual(b: CatSet<a>): boolean;
}
