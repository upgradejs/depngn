import log from 'fancy-log';
import { writeFile } from 'src/utils';
import { CompatData } from 'src/types';

export async function createJson(
  compatData: Record<string, CompatData>,
  version: string,
  path = 'compat.json'
) {
  const out = JSON.stringify(
    {
      node: version,
      dependencies: compatData,
    },
    null,
    2
  );

  await writeFile(path, out);
  log.info(`File generated at ${path}`);
}
