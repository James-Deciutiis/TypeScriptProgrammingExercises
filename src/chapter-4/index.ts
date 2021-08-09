// 1. Which parts of a function's type signature does TypeScript infer: the parameters,
// the return type, or both?
//
// A: TypeScript will always infer the return type. Parameters on the other hand, will
// sometimes be infered (i.e when using generics and callbacks, TypeScript will infer the type
// based on the context)
//
// 2. Is JavaScript's arguments object typesafe? If not, what can you use instead? 
//
// A: No, JavaScript's arguments object is not typesafe, you should use a rest parameter
// for instance:
//
// instead of doing function: f() { console.log(arguments) }
// 
// you should use: f(...args: unknown[]) { console.log(args) }
//
// 3. You want the ability to book a vacation that starts immediately. Update the over-loaded 
// reserve function from earlier in this chapter with a third call signature that takes just
// a destination, without an explicit start date. Update reserve's implementation to support
// this new overloaded signature.
//
// A:

type Reservation = unknown

type Reserve = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation 
    (destination: string) : Reservation
}

let reserve: Reserve = (
    fromOrDestination: Date | string,
    toOrDestination?: Date | string,
    destination?: string
) => {
    if(fromOrDestination instanceof Date && toOrDestination instanceof Date && destination !== undefined){
        // Book a round trip
        console.log("Round Trip")
    }
    else if(fromOrDestination instanceof Date && toOrDestination !== undefined){
        //book a one-way trip
        console.log("One-Way Trip")
    }
    else if(typeof fromOrDestination === 'string'){
        //book right away trip
        console.log(`Going to ${fromOrDestination} right away!`)
    }

}

let date = new Date()

//Should print Round Trip!
reserve(date, date, "Belize")

//Should Print One-Way Trip
reserve(date, "Belize")

//Should print Going to Belize right away!
reserve("Belize")

//reserve("Belize", date, date) //error --> First parameter should not be a string if there are more than just one 
//reserve(date, "Belize", date) //error --> second parameter should not be string if there are more than one

// 4. [Hard] Update our call implementation from earlier in the chapter to only work for
// functions whose second argument is a string. For all other functions your implementation
// should fail at compile time
// A:

function call<T extends [unknown, string, ...unknown[]], R>(
    f: (...args: T) => R,
    ...args: T
) : R {
    return f(...args)
}

function fill(length: number, value: string): string[] {
    return Array.from({length}, () => value)
}

call(fill, 10, 'a') //This works
//call(fill, 'a', 10) --> This does not 

// 5. Implement a small typesafe assertion library, is. Start by sketching out your types.
// When you're done, you should be able to us it like this: ...
// A:

function is<T>(x : T, ...y : [T, ...T[]]) : boolean {
    return y.every(_ =>  _ === x)
}

// Compare a string and a string
is('string', 'otherstring') // false

// Compare two booleans
is(true, false) // false

// Compare two numbers
is(42, 42) // True

// Compare two different types, should return an error
// is(10, 'foo') -> Error TS2345

// [Hard] I should be able to pass any number of arguments
is([1], [1,2], [1,2,3]) // false
