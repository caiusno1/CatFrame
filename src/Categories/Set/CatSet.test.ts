import { SetCat } from './SetCat';
import { CatSet } from './CatSet';

function numComparer(a: number, b: number) {
    return a === b;
}
function strComparer(a: string, b: string) {
    return a === b;
}
function flatObjCompare(a:any,b:any){
    if(Object.keys(a).every((item) => !['number','string'].includes(typeof a[item]) || a[item] === b[item])) {
        return true;
    }
    return false;
}
const NumSets = new SetCat<number>(numComparer);

describe('Set unit tests', () => {
    test('(1),(1) equals', () => {
        const set1 = new CatSet<number>(numComparer, 1)
        const set2 = new CatSet<number>(numComparer, 1)
        expect(set1.equals(set2)).toBeTruthy();
    })
    test('(1),(2) not equals but isomorph', () => {
        const set1 = new CatSet<string>(strComparer, "1")
        const set2 = new CatSet<string>(strComparer, "2")
        expect(set1.equals(set2)).toBeFalsy();
        expect(set1.isomorph(set2)).toBeTruthy();
    })
    test('({a:5,k:7}),({a:5,k:7}) equals and isomorph', () => {
        const set1a = new CatSet<object>(flatObjCompare, {a:5,k:7,o:{a:32}})
        const set2a = new CatSet<object>(flatObjCompare, {a:5,k:7})
        expect(set1a.equals(set2a)).toBeTruthy();
        expect(set1a.isomorph(set2a)).toBeTruthy();
    })
    test('({i:5,k:7}),({a:3,k:9}) not equals but isomorph', () => {
        const set1 = new CatSet<object>(flatObjCompare, {i:5,k:7})
        const set2 = new CatSet<object>(flatObjCompare, {a:3,k:9})
        expect(set1.equals(set2)).toBeFalsy();
        expect(set1.isomorph(set2)).toBeTruthy();
    })
    test('(1),(1,2) not equals and not isomorph', () => {
        const set1 = new CatSet<number>(numComparer, 1)
        const set2 = new CatSet<number>(numComparer, 1, 2)
        expect(set1.equals(set2)).toBeFalsy();
        expect(set1.isomorph(set2)).toBeFalsy();
    })
    test('one element set contains this element (prior bug)', () => {
        const set1 = new CatSet(numComparer, 1)
        expect(set1.includes(1)).toBeTruthy();
    })
});