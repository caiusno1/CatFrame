import { Cat } from './../Cat/Cat';
import { Arrow } from '../Cat/Arrow';
export class CatTriple<catobj,tcats extends Cat<catobj>> {
    private catMorphLeft: Arrow<catobj>
    private catMorphRight: Arrow<catobj>

    getLeftObject(){
        return this.catMorphLeft.trg;
    }
    getRightObject(){
        return this.catMorphRight.trg;
    }
    getMiddleObject(){
        return this.catMorphLeft.src;
    }
    getLeftArrow(){
        return this.catMorphLeft;
    }
    getRightArrow(){
        return this.catMorphRight;
    }
    equals(cat: CatTriple<catobj,tcats>): boolean {
        return this.catMorphLeft.equals(cat.catMorphLeft) && this.catMorphRight.equals(cat.catMorphRight)
    }
    constructor(left:Arrow<catobj>, right:Arrow<catobj>){
        this.catMorphLeft = left
        this.catMorphRight = right
        if(!(left.src as any).equals(right.src)){
            throw new Error("Inconsistent instanciation")
        }
    }
}