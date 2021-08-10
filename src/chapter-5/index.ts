// 1. what are the differences between a class and an interface?
//
// A. An interface declares variable and function types, and also does not
// produce any Javascript code (it only exists in compilation), A class however,
// can both declare and implement functions and declare both variable types and 
// values. Lastly Classes do produce Javascript code.
//
// 2. When you mark a class's constructor as private, that means you can't instantiate
// or extend the class. What happens when you mark it as protected instead? 
//
// A. A protected class will let you extend it. It will not let you instantiate
// it in the same way you cannot instantiate a private class.

class X {
    protected constructor(){

    }
}

class Y extends X { //this is valid
    private constructor(){
        super()
    }
}

//new X() --> //error
//new Y() --> //error

// 3. Extend the implementation from page 108 to make it safer, at the expense of
// breaking the abstraction a bit. Update the implementation so that a consumer 
// knows at compile time that calling Shoe.create('boot') returns a Boot for example.
//
// A.

type Shoe = {
    purpose: string
}

class BalletFlat implements Shoe{
    purpose = 'dancing'
}

class Boot implements Shoe{
    purpose = 'woodcutting'
}

class Sneaker implements Shoe{
    purpose = 'walking'
}

type ShoeFactory = {
    create(type: 'balletFlat' ): BalletFlat
    create(type: 'boot' ): Boot 
    create(type: 'sneaker' ): Sneaker
}

let shoe: ShoeFactory = {
    create(type: 'balletFlat' | 'boot' | 'sneaker'): Shoe {
        switch(type){
            case('balletFlat'):
                return new BalletFlat()
            case('boot'):
                return new Boot()
            case('sneaker'):
                return new Sneaker()
        }
    }

}

shoe.create('balletFlat') //balletFlat
shoe.create('boot') //boot
shoe.create('sneaker') //sneaker

// 4. Design a typesafe builder pattern. Extend the Builder pattern on page 109 to
// (a) Guarantee at compile time that someone can't call .send before setting at least
// a URL and a method. Would it be easier to make this guarantee if you also force the user
// to call methods in a specific order?

class RequestBuilder{
    private data: object | null = null
    private method: 'get' | 'post' | null = null
    private url: string | null = null

    setMethod(method: 'get' | 'post') : this {
        this.method = method
        return this
    }

    setData(data: object): this {
        this.data = data
        return this
    }
    
    setURL(url: string): this {
        this.url = url
        return this
    }

    send(){

    }
}

