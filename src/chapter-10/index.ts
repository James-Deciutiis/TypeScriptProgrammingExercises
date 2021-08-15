//1. Play around with declaration merging, to:
//  a. Reimplement companion objects using namespaces and interfaces,
//  instead of values and types
//A:

interface Currency {
    unit: 'EUR' | 'GBP' | 'JPY' | 'USD'
    value: number
}

namespace Currency{
    export let DEFAULT: Currency['unit'] = 'USD'
    export function from(value: number, unit = DEFAULT): Currency {
        return {unit, value}
    }
}

let amountDue: Currency = {
    unit: 'JPY',
    value: 83733.10
}

let otherAmountDue = Currency.from(330, 'EUR')
console.log(otherAmountDue)

//  b. Add static methods to an enum.
//  A:

enum Fish{
    salmon = 'salmon!!!',
    koi = 'koi',
    tuna = 'tuna'
}

namespace saySalmon{
    export function sayIt(): void{
        console.log(Fish.salmon)
    }
}

saySalmon.sayIt()
