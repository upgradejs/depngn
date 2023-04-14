import log from 'fancy-log';
import { execWithLog } from './log';
import { parseCliArgs } from './parse';
import { createUsage } from './usage';
import { validateArgs } from './validate';
import { depngn } from 'src/core';

export async function cli() {
  try {
    const { version, reporter, help, cwd, reportOutputPath } = parseCliArgs();
    if (help) {
      createUsage();
    } else {
      await validateArgs({ version, reporter, cwd });
      await execWithLog(
        'Parsing engine data',
        async () => await depngn({ version, cwd, reportOutputPath, reporter })
      );
    }
  } catch (error) {
    log.error(error);
    process.exitCode = 1;
  }
}
