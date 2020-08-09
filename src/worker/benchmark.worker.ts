import { expose } from "threads/worker"
import { rollup } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { Script, createContext } from 'vm'

async function bundle(filename: string): Promise<string> {
  const bundle = await rollup({
    input: filename,
    treeshake: false,
    external: ['@benchtop/benchtop', 'perf_hooks',],
    plugins: [
      typescript(),
      nodeResolve()
      // commonjs({
      //   include: 'node_modules/**'
      // })
    ]
  });

  const { output } = await bundle.generate({
    format: 'cjs'
  });

  return output[0].code
}

async function runBenchmark(code: string) {
    const context = {
      require,
      // console
    };
    const script = new Script(code)
    createContext(context);
    script.runInContext(context)
}

expose({bundle, runBenchmark})