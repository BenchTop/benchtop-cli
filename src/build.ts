import { scanFiles } from "./lib/scan"
import { spawn, Pool, Worker } from "threads"
import { QueuedTask } from "threads/dist/master/pool"

async function build(pattern: string) {
    const pool = Pool(() => spawn(new Worker('./workers/index.worker')))

    for (let input = 0; input < 100; input++) {
        pool.queue(async add => {
            const sum = await add(2, 3)
            console.log(`2 + 3 = ${sum}`)
        })

    }

    if (!pattern) pattern = "__tests__/**/*.bench.{ts,js}?(x)"
    console.log("Hello, World")
    const files = await scanFiles(pattern)
    console.log(files)


    await pool.completed()
    await pool.terminate()
}

export {build}