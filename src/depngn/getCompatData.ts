import { getEngines } from './getEngines';
import { getPackageData } from './getPackageData';
import { CompatData, EnginesDataArray } from '../types';
import { getDependencies } from './getDependencies';
import { getPackageManager } from './getPackageManager';

export async function getCompatData(version: string) {
  const manager = await getPackageManager();
  const deps = await getDependencies();
  const engines = await getEngines(deps, manager);
  return createCompatData(engines, version);
}

export function createCompatData(compatData: EnginesDataArray, version: string) {
  const compatObject: Record<string, CompatData> = {};
  compatData.forEach((dep) => {
    compatObject[dep.package] = getPackageData(dep, version);
  });
  return compatObject;
}
