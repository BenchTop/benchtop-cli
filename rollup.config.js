import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import shebang from 'rollup-plugin-add-shebang';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/index.js',
        format: 'cjs', // immediately-invoked function expression — suitable for <script> tags
        sourcemap: true
    },
    external: ['commander'],
    plugins: [
        typescript(),
        resolve(), // tells Rollup how to find date-fns in node_modules
        commonjs(), // converts date-fns to ES modules
        production && terser(), // minify, but only in production
        shebang({
            // A single or an array of filename patterns. Defaults to ['**/cli.js', '**/bin.js'].
            include: 'dist/index.js'
            // you could also 'exclude' here
            // or specify a special shebang (or a function returning one) using the 'shebang' option
        }),
    ]
};