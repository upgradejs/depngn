import { execWithLog } from './log';
import { parseCliArgs } from './parse';
import { createReport } from './reporter';
import { createUsage } from './usage';
import { validateArgs } from './validate';
import { depngn } from '../';

export async function cli() {
  try {
    const { version, reporter, help } = await parseCliArgs();
    if (help) {
      createUsage();
    } else {
      validateArgs(version, reporter);
      const compatData = await execWithLog(
        'Fetching engine data',
        async () => await depngn(version)
      );
      await createReport(compatData, version, reporter);
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
