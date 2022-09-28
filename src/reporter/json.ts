import { writeFile } from 'fs/promises';
import { getPackageData } from './shared';
import { CompatDataArray, CompatObject } from '../types';

export function createJson(compatData: CompatDataArray, version: string) {
  const compatObject: Record<string, CompatObject> = {};
  compatData.forEach((dep) => {
    compatObject[dep.package] = getPackageData(dep, version);
  });
  return JSON.stringify({
    node: version,
    dependencies: compatObject,
  });
}

export async function writeJson(compatData: CompatDataArray, version: string, path: string = 'compat.json') {
  const json = createJson(compatData, version);
  await writeFile(path, json);
  console.log(`File generated at ${path}`);
}
