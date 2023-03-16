import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const pathAlias = {
  alias: {
    "src/*": "./src/*",
    "core/*": "./src/core/*",
    "cli/*": "./src/cli/*",
  }
};

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
