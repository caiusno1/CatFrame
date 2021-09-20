import { Cat } from './../Cat/Cat';
import { Arrow } from '../Cat/Arrow';
export declare class TCat<tcatobj, tcat extends Cat<tcatobj>> {
    private typeMorphism;
    getObject(): tcatobj;
    getTypeObject(): tcatobj;
    getTypeMorphism(): Arrow<tcatobj>;
    equals(cat: TCat<tcatobj, tcat>): boolean;
    constructor(ptypeMorphism: Arrow<tcatobj>);
}
