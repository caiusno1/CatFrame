import { Cat } from "../Cat/Cat";

export class CatSet<a> extends Array<a>{
    public readonly compare: (obj1: a, obj2: a) => boolean
    constructor(objcomparer: (obj1: a, obj2: a) => boolean, ...elements: a[]) {
        if(elements.length>1 || elements.length<1){
            super(...elements)
        }
        else {
            super()
            this.push(elements[0])
        }
        this.compare = objcomparer;
    }
    equals(b: CatSet<a>) {
        if (this.length !== b.length) {
            return false
        }
        const set1Vals = Array.from(this.values());
        const set2Vals = Array.from(b.values());

        if (set1Vals.every((anElement) => set2Vals.some((arrayElement) => this.compare(anElement, arrayElement)))) {
            return true;
        }
        return false;
    }
    isomorph(b: CatSet<a>) {
        return this.length === b.length
    }
    enoughEqual(b: CatSet<a>){
        const set1Vals = Array.from(this.values());
        const set2Vals = Array.from(b.values());
        if (set1Vals.every((anElement) => set2Vals.some((arrayElement) => this.compare(anElement, arrayElement)))) {
            return true;
        }
        return false
    }
}