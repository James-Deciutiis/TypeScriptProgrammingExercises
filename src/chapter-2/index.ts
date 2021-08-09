console.log('Hello TypeScript!')
let a  = 1 + 2
let b = a + 3
let c = {
    apple: a,
    banana: b
}

let d = c.apple * 4 + "3"

// c = 2 --> causes a TypeError, thus a squiggly appears under c
c = {
    apple: 2,
    banana: 3
} 
