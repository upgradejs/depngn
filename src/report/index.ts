import { CompatDataMap, Reporter, ReportOptions } from 'src/types';
import log from 'fancy-log';
import { create } from './create';

export async function report(
  compatData: CompatDataMap,
  { reporter, version, reportOutputPath }: ReportOptions
) {
  const isHtmlFile = reportOutputPath?.endsWith('.html');
  const isJsonFile = reportOutputPath?.endsWith('.json');

  if (reportOutputPath && reporter) {
    let finalPath = reportOutputPath;
    let finalReporter = reporter;

    if (isHtmlFile && reporter !== Reporter.Html) {
      finalReporter = Reporter.Html;
      log.warn(
        `The option \`reporter\` is set to "${reporter}" and is going to be ignored because the report output path ends with ".html"`
      );
    } else if (isJsonFile && reporter !== Reporter.Json) {
      finalReporter = Reporter.Json;
      log.warn(
        `The option \`reporter\` is set to "${reporter}" and is going to be ignored because the report output path ends with ".json"`
      );
    } else if (!isHtmlFile && !isJsonFile) {
      if (reporter === Reporter.Terminal) {
        finalReporter = Reporter.Html;
        log.warn(
          `The option \`reporter\` is set to "${Reporter.Terminal}" and the report output path does not end with ".html" or ".json", defaulting to ".html"`
        );
      }
      finalPath = `${finalPath}${finalPath.endsWith('/') ? '' : '/'}compat.${finalReporter}`;
    }

    await create(compatData, version, finalReporter, finalPath);
  } else if (reportOutputPath) {
    if (!isHtmlFile && !isJsonFile) {
      log.warn(
        'The report output path does not end with ".html" or ".json", defaulting to ".html"'
      );
    }

    await create(compatData, version, isJsonFile ? Reporter.Json : Reporter.Html, reportOutputPath);
  } else if (reporter) {
    await create(compatData, version, reporter);
  }
}
