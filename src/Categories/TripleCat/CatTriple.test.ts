import { TotalFunction } from './../Set/TotalFunction';
import { CatTriple } from './CatTriple';
import { SetCat } from './../Set/SetCat';
import { CatSet } from "../Set/CatSet";
import { StructureMap } from '../../Helpers/StructureMap';

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
describe('Triple Category Object unit tests', () => {
    test('Create Triple Cat Object', () => {
        const set1 = new CatSet<number>(numComparer, 1)
        const set2 = new CatSet<number>(numComparer, 2)
        const set3 = new CatSet<number>(numComparer, 3)
        const totalLeft = new TotalFunction(set2,set1,new StructureMap([[2,1]], "structureMap"))
        const totalRight = new TotalFunction(set2,set3,new StructureMap([[2,3]], "structureMap"))
        const CatTripleObj = new CatTriple(totalLeft,totalRight)
        expect(CatTripleObj).toBeTruthy()
    })
    test('Create test operations on Triple Cat Object', () => {
        const set12 = new CatSet<number>(numComparer, 1)
        const set22 = new CatSet<number>(numComparer, 2)
        const set32 = new CatSet<number>(numComparer, 3)
        const totalLeft2 = new TotalFunction(set22,set12,new StructureMap([[2,1]], "structureMap"))
        const totalRight2 = new TotalFunction(set22,set32,new StructureMap([[2,3]], "structureMap"))
        const CatTripleObj2 = new CatTriple(totalLeft2,totalRight2)

        const set1 = new CatSet<number>(numComparer, 1)
        const set2 = new CatSet<number>(numComparer, 2)
        const set3 = new CatSet<number>(numComparer, 3)
        const totalLeft = new TotalFunction(set2,set1,new StructureMap([[2,1]], "structureMap"))
        const totalRight = new TotalFunction(set2,set3,new StructureMap([[2,3]], "structureMap"))
        const CatTripleObj = new CatTriple(totalLeft,totalRight)


        expect(CatTripleObj.equals(CatTripleObj2)).toBeTruthy()
        expect(CatTripleObj.getLeftArrow().equals(totalLeft))
        expect(CatTripleObj.getRightArrow().equals(totalRight))
        expect(CatTripleObj.getLeftObject().equals(set1))
        expect(CatTripleObj.getMiddleObject().equals(set2))
        expect(CatTripleObj.getRightObject().equals(set3))
    })
})