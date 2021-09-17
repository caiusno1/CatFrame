// file1.ts
/**
 * This is the doc comment for file1.ts
 *
 * Specify this is a module comment and rename it to my-module:
 * @module Cat/Arrow
 */
export interface Arrow<ObjectType>{
    src: ObjectType;
    trg: ObjectType;
    then(g: Arrow<ObjectType>): Arrow<ObjectType>;
    equals(g:Arrow<ObjectType>): boolean
}