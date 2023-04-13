import { Options, build } from 'tsup';

const baseCoreConfig: Options = {
  entry: ['./src/core/index.ts'],
  platform: 'node',
  outDir: 'dist',
};

Promise.all([
  build({
    ...baseCoreConfig,
    format: 'esm',
    dts: true,
  }),
  build({
    ...baseCoreConfig,
    format: 'cjs',
  }),
  build({
    ...baseCoreConfig,
    entry: ['./src/cli/index.ts'],
    outDir: 'dist/cli',
    format: 'cjs',
  }),
]);
