import { bail } from './log';
import { parseCliArgs } from './parse';
import { createReport } from './reporter';
import { createUsage } from './usage';
import { validateArgs } from './validate';
import { getCompatData } from '../queries';

export async function cli() {
  try {
    const { version, reporter, help } = await parseCliArgs();
    if (help) {
      createUsage();
    } else {
      validateArgs(version, reporter);
      const compatData = await getCompatData(version, { logs: true });
      await createReport(compatData, version, reporter);
    }
  } catch (error) {
    bail(error);
  }
}
