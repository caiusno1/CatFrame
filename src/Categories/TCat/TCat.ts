import { Cat } from './../Cat/Cat';
import { Arrow } from '../Cat/Arrow';
export class TCat<tcatobj,tcat extends Cat<tcatobj>> {
    private typeMorphism: Arrow<tcatobj>

    getObject(){
        return this.typeMorphism.src;
    }
    getTypeObject(){
        return this.typeMorphism.trg;
    }
    getTypeMorphism(){
        return this.typeMorphism;
    }
    equals(cat: TCat<tcatobj, tcat>): boolean {
        return this.typeMorphism.equals(cat.typeMorphism)
    }
    constructor(ptypeMorphism:Arrow<tcatobj>){
        this.typeMorphism = ptypeMorphism
    }
}