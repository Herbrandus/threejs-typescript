import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/main.ts',
    output: {
        dir: 'dist/js',
        format: 'es'
    },
    plugins: [
        typescript({
            tsconfig: 'tsconfig.json'
        }),
        json(),
        commonjs(),
        nodeResolve(),
        terser()
    ]
}