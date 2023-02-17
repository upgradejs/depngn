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

  return depRange
    .split('||')
    .map((range) => removeWhitespace(range))
    .some((range) => safeSatisfies(nodeVersion, range));
}

// accounts for `AND` ranges -- ie, `'>=1.2.9 <2.0.0'`
function safeSatisfies(nodeVersion: string, range: string) {
  return range.split(' ').every((r) => satisfies(nodeVersion, r));
}

// trims leading and trailing whitespace, whitespace
// between the comparator operators and the actual version number,
// whitespace between digits and decimals in the version number, and
// whitespace between the numbers/wildcards/decimals in the actual
// version number. ie, ' > = 12.0.0 ' becomes '>=12.0.0'
//
// it does *not* remove whitespace between versions in an `AND` range
// ie, '>=1.2.9 <2.0.0', because we want to split those later
function removeWhitespace(range: string) {
  const extraSpaceRegEx =
    /((?<=(<|>))(\s+)(?=(=)))|(?<=(<|>|=|\^|~))(\s+)(?=\d)|((?<=(\d|\.|\*|x|X))(\s+)(?=(\d|\.|\*|x|X)))/g;
  return range.trim().replace(extraSpaceRegEx, '');
}
