import {Arrow} from "./Arrow";
// Arrow.ts
/**
 * This is the base class of all categories that are usable within this framework
 *
 */
export interface Cat<ObjectType>{
    id : (obj:ObjectType) => Arrow<ObjectType>;
    mergeArrow: (a:Arrow<ObjectType>, b:Arrow<ObjectType>) => Arrow<ObjectType>;
    coproduct: (a:ObjectType,b:ObjectType) => [Arrow<ObjectType>,Arrow<ObjectType>];
    coequalizer: (a:Arrow<ObjectType>, b:Arrow<ObjectType>) => Arrow<ObjectType>;
    closeTriangle(f: Arrow<ObjectType>,g: Arrow<ObjectType>): Arrow<ObjectType>;
}