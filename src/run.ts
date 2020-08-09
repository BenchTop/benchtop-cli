import { scanFiles } from "./lib/scan"
import { spawn, Pool, Worker } from "threads"
import { QueuedTask } from "threads/dist/master/pool"

async function run(pattern: string) {
    const pool = Pool(() => spawn(new Worker('./workers/benchmark.worker')))
    // console.log(pool)

    // for (let input = 0; input < 100; input++) {
    //     pool.queue(async add => {
    //         const sum = await add(2, 3)
    //         console.log(`2 + 3 = ${sum}`)
    //     })

    // }

    if (!pattern) pattern = "__tests__/**/*.bench.{ts,js}?(x)"
    // console.log("Hello, World")
    const files = await scanFiles(pattern)
    console.log(files)

    const bundleTasks = []

    files.forEach(file => {
        const task = pool.queue(async ({bundle, runBenchmark}) => {
            const code = await bundle(file)
            // console.log(code)
            await runBenchmark(code)
        })

        bundleTasks.push(task)
    })

    await pool.completed()
    await pool.terminate()
}

export { run }