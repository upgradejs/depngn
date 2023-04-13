import { getCompatData } from './getCompatData';
import { ApiOptions, Reporter } from 'src/types';
import path from 'path';
import { createReport } from 'cli/reporter';
import * as console from 'console';

export async function depngn({ cwd, reportOutputPath, reporter, version }: ApiOptions) {
  const originalCwd = process.cwd();
  try {
    if (cwd && originalCwd !== cwd) {
      // There is no other way to get dependencies while using npm
      // rather than being in that particular directory and running a command
      // So it is irrelevant to pass the cwd argument down to be further used
      // to resolve the path
      process.chdir(path.resolve(cwd));
    }
    const compatData = await getCompatData(version);

    if (!reporter && !reportOutputPath) return compatData;

    const isHtmlFile = reportOutputPath?.endsWith('.html');
    const isJsonFile = reportOutputPath?.endsWith('.json');

    if (reportOutputPath && reporter) {
      let finalPath = reportOutputPath;
      let finalReporter = reporter;

      if (isHtmlFile && reporter !== Reporter.Html) {
        finalReporter = Reporter.Html;
        console.warn(
          `Option \`reporter\`is going to be ignored because the report output path ends with ".html"`
        );
      } else if (isJsonFile && reporter !== Reporter.Json) {
        finalReporter = Reporter.Json;
        console.warn(
          `Option \`reporter\` is going to be ignored because the report output path ends with ".json"`
        );
      } else if (!isHtmlFile && !isJsonFile) {
        if (reporter === Reporter.Terminal) {
          finalReporter = Reporter.Html;
          console.warn(
            `The reporter is set to "terminal" and the report output path does not end with ".html" or ".json", defaulting to ".html"`
          );
        }
        finalPath = `${finalPath}${finalPath.endsWith('/') ? '' : '/'}compat.${finalReporter}`;
      }

      await createReport(compatData, version, finalReporter, finalPath);
    } else if (reportOutputPath) {
      if (!isHtmlFile && !isJsonFile) {
        console.warn(
          'The report output path does not end with ".html" or ".json", defaulting to ".html"'
        );
      }

      await createReport(
        compatData,
        version,
        isJsonFile ? Reporter.Json : Reporter.Html,
        reportOutputPath
      );
    } else if (reporter) {
      await createReport(compatData, version, reporter);
    }
  } finally {
    process.chdir(originalCwd);
  }
}
