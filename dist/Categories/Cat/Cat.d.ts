import { Arrow } from "./Arrow";
/**
 * This is the base class of all categories that are usable within this framework
 *
 */
export interface Cat<ObjectType> {
    id: (obj: ObjectType) => Arrow<ObjectType>;
    mergeArrow: (a: Arrow<ObjectType>, b: Arrow<ObjectType>) => Arrow<ObjectType>;
    coproduct: (a: ObjectType, b: ObjectType) => [Arrow<ObjectType>, Arrow<ObjectType>];
    /**
     * A categorical coequaliser. It is assumed that a and b are of the form: A -> B (source and target domain are equal between the two arrows) but the mapping is different.
     * the result is an arrows such that a;out = b;out
     */
    coequalizer: (a: Arrow<ObjectType>, b: Arrow<ObjectType>) => Arrow<ObjectType>;
    /**
     * A function to calulate the arrow that closes a triagle that should preserve composition
     * @param f f parameter in the equation => read below
     * @param g g parameter in the equation => read below
     * @returns *out* for the equation: f = g;out
     */
    closeTriangle(f: Arrow<ObjectType>, g: Arrow<ObjectType>): Arrow<ObjectType>;
}
