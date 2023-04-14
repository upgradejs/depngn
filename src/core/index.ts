import { getCompatData } from './getCompatData';
import { ApiOptions } from 'src/types';
import path from 'path';
import { generateCompatibilityReport } from 'core/generateCompatibilityReport';
import { validateArgs } from 'cli/validate';

export async function depngn({ cwd, reportOutputPath, reporter, version }: ApiOptions) {
  await validateArgs({ version, reporter, cwd });

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

    await generateCompatibilityReport(compatData, { reporter, version, reportOutputPath });
  } finally {
    process.chdir(originalCwd);
  }
}
