import log from 'fancy-log';
import { execWithLog } from './log';
import { parseCliArgs } from './parse';
import { createUsage } from './usage';
import { validateArgs } from './validate';
import { depngn } from 'src/core';
import { report } from 'src/report';

export async function cli() {
  try {
    const { version, reporter, help, cwd, reportOutputPath } = parseCliArgs();
    if (help) {
      createUsage();
    } else {
      await validateArgs({ version, reporter, cwd });
      const compatData = await execWithLog(
        'Parsing engine data',
        async () => await depngn({ version, cwd })
      );
      await report(compatData, { version, reporter, reportOutputPath });
    }
  } catch (error) {
    log.error(error);
    process.exitCode = 1;
  }
}
