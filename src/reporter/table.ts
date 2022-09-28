import { blue, green, red, yellow } from 'kleur/colors';
import { table, TableUserConfig } from 'table';
import { getPackageData } from './shared';
import { CompatDataArray } from '../types';

export function createTable(compatData: CompatDataArray, version: string) {
  const titles = ['package', 'compatible', 'range'].map((title) =>
    blue(title)
  );
  const out = compatData.map((dep) => {
    const { compatible, range } = getPackageData(dep, version);
    return [dep.package, toColorString(compatible), range];
  });
  out.unshift(titles);

  const config: TableUserConfig = {
    header: {
      alignment: 'center',
      content: green(`\nNode version: ${version}\n`),
    },
  };
  return table(out, config);
}

export function writeTable(compatData: CompatDataArray, version: string) {
  const table = createTable(compatData, version);
  console.log(table);
}

function toColorString(value: boolean | undefined) {
  if (value === undefined) return yellow('undefined');
  const outputColor = value ? green : red;
  return outputColor(value.toString());
}
