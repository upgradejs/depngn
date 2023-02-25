import { getEngines } from './getEngines';
import { getPackageData } from './getPackageData';
import { CompatData, EnginesDataArray } from '../types';

export async function getCompatData(version: string) {
  const engines = await getEngines();
  return createCompatData(engines, version);
}

export function createCompatData(compatData: EnginesDataArray, version: string) {
  const compatObject: Record<string, CompatData> = {};
  compatData.forEach((dep) => {
    compatObject[dep.package] = getPackageData(dep, version);
  });
  return compatObject;
}
