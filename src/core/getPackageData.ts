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
    return depRange
      .split('||')
      .map((range) => removeWhitespace(range))
      .some((range) => safeSatisfies(nodeVersion, range));
  } catch (error) {
    if ((error as Error).message.match(/Invalid argument not valid semver/)) {
      return 'invalid';
    }
    throw error;
  }
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

// trims leading and trailing whitespace and whitespace
// between the comparator operators and the actual version number
// version number. ie, ' > = 12.0.0 ' becomes '>=12.0.0'
function removeWhitespace(range: string) {
  const comparatorWhitespace = /((?<=(<|>))(\s+)(?=(=)))/g;
  const comparatorAndVersionWhiteSpace = /(?<=(<|>|=|\^|~))(\s+)(?=\d)/g;
  return range
    .trim()
    .replace(comparatorWhitespace, '')
    .replace(comparatorAndVersionWhiteSpace, '');
}
