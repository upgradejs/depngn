import { createJson } from './json';
import { createTable} from './table';
import { CompatData, Reporter } from '../../types';
import { createHtml } from './html';

export async function createReport(
  compatData: Record<string, CompatData>,
  version: string,
  reporter: Reporter
) {
  switch (reporter) {
    case Reporter.Terminal:
      return createTable(compatData, version);
    case Reporter.Json:
      return await createJson(compatData, version);
    case Reporter.Html:
      return await createHtml(compatData, version);
    default:
      const wrong = reporter as never;
      throw new Error(
        `This error shouldn't happen, but somehow you entered an invalid reporter and it made it past the first check: ${wrong}.`
      );
  }
}
