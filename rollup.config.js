import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        format: 'esm',
        file: 'dist/index.js',
      },
      {
        format: 'cjs',
        file: 'dist/index.cjs',
      },
    ],
    plugins: [typescript(), nodeResolve(), commonjs()],
  },
  {
    input: 'src/cli/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/cli.cjs',
    },
    plugins: [typescript(), nodeResolve(), commonjs()],
  },
];
