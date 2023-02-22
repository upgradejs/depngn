import { writeFile } from '../../utils';
import { CompatData } from '../../types';

export async function createJson(compatData: Record<string, CompatData>, version: string, path: string = 'compat.json') {
  const out = JSON.stringify({
    node: version,
    dependencies: compatData,
  }, null, 2);

  await writeFile(path, out);
  console.log(`File generated at ${path}`);
}
