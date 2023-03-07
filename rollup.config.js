import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import packageJSON from './package.json';

const noDeclarationFiles = { compilerOptions: { declaration: false } };

export default defineConfig([
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJSON.main,
        format: 'cjs',
        exports: 'auto',
      },
      {
        file: packageJSON.module,
        format: 'esm',
      },
    ],
    plugins: [nodeResolve(), commonjs(), typescript(noDeclarationFiles)],
  },
  {
    input: 'src/cli/index.ts',
    output: [
      {
        file: 'dist/cli.cjs',
        format: 'cjs',
        exports: 'auto',
      },
    ],
    plugins: [nodeResolve(), commonjs(), typescript(noDeclarationFiles)],
  },
]);
