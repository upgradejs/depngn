import log from 'fancy-log';
import { execWithLog } from './log';
import { parseCliArgs } from './parse';
import { createUsage } from './usage';
import { validateArgs } from './validate';
import { depngn } from 'src/core';
import { report } from 'src/report';
import { Reporter } from 'src/types';

export async function cli() {
  try {
    const { version, reporter, help, cwd, reportFileName, reportDir } = parseCliArgs();
    if (help) {
      createUsage();
    } else {
      const typedReporter = reporter as Reporter | undefined;
      await validateArgs({
        version,
        reporter: typedReporter,
        cwd,
        reportFileName,
        reportDir,
      });
      const compatData = await execWithLog(
        'Parsing engine data',
        async () => await depngn({ version, cwd })
      );
      await report(compatData, {
        version,
        reporter: typedReporter,
        reportFileName,
        reportDir,
      });
    }
  } catch (error) {
    log.error(error);
    process.exitCode = 1;
  }
}
