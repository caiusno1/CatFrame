import { SetCat } from './../Set/SetCat';
import { Arrow } from './../Cat/Arrow';
import { StructureMap } from './../../Helpers/StructureMap';
import { TotalFunctionRepresentation } from './../Set/TotalFunctionRepresentation';
import { CatSet } from '../Set/CatSet';
import { Cat } from './../Cat/Cat';
import { TCat } from './TCat';
import { TotalFunction } from '../Set/TotalFunction';
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

describe('Typing Category unit tests', () => {
    test('NumTypeSet create', () => {
        const set1 = new CatSet<number>(numComparer, 1)
        const set2 = new CatSet<number>(numComparer, 1)
        const map = new StructureMap<number>([[1,1]]);
        const NumTypeSet = new TCat<CatSet<number>,Cat<CatSet<number>>>(new TotalFunction(set1,set2,map) as Arrow<CatSet<number>>);
    });
    test('NumTypeSet access obj', () => {
        const set1 = new CatSet<number>(numComparer, 1)
        const set2 = new CatSet<number>(numComparer, 2)
        const map = new StructureMap<number>([[1,2]]);
        const NumTypeSet = new TCat<CatSet<number>,Cat<CatSet<number>>>(new TotalFunction(set1,set2,map) as Arrow<CatSet<number>>);
        expect(NumTypeSet.getObject()[0]).toBe(1)
        expect(NumTypeSet.getTypeObject()[0]).toBe(2)
    });
    test('NumTypeSet equals', () => {
        const set1 = new CatSet<number>(numComparer, 1)
        const set2 = new CatSet<number>(numComparer, 2)
        const map = new StructureMap<number>([[1,2]]);
        const NumTypeSet = new TCat<CatSet<number>,Cat<CatSet<number>>>(new TotalFunction(set1,set2,map) as Arrow<CatSet<number>>);

        const set12 = new CatSet<number>(numComparer, 1)
        const set22 = new CatSet<number>(numComparer, 2)
        const map2 = new StructureMap<number>([[1,2]]);
        const NumTypeSet2 = new TCat<CatSet<number>,Cat<CatSet<number>>>(new TotalFunction(set12,set22,map2) as Arrow<CatSet<number>>);

        expect(NumTypeSet.equals(NumTypeSet2)).toBeTruthy();
    });
});