import { Cat } from './../Cat/Cat';
import { Arrow } from '../Cat/Arrow';
export declare class CatTriple<catobj, tcats extends Cat<catobj>> {
    private catMorphLeft;
    private catMorphRight;
    getLeftObject(): catobj;
    getRightObject(): catobj;
    getMiddleObject(): catobj;
    getLeftArrow(): Arrow<catobj>;
    getRightArrow(): Arrow<catobj>;
    equals(cat: CatTriple<catobj, tcats>): boolean;
    constructor(left: Arrow<catobj>, right: Arrow<catobj>);
}
