import { TCatMorphism } from './TCatMorphism';
import { TotalFunction } from './../Set/TotalFunction';
import { TCatCat } from './TCatCat';
import { SetCat } from '../Set/SetCat';
import { StructureMap } from '../../Helpers/StructureMap';
import { CatSet } from '../Set/CatSet';
import { TCat } from './TCat';
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
const setCat = new SetCat(numComparer);

describe('Typing Category unit tests', () => {
    test('instantiate Typing Category', () => {
        const tsetCat = new TCatCat(setCat)
    });
    test('test pushout', () => {
        const tsetCat = new TCatCat(setCat)

        const src1 = new CatSet(numComparer,1,2);
        const trg1 = new CatSet(numComparer,1);
        const mapping1 = new StructureMap([[1,1],[2,1]]);
        const catTypeArrow1 = new TotalFunction(src1,trg1,mapping1)
        const tset1 = new TCat(catTypeArrow1);

        const src2 = new CatSet(numComparer,1,2);
        const trg2 = new CatSet(numComparer,1);
        const mapping2 = new StructureMap([[1,1],[2,1]]);
        const catTypeArrow2 = new TotalFunction(src2,trg2,mapping2)
        const tset2 = new TCat(catTypeArrow2);

        const src3 = new CatSet(numComparer,1,2);
        const trg3 = new CatSet(numComparer,1);
        const mapping3 = new StructureMap([[1,1],[2,1]]);
        const catTypeArrow3 = new TotalFunction(src3,trg3,mapping3)
        const tset3 = new TCat(catTypeArrow3);

        const fobjmap = new TotalFunction(src1,src2,new StructureMap([[1,1],[2,2]]))
        const ftypemap = new TotalFunction(trg1,trg2,new StructureMap([[1,1]]))

        const f = new TCatMorphism(tset1,tset2,fobjmap,ftypemap)

        const gobjmap = new TotalFunction(src2,src3,new StructureMap([[1,1],[2,2]]))
        const gtypemap = new TotalFunction(trg2,trg3,new StructureMap([[1,1]]))

        const g = new TCatMorphism(tset2,tset3,gobjmap,gtypemap)

        const hobjmap = new TotalFunction(src1,src3,new StructureMap([[1,1],[2,2]]))
        const htypemap = new TotalFunction(trg1,trg3,new StructureMap([[1,1]]))

        const h = new TCatMorphism(tset1,tset3,hobjmap,htypemap)
        const pushout = tsetCat.pushout(f,h)

        expect(pushout[0].trg.equals(tset2)).toBeTruthy();
    });
    test('test coproduct', () => {
        const tsetCat = new TCatCat(setCat)

        const src1 = new CatSet(numComparer,1,2);
        const trg1 = new CatSet(numComparer,1);
        const mapping1 = new StructureMap([[1,1],[2,1]]);
        const catTypeArrow1 = new TotalFunction(src1,trg1,mapping1)
        const tset1 = new TCat(catTypeArrow1);

        const src2 = new CatSet(numComparer,1,2);
        const trg2 = new CatSet(numComparer,1);
        const mapping2 = new StructureMap([[1,1],[2,1]]);
        const catTypeArrow2 = new TotalFunction(src2,trg2,mapping2)
        const tset2 = new TCat(catTypeArrow2);

        const src3 = new CatSet(numComparer,1,1,2,2);
        const trg3 = new CatSet(numComparer,1,1);
        const mapping3 = new StructureMap([[1,1],[2,1]]);
        const catTypeArrow3 = new TotalFunction(src3,trg3,mapping3)
        const tset3 = new TCat(catTypeArrow3);

        expect(tsetCat.coproduct(tset1,tset2)[0].trg.equals(tset3)).toBeTruthy();
    });
});