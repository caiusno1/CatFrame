import { Cat } from './../Cat/Cat';
import { TCat } from './TCat';
import { Arrow } from "../Cat/Arrow";
export declare class TCatMorphism<tcatobj, tcat extends Cat<tcatobj>> implements Arrow<TCat<tcatobj, tcat>> {
    src: TCat<tcatobj, tcat>;
    trg: TCat<tcatobj, tcat>;
    objectArrow: Arrow<tcatobj>;
    typeArrow: Arrow<tcatobj>;
    constructor(srcObj: TCat<tcatobj, tcat>, trgObj: TCat<tcatobj, tcat>, objectMap: Arrow<tcatobj>, typeMap: Arrow<tcatobj>);
    then(g: Arrow<TCat<tcatobj, tcat>>): Arrow<TCat<tcatobj, tcat>>;
    equals(g: Arrow<TCat<tcatobj, tcat>>): boolean;
}
