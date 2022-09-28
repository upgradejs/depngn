import { bail } from './log';
import { parseCliArgs } from './parse';
import { createUsage } from './usage';
import { getCompatData } from '../queries';
import { writeReport } from '../reporter';
import { validateArgs } from '../validate';

export async function cli() {
  try {
    const { version, reporter, help } = await parseCliArgs();
    if (help) {
      createUsage();
    } else {
      validateArgs(version, reporter);
      const compatData = await getCompatData();
      await writeReport(compatData, version, reporter);
    }
  } catch (error) {
    bail(error);
  }
}
