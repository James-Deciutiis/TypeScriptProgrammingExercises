//For each of these values, what type will TypeScript infer?
let a = 1042 // --> number
let b = 'apples and oranges' // --> string
const c = 'pineapples' // --> literal string : 'pineapples'
let d = [true, true, false] // --> boolean[]
let e = {type: 'ficus'} // --> type: string
let f = [1, false] // --> array of type (number | boolean) []
const g = [3] // --> array literal [3]
let h = null // any

// Why do these throw errors
let i: 3 = 3
i = 4 // i is of number literal value 3, cant be anything else

let j = [1, 2, 3]
j.push(4)
j.push('5') // j is of type number[] cannot push a string onto it

let k: never = 4 //never is reserved for functions that throw exeptions or never return, not numbers

let l: unknown = 4
let m = l * 2 //l is of type unknown, this means we can only use compare operators but not any functions or operators associated with other types
