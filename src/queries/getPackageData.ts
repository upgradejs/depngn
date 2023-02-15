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

// trims leading and trailing whitespace and removes whitespace
// between the comparator operators and the actual version number
// ie, ' > = 12.0.0 ' becomes '>=12.0.0'
//
// does *not* handle whitespace between numbers/decimals 
// in actual version number (ie, 1 2. 0 .0) -- the RegEx for
// it would be silly complex, so we handle that in `safeSatisfies`
// once we know we have a single version
function removeWhitespace(range: string) {
  const extraSpaceRegEx = /((?<=(<|>))(\s+)(?=(=)))|(?<=(<|>|=|\^))(\s+)(?=\d)|((?<=(\d|\.))(\s+)(?=(\d|\.)))/g;
  return range.trim().replace(extraSpaceRegEx, '');
}
