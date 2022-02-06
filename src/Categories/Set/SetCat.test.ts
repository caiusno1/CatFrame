import { TotalFunctionRepresentation } from './TotalFunctionRepresentation';
import { TotalFunction } from './TotalFunction';
import { SetCat } from './SetCat';
import { CatSet } from './CatSet';
import { StructureMap } from '../../Helpers/StructureMap';

function numComparer(a: number, b: number) {
    return a === b;
}
function flatObjCompare(a:any,b:any){
    if(Object.keys(a).every((item) => !['number','string'].includes(typeof a[item]) || a[item] === b[item])) {
        return true;
    }
    return false;
}
const NumSets = new SetCat<number>(numComparer);
const ObjSets = new SetCat<object>(flatObjCompare);

describe('Cat of Sets unit tests', () => {
    test('id_{1,2,3}(1) = 1', () => {
        const a = new CatSet<number>(numComparer,1,2,3)
        const mappingZero = new StructureMap<number>([]);
        mappingZero.set(1,1)
        mappingZero.set(2,2)
        mappingZero.set(3,3)
        const manualId = new TotalFunction<number>(a,a,mappingZero)
        const computedID = NumSets.id(a);
        expect(manualId.equals((computedID))).toBeTruthy()
        expect(computedID.apply(1)).toBe(1)
    })
    test('coproduct({1,2,3}, {1,2,3}) = {1,1,2,2,3,3}', () => {
        const a = new CatSet<number>(numComparer,1,2,3)
        const b = new CatSet<number>(numComparer,1,2,3)
        expect(NumSets.coproduct(a,b)[0].trg.equals(new CatSet<number>(numComparer,1,2,3,1,2,3))).toBeTruthy()
        expect(NumSets.coproduct(a,b)[0].trg.equals(new CatSet<number>(numComparer,1,1,2,2,3,3))).toBeTruthy()
        // expect(NumSets.coproduct(a,b)[0].totalFun.equal(NumSets.coproduct(a,b)[1].totalFun)).toBeFalsy()
    })
    test('equalizer({1}->{2}, {1}->{3}]) = {2,3}->{2}}', () => {
        const a = new CatSet<number>(numComparer,1,6)
        const b = new CatSet<number>(numComparer,2,6)
        const c = new CatSet<number>(numComparer,3,6)
        const d = new CatSet<number>(numComparer,2,3,6)
        const f = new TotalFunction(a,b,new StructureMap<number>([[1,2],[6,6]]))
        const g = new TotalFunction(a,c,new StructureMap<number>([[1,3],[6,6]]))
        const h = new TotalFunction(d,b,new StructureMap<number>([[2,2],[3,2],[6,6]]))
        expect(NumSets.coequalizer(f,g).equals(h)).toBeTruthy()
    })
    test('pushout({1}->{2}, {1}->{3}]) = {2}->{2},{3}->{2}}', () => {
        const a = new CatSet<object>(flatObjCompare,{a:1},{d:5})
        const b = new CatSet<object>(flatObjCompare,{b:2},{d:5})
        const c = new CatSet<object>(flatObjCompare,{c:3},{d:5})
        const f = new TotalFunction(a,b,new StructureMap<object>([[{a:1},{b:2}],[{d:5},{d:5}]]))
        const g =new TotalFunction(a,c,new StructureMap<object>([[{a:1},{c:3}],[{d:5},{d:5}]]))
        const fprime = new TotalFunction(b,b,new StructureMap<object>([[{b:2},{b:2}],[{d:5},{d:5}]]))
        const gprime = new TotalFunction(c,b,new StructureMap<object>([[{c:3},{b:2}],[{d:5},{d:5}]]))
        const pushout = ObjSets.pushout(f,g)
        expect(pushout[0].equals(fprime)).toBeTruthy()
        expect(pushout[1].equals(gprime)).toBeTruthy()
    })
    test('pushout object', () => {
        const Kai = {value:"Kai"}
        const Julia = {value:"Julia"}
        const Tim = {value:"Tim"}
        const Noel = {value:"Noel"}
        const Erik = {value:"Erik"}
        const source = new CatSet<object>(flatObjCompare, Kai)
        const trg = new CatSet<object>(flatObjCompare, Kai,Julia)
        const transformation = new TotalFunction(source,trg,new StructureMap([[Kai,Kai]],"productionMap"))
        const trgMatch = new CatSet<object>(flatObjCompare, Kai, Tim, Noel, Erik)
        const match = new TotalFunction(source,trgMatch, new StructureMap([[Kai,Kai]],"productionMap"))
        const SetCategory = new SetCat<object>(flatObjCompare, "productionMap")
        const pushout = SetCategory.pushout(transformation,match)
        const pushoutObjTobe = new CatSet<object>(flatObjCompare,Kai,Julia, Tim, Noel, Erik )
        const pushoutTobe = [
            new TotalFunction(trg,pushoutObjTobe, new StructureMap([[Kai,Kai],[Julia,Julia]], "productionMap")),
            new TotalFunction(trgMatch,pushoutObjTobe, new StructureMap([[Kai,Kai],[Tim,Tim],[Noel,Noel],[Erik,Erik]], "productionMap"))
        ]
        expect(pushout[0].equals(pushoutTobe[0])).toBeTruthy()
        expect(pushout[1].equals(pushoutTobe[1])).toBeTruthy()
    })
    test('mergeArrow({1}->{2}, {2}->{3}]) = {{1}->{2},{2}->{3}}', () => {
        const a = new CatSet<object>(flatObjCompare,{a:1},{d:5})
        const b = new CatSet<object>(flatObjCompare,{b:2},{d:5})
        const c = new CatSet<object>(flatObjCompare,{a:2},{d:5})
        const d = new CatSet<object>(flatObjCompare,{c:3},{d:5})

        const e = new CatSet<object>(flatObjCompare,{a:2},{a:2},{d:5})
        const eprime = new CatSet<object>(flatObjCompare,{b:2},{c:3},{d:5})


        const f = new TotalFunction(a,b,new StructureMap<object>([[{a:1},{b:2}],[{d:5},{d:5}]]))
        const g = new TotalFunction(c,d,new StructureMap<object>([[{a:2},{c:3}],[{d:5},{d:5}]]))
        const h = new TotalFunction(e,eprime,new StructureMap<object>([[{a:1},{b:2}],[{a:2},{c:3}],[{d:5},{d:5}]]))
        const mergedArrow = ObjSets.mergeArrow(f,g)
        expect(h.equals(mergedArrow)).toBeTruthy()
    })
    test('closeTriagle({1}->{1}, {1}->{3}]) = {{3}->{1}}', () => {
        const a = new CatSet<object>(flatObjCompare,{a:1})
        const b = new CatSet<object>(flatObjCompare,{a:3})
        const f = new TotalFunction(a,a,new StructureMap<object>([[{a:1},{a:1}]]))
        const g = new TotalFunction(a,b,new StructureMap<object>([[{a:1},{a:3}]]))
        const h = new TotalFunction(b,a,new StructureMap<object>([[{a:3},{a:1}]]))
        const hprime = ObjSets.closeTriangle(f,g)
        expect(h.equals(hprime))
        expect(f.equals(g.then(h))).toBeTruthy()
    })
});