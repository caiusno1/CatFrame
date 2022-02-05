import { TripleMorphism } from './TripleMorphism';
import { TripleCat } from './TripleCat';
import { Cat } from "../Cat/Cat";
import { CatSet } from "../Set/CatSet";
import { SetCat } from "../Set/SetCat";
import { TotalFunction } from '../Set/TotalFunction';
import { StructureMap } from '../../Helpers/StructureMap';
import { CatTriple } from './CatTriple';

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
const cat = new SetCat<object>(flatObjCompare, "productionMap").toAbstractCat()
const tripleSet = new TripleCat<CatSet<object>,Cat<CatSet<object>>>(cat)

describe('Triple Category unit tests', () => {
    test('Create Triple Cat', () => {
        expect(tripleSet).toBeTruthy()
    })
    test('Triple Cat coproduct', () => {

        const obj1 = {value:1}
        const obj2 = {value:2}
        const obj3 = {value:3}

        const obj12 = {value:1}
        const obj22 = {value:2}
        const obj32 = {value:3}

        const set1 = new CatSet<object>(flatObjCompare, obj1)
        const set2 = new CatSet<object>(flatObjCompare, obj2)
        const set3 = new CatSet<object>(flatObjCompare, obj3)
        const totalLeft = new TotalFunction(set2,set1,new StructureMap([[obj2,obj1]],"productionMap"))
        const totalRight = new TotalFunction(set2,set3,new StructureMap([[obj2,obj3]],"productionMap"))
        const CatTripleObj = new CatTriple(totalLeft,totalRight)

        const set12 = new CatSet<object>(flatObjCompare, obj12)
        const set22 = new CatSet<object>(flatObjCompare, obj22)
        const set32 = new CatSet<object>(flatObjCompare, obj32)
        const totalLeft2 = new TotalFunction(set22,set12,new StructureMap([[obj22,obj12]],"productionMap"))
        const totalRight2 = new TotalFunction(set22,set32,new StructureMap([[obj22,obj32]],"productionMap"))
        const CatTripleObj2 = new CatTriple(totalLeft2,totalRight2)

        const set13 = new CatSet<object>(flatObjCompare, obj1,obj12)
        const set23 = new CatSet<object>(flatObjCompare, obj2,obj22)
        const set33 = new CatSet<object>(flatObjCompare, obj3,obj32)

        const totalLeft3 = new TotalFunction(set2,set1,new StructureMap([[obj2,obj1]],"productionMap"))
        const totalRight3 = new TotalFunction(set2,set3,new StructureMap([[obj2,obj3]],"productionMap"))
        const CatTripleObj3 = new CatTriple(totalLeft,totalRight)

        const Coproduct11 = new TotalFunction(set1,set13,new StructureMap([[obj1,obj1]],"productionMap"))
        const Coproduct12 = new TotalFunction(set2,set23,new StructureMap([[obj2,obj2]],"productionMap"))
        const Coproduct13 = new TotalFunction(set3,set33,new StructureMap([[obj3,obj3]],"productionMap"))

        const TripleCoproduct1 = new TripleMorphism(CatTripleObj,CatTripleObj3,Coproduct11,Coproduct12,Coproduct13)

        const coproduct = tripleSet.coproduct(CatTripleObj,CatTripleObj2);
        expect(coproduct[0].trg.equals(CatTripleObj3))
        expect(coproduct[1].trg.equals(CatTripleObj3))
        expect(coproduct[0].src.equals(CatTripleObj))
        expect(coproduct[1].src.equals(CatTripleObj2))
        expect(TripleCoproduct1.equals(coproduct[0]))
    })
    test('Triple Cat coequaliser', () => {

        const obj1orig = {value:1}
        const obj2orig = {value:2}
        const obj3orig = {value:3}

        const obj1target = {value:1}
        const obj2target = {value:2}
        const obj3target = {value:3}

        const set1orig = new CatSet<object>(flatObjCompare, obj1orig)
        const set2orig = new CatSet<object>(flatObjCompare, obj2orig)
        const set3orig = new CatSet<object>(flatObjCompare, obj3orig)
        const totalLeftorig = new TotalFunction(set2orig,set1orig,new StructureMap([[obj2orig,obj1orig]],"productionMap"))
        const totalRightorig = new TotalFunction(set2orig,set3orig,new StructureMap([[obj2orig,obj3orig]],"productionMap"))
        const CatTripleObjorig = new CatTriple(totalLeftorig,totalRightorig)

        const set1target = new CatSet<object>(flatObjCompare, obj1target)
        const set2target= new CatSet<object>(flatObjCompare, obj2target)
        const set3target= new CatSet<object>(flatObjCompare, obj3target)
        const totalLefttarget = new TotalFunction(set2target,set1target,new StructureMap([[obj2target,obj1target]],"productionMap"))
        const totalRighttarget = new TotalFunction(set2target,set3target,new StructureMap([[obj2target,obj3target]],"productionMap"))
        const CatTripleObjtarget = new CatTriple(totalLefttarget,totalRighttarget)

        const fLeft = new TotalFunction(set1orig,set1target,new StructureMap([[obj1orig,obj1target]],"productionMap"))
        const fMid = new TotalFunction(set2orig,set2target,new StructureMap([[obj2orig,obj2target]],"productionMap"))
        const fRight = new TotalFunction(set3orig,set3target,new StructureMap([[obj3orig,obj3target]],"productionMap"))

        const gLeft = new TotalFunction(set1orig,set1target,new StructureMap([[obj1orig,obj1target]],"productionMap"))
        const gMid = new TotalFunction(set2orig,set2target,new StructureMap([[obj2orig,obj2target]],"productionMap"))
        const gRight = new TotalFunction(set3orig,set3target,new StructureMap([[obj3orig,obj3target]],"productionMap"))

        const f = new TripleMorphism(CatTripleObjorig,CatTripleObjtarget,fLeft,fRight, fMid)
        const g = new TripleMorphism(CatTripleObjorig,CatTripleObjtarget,gLeft,gRight, gMid)

        const coequaliser = tripleSet.coequalizer(f,g)
        expect(coequaliser.equals(tripleSet.id(CatTripleObjtarget))).toBeTruthy()
    })

})