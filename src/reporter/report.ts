import { createJson, writeJson } from './json';
import { createTable, writeTable } from './table';
import { CompatDataArray } from '../types';

export function createReport(
  compatData: CompatDataArray,
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

export async function writeReport(
  compatData: CompatDataArray,
  version: string,
  reporter: string
) {
  switch (reporter) {
    case 'terminal':
      writeTable(compatData, version);
      break;
    case 'json':
      await writeJson(compatData, version);
      break;
    default:
      const wrong = reporter as never;
      throw new Error(
        `This error shouldn't happen, but somehow you entered an invalid reporter and it made it past the first check: ${wrong}.`
      );
  }
}
