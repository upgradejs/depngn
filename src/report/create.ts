import { createJson } from './json';
import { createTable } from './table';
import { createHtml } from './html';
import { CompatData, Reporter } from 'src/types';

export async function create(
  compatData: Record<string, CompatData>,
  version: string,
  reporter: Reporter,
  outputFilePath?: string
) {
  switch (reporter) {
    case Reporter.Terminal:
      return createTable(compatData, version);
    case Reporter.Json:
      return await createJson(compatData, version, outputFilePath);
    case Reporter.Html:
      return await createHtml(compatData, version, outputFilePath);
    default: {
      const wrong = reporter as never;
      throw new Error(
        `This error shouldn't happen, but somehow you entered an invalid reporter and it made it past the first check: ${wrong}.`
      );
    }
  }
}
