import log from 'fancy-log';
import { writeFileWithFolder } from 'src/utils';
import { CompatData } from 'src/types';

export async function createJson(
  compatData: Record<string, CompatData>,
  version: string,
  path: string
) {
  const out = JSON.stringify(
    {
      node: version,
      dependencies: compatData,
    },
    null,
    2
  );

  await writeFileWithFolder(path, out);
  log.info(`File generated at ${path}`);
}
