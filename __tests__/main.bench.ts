import { bench } from '@benchtop/benchtop'

const func = () => {
    let n = 0
    for (let i = 0; i < 1000000; i++) {
        n++
    }
    return n
}

bench("a test of the benchmark tool", b => {    
    for (let i = 0; i < b.N; i++) {
        func()
    }
})