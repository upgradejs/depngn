import { satisfies } from 'compare-versions';
import { CompatData } from '../types';

export function getPackageData(dep: CompatData, version: string) {
  const range = dep.range ? dep.range : 'n/a';
  const compatible = isCompatible(version, dep.range);
  return { compatible, range };
}

function isCompatible(nodeVersion: string, depRange: string) {
  if (!depRange) return undefined;

  let compatible;

  const logicalOrRegEx = /||/;
  if (depRange && logicalOrRegEx.test(depRange)) {
    const rangeArray = depRange.split('||').map((range) => range.trim());
    compatible = rangeArray.some((range) => satisfies(nodeVersion, range));
  } else {
    compatible = satisfies(nodeVersion, depRange);
  }
  return compatible;
}
