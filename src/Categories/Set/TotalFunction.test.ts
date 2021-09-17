import { StructureMap } from './../../Helpers/StructureMap';
import { CatSet } from './CatSet';
import { TotalFunction } from "./TotalFunction";

function numComparer(a: number, b: number) {
  return a === b;
}

describe('Totalfunction unit tests', () => {
  test('simple application', () => {
    const map = new StructureMap<number>([]);
    const a = 1
    const b = 2;

    map.set(a, b);
    const totalFunction = new TotalFunction<number>(new CatSet(numComparer, a), new CatSet(numComparer, b), map);
    expect(totalFunction.apply(a)).toBe(b);
  });

  test('simple set compose', () => {
    const map = new StructureMap<number>([]);
    const a = 1;
    const b = 2;
    const c = 3;

    map.set(a, b);
    const totalFunction = new TotalFunction<number>(new CatSet(numComparer, a), new CatSet(numComparer, b), map);
    const map2 = new StructureMap<number>([]);
    map2.set(b, c);
    const totalFunction2 = new TotalFunction<number>(new CatSet(numComparer, b), new CatSet(numComparer, c), map2);
    expect(totalFunction.then(totalFunction2).apply(a)).toBe(c)
  });

  test('simple set can\'t compose', () => {
    const map = new StructureMap<number>([]);
    const a = 1;
    const b = 2;
    const c = 3;

    map.set(a, b);
    const totalFunction = new TotalFunction<number>(new CatSet(numComparer, a), new CatSet(numComparer, b), map);
    const map2 = new StructureMap<number>([]);
    map2.set(c, b);
    const totalFunction2 = new TotalFunction<number>(new CatSet(numComparer, c), new CatSet(numComparer, b), map2);
    expect(() => totalFunction.then(totalFunction2)).toThrowError(Error);
  });

  test('do not support Partial Functions', () => {
    const map = new StructureMap<number>([]);
    const a = 1;
    const b = 2;
    map.set(a, b);
    expect(() => new TotalFunction<number>(new CatSet(numComparer, a, b), new CatSet(numComparer, b), map)).toThrow("Function is not total");
  });

  test('totalfunction equals', () => {
    const map = new StructureMap<number>([]);
    const a = 1;
    const b = 2;
    map.set(a, b);
    const totalFunction = new TotalFunction<number>(new CatSet(numComparer, a), new CatSet(numComparer, b), map);
    const map2 = new StructureMap<number>([]);
    map2.set(a, b);
    const totalFunction2 = new TotalFunction<number>(new CatSet(numComparer, a), new CatSet(numComparer, b), map2);
    expect(totalFunction.equals(totalFunction2)).toBeTruthy();
  });
});
