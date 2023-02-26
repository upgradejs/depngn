import { execWithLog } from './log';
import { parseCliArgs } from './parse';
import { createReport } from './reporter';
import { createUsage } from './usage';
import { validateArgs } from './validate';
import { depngn } from '../';

export async function cli() {
  try {
    const { version, reporter, help, cwd } = parseCliArgs();
    if (help) {
      createUsage();
    } else {
      validateArgs({ version, reporter, cwd });
      console.time('depngn');
      const compatData = await execWithLog(
        'Parsing engine data',
        async () => await depngn({ version, cwd })
      );
      await createReport(compatData, version, reporter);
      console.timeEnd('depngn');
    }
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
}
