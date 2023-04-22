import { join } from 'path';
import { createJson } from './json';
import { createTable } from './table';
import { createHtml } from './html';
import { CliOptions, CompatDataMap, Reporter } from 'src/types';

export async function report(
  compatData: CompatDataMap,
  { reporter = Reporter.Terminal, version, reportDir, reportFileName }: CliOptions
) {
  const finalOutputFilePath = join(reportDir ?? '', `${reportFileName ?? 'compat'}.${reporter}`);
  switch (reporter) {
    case Reporter.Terminal:
      return createTable(compatData, version);
    case Reporter.Json:
      return await createJson(compatData, version, finalOutputFilePath);
    case Reporter.Html:
      return await createHtml(compatData, version, finalOutputFilePath);
    default: {
      const wrong = reporter as never;
      throw new Error(
        `This error shouldn't happen, but somehow you entered an invalid reporter and it made it past the first check: ${wrong}.`
      );
    }
  }
}
