import { satisfies } from 'compare-versions';
import { CompatData, EnginesData } from 'src/types';

export function getPackageData(dep: EnginesData, version: string): CompatData {
  const range = dep.range ? dep.range : 'n/a';
  const compatible = isCompatible(version, dep.range);
  return { compatible, range };
}

function isCompatible(nodeVersion: string, depRange: string) {
  if (!depRange) return undefined;

  // if a dependency has `*` for the node version, it's always compatible
  if (['x', '*'].includes(depRange)) return true;

  try {
    return satisfies(nodeVersion, depRange);
  } catch (error) {
    if ((error as Error).message.match(/Invalid argument not valid semver/)) {
      return 'invalid';
    }
    throw error;
  }
}
