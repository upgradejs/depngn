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
  return (
    range
      .split(' ')
      // filter out any whitespace we may have missed with the RegEx -- ie, `'>4   <8'`
      .filter((r) => !!r)
      .every((r) => satisfies(nodeVersion, r))
  );
}

// trims leading and trailing whitespace, whitespace
// between the comparator operators and the actual version number,
// and whitespace between the numbers/wildcards/decimals in the actual
// version number. ie, ' > = 1 2. 0 .0 ' becomes '>=12.0.0'
//
// it also ensures there's only one space in logical `AND` ranges
// ie, '>=1.2.9 <2.0.0', because we want to split those later
function removeWhitespace(range: string) {
  const comparatorWhitespace = /((?<=(<|>))(\s+)(?=(=)))/g;
  const comparatorAndVersionWhiteSpace = /(?<=(<|>|=|\^|~))(\s+)(?=\d)/g;
  const remainingRange =
    /(((\d\s*){1,3})\.\s*(\d\s*){1,3}\.\s*((0\s*)|(\d\s*){1,2})(?!(((<|>)=?)|~|^)?(((\d\s*){1,3})\.)|(\d)))/g;
  return range
    .trim()
    .replace(comparatorWhitespace, '')
    .replace(comparatorAndVersionWhiteSpace, '')
    .replace(remainingRange, (match: string) => match.replace(/\s+/g, ''));
}
