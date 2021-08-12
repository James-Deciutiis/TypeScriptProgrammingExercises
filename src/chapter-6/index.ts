// 1. For each of the following pairs of types, decide if the first type is assignable
// to the second and why or why not.
//
// a. 1 and number --> yes, 1 <: number
// b. number and 1 --> no, 1 !>: number
// c. string and number | string --> yes, string <: number | string
// d. boolean and number --> no, boolean ! <: number
// e. number[] and (number | string)[] --> yes, number[] <: (number | string)[]
// f. (number | string)[] and number[] --> no, (number | string)[] !<: number[]
// g. {a: true} and {a: boolean} --> yes {a: true} <: {a: boolean}
// h. {a: {b: [string]}} and {a: {b: [number | string]} --> yes
// i. {a: number) => string and (b: number) => string --> yes
// j. {a: number) => string and (a: string) => string --> no
// k. (a: number | string) => string and (a: string) => string --> yes
// l. E.X (defined in an enum enum E {X = 'X'}) and F.X (defined in an enum enum F {X = 'X'})
// --> no
//
// 2. If you have an object type type 0 = {a: {b: { c: string}}}, what's the type of the
// keyof 0? What about 0['a']['b']
//
// keyof 0 --> 'a'
// let Q = ['a']['b'] --> '{c: string}'
//
// 3. Write an Exclusive<T, U> type that computes the types that are in either T or U,
// but not both. For example, Exclusive<1 | 2 | 3, 2 | 3 | 4> should resolve to 1 | 4.
// Write out step by step how the typechecker evaluates Exclusive<1 | 2 , 2 | 4>
//
// A: 

type Exclusive<U, T> =  Extract<U, T> | Extract<T, U>
type a = Exclusive<1 | 2 | 3, 2 | 3 | 4>  // --> 1 | 4

//from answers on github

type b = Exclusive<1 | 2, 2 | 4>

/*
  1. Start with Exclusive<1 | 2, 2 | 4>
  2. Substitute. Exclude<1 | 2, 2 | 4> | Exclude<2 | 4, 1 | 2>
  3. Substitute. (1 | 2 extends 2 | 4 ? never : 1 | 2) | (2 | 4 extends 1 | 2 ? never : 2 | 4)
  4. Distribute. (1 extends 2 | 4 ? never : 1) | (2 extends 2 | 4 ? never : 2) | (2 extends 1 | 2 ? never : 2) | (4 extends 1 | 2 ? never : 4)
  5. Simplify. 1 | never | never | 4
  6. Simplify. 1 | 4
*/
