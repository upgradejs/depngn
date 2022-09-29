import { createJson } from './json';
import { createTable} from './table';
import { CompatData } from '../../types';

export function createReport(
  compatData: Record<string, CompatData>,
  version: string,
  reporter: string
) {
  switch (reporter) {
    case 'terminal':
      return createTable(compatData, version);
    case 'json':
      return createJson(compatData, version);
    default:
      const wrong = reporter as never;
      throw new Error(
        `This error shouldn't happen, but somehow you entered an invalid reporter and it made it past the first check: ${wrong}.`
      );
  }
}
