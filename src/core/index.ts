import { getCompatData } from './getCompatData';
import { ApiOptions, Reporter } from 'src/types';
import path from 'path';
import { createReport } from 'cli/reporter';

export async function depngn({ cwd, version, reportOutputPath }: ApiOptions) {
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

    if (!reportOutputPath) return compatData;

    const isHtmlFile = reportOutputPath.endsWith('.html');

    await createReport(
      compatData,
      version,
      isHtmlFile ? Reporter.Html : Reporter.Json,
      reportOutputPath
    );
  } finally {
    process.chdir(originalCwd);
  }
}
