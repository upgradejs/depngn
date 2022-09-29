import { getDependencies } from './getDependencies';
import { getEngines } from './getEngines';
import { getPackageData } from './getPackageData';
import { getPackageManager } from './getPackageManager';
import { CompatData, EnginesDataArray } from '../types';

export async function getCompatData(version: string, { logs = false }) {
  const manager = await getPackageManager();
  const deps = await getDependencies(logs);
  const engines = await getEngines(deps, manager, logs);
  return createCompatData(engines, version);
}

function createCompatData(compatData: EnginesDataArray, version: string) {
  const compatObject: Record<string, CompatData> = {};
  compatData.forEach((dep) => {
    compatObject[dep.package] = getPackageData(dep, version);
  });
  return compatObject;
}
