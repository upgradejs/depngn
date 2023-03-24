import { Options, build } from 'tsup';

const baseCoreConfig: Options = {
  entryPoints: ['./src/core/index.ts'],
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
    entryPoints: ['./src/cli/index.ts'],
    outDir: 'dist/cli',
    format: 'cjs',
  }),
]);
