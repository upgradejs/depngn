import { blue, green, red, yellow } from 'kleur/colors';
import { table, TableUserConfig } from 'table';
import { CompatData } from '../../types';

export function createTable(compatData: Record<string, CompatData>, version: string) {
  const titles = ['package', 'compatible', 'range'].map((title) =>
    blue(title)
  );
  const out = Object.keys(compatData).map((dep) => {
    const { compatible, range } = compatData[dep];
    return [dep, toColorString(compatible), range];
  });
  out.unshift(titles);

  const config: TableUserConfig = {
    header: {
      alignment: 'center',
      content: green(`\nNode version: ${version}\n`),
    },
  };
  console.log(table(out, config));
}

function toColorString(value: boolean | undefined) {
  if (value === undefined) return yellow('undefined');
  const outputColor = value ? green : red;
  return outputColor(value.toString());
}
