import { satisfies } from 'compare-versions';
import { EnginesData } from '../types';

export function getPackageData(dep: EnginesData, version: string) {
  const range = dep.range ? dep.range : 'n/a';
  const compatible = isCompatible(version, dep.range);
  return { compatible, range };
}

function isCompatible(nodeVersion: string, depRange: string) {
  if (!depRange) return undefined;

  // if a dependency has `*` for the node version, it's always compatible
  if (['x', '*'].includes(depRange)) return true;

  let compatible;

  const logicalOrRegEx = /\|\|/;
  if (depRange && logicalOrRegEx.test(depRange)) {
    const rangeArray = depRange.split('||').map((range) => range.replaceAll(' ', ''));
    compatible = rangeArray.some((range) => satisfies(nodeVersion, range));
  } else {
    compatible = satisfies(nodeVersion, depRange.replaceAll(' ', ''));
  }
  return compatible;
}
