import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import shebang from 'rollup-plugin-add-shebang';
import json from '@rollup/plugin-json';
// import worker from 'rollup-plugin-worker';
// import webWorkerLoader from 'rollup-plugin-web-worker-loader';
// import OMT from "@surma/rollup-plugin-off-main-thread";

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.NODE_ENV == "production";

const plugins = [
        typescript(),
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        production && terser(), // minify, but only in production
        shebang({
            // A single or an array of filename patterns. Defaults to ['**/cli.js', '**/bin.js'].
            include: 'dist/main.js'
            // you could also 'exclude' here
            // or specify a special shebang (or a function returning one) using the 'shebang' option
        }),
        json(),
]

export default [{
    input: 'src/main.ts',
    output: {
        dir: 'dist',
        format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: true
    },
    external: ['commander', 'glob', 'threads'],
    plugins: [...plugins]
},{
    input: 'src/worker/benchmark.worker.ts',
    output: {
        dir: 'dist/workers',
        format: 'cjs',
        sourcemap: true
    },
    external: ['rollup', '@rollup/plugin-typescript', '@rollup/plugin-node-resolve', 'vm'],
    plugins: [...plugins]
}];