import { TCatMorphism } from './TCatMorphism';
import { SetCat } from '../Set/SetCat';
import { Arrow } from '../Cat/Arrow';
import { StructureMap } from '../../Helpers/StructureMap';
import { TotalFunctionRepresentation } from '../Set/TotalFunctionRepresentation';
import { CatSet } from '../Set/CatSet';
import { Cat } from '../Cat/Cat';
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
    test('NumTypeSet Morphism composition', () => {
        const set1 = new CatSet(numComparer, 1)
        const set2 = new CatSet(numComparer, 1)
        const map = new StructureMap<number>([[1,1]]);
        const NumTypeSet = new TCat<CatSet<number>,SetCat<number>>(new TotalFunction(set1,set2,map) as Arrow<CatSet<number>>);

        const set12 = new CatSet(numComparer, 2)
        const set22 = new CatSet(numComparer, 2)
        const map2 = new StructureMap<number>([[2,2]]);
        const NumTypeSet2 = new TCat<CatSet<number>,SetCat<number>>(new TotalFunction(set12,set22,map2) as Arrow<CatSet<number>>);

        const set13 = new CatSet(numComparer, 3)
        const set23 = new CatSet(numComparer, 3)
        const map3 = new StructureMap<number>([[3,3]]);
        const NumTypeSet3 = new TCat<CatSet<number>,SetCat<number>>(new TotalFunction(set13,set23,map3) as Arrow<CatSet<number>>);

        const arrowMapf = new StructureMap([[1,2]]);
        const arrowTypeMapf = new StructureMap([[1,2]]);

        const arrowMapg = new StructureMap([[2,3]]);
        const arrowTypeMapg = new StructureMap([[2,3]]);

        const arrowMaphprime = new StructureMap([[1,3]]);
        const arrowTypeMaphprime = new StructureMap([[1,3]]);

        const f = new TCatMorphism(NumTypeSet,NumTypeSet2, new TotalFunction(set1,set12,arrowMapf), new TotalFunction(set2,set22,arrowTypeMapf));
        const g = new TCatMorphism(NumTypeSet2,NumTypeSet3, new TotalFunction(set12,set13,arrowMapg), new TotalFunction(set22,set23,arrowTypeMapg));
        const h = f.then(g);
        const hprime = new TCatMorphism(NumTypeSet,NumTypeSet3, new TotalFunction(set1,set13,arrowMaphprime), new TotalFunction(set2,set23,arrowTypeMaphprime));
        expect(h.equals(hprime)).toBeTruthy();
    });
});