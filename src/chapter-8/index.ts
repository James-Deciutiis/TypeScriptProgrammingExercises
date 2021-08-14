// 1. Implement a general-purpose promisify function that takes exactly one argument
// A:
import {readFile} from 'fs'

function promisify<T, A>(
    f: (arg: A, f:(error: unknown, result: T | null) => void) => void
    ): (arg: A) => Promise<T> {
    return (args: A) => 
    new Promise<T>((resolve, reject) =>
            f(args, (error, result) => {
                if(error){
                    return reject(error)
                }
                if(result === null){
                    return reject(null)
                }

                return resolve(result)
            })
    )
}

let readFilePromise = promisify(readFile)

readFilePromise(__dirname + '/myfile.js')
    .then(data => console.log(`Data: ${data}`))
    .catch(error => console.log(error))

// 2. Finish the Matrix Protocol web worker code
// A:

type Matrix = number[][]

type MatrixProtocol = {
    determinant: {
        in: [Matrix]
        out: number
    }
    'dot-product': {
        in: [Matrix, Matrix]
        out: Matrix
    }

    invert: {
        in:[Matrix]
        out: Matrix
    }
}

type Protocol = {
    [command: string]: {
        in: unknown[]
        out: unknown
    }
}

function createProtocol<P extends Protocol>(script: string){
    return<K extends keyof P>(command: K) =>
        (...args: P[K]['in']) =>
            new Promise<P[K]['out']>((resolve, reject) => {
                let worker = new Worker(script)
                worker.onerror = reject
                worker.onmessage = event => resolve(event.data.data)
                worker.postMessage({command, args})
            })
}


let runWithMatrixProtocol = createProtocol<MatrixProtocol>(
    'MatrixWorkerScript.js'
)
let parallelDeterminant = runWithMatrixProtocol('determinant')
parallelDeterminant([[1,2], [3,4]])
    .then(determinant => console.log(`ANS: ${determinant}`))



