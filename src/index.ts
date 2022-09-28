import { getCompatData } from './queries';
import { createReport } from './reporter';
import { validateArgs } from './validate';

interface Depngn {
  version: string;
  reporter: 'terminal' | 'json'
}

export async function depngn({ version, reporter = 'json' }: Depngn) {
  try {
    validateArgs(version, reporter);
    const compatData = await getCompatData();
    return createReport(compatData, version, reporter);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
