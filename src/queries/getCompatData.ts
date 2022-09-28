import { asyncExec, execWithLog } from '../cli/exec';
import { PackageList } from '../types';
import { getPackageManager, Managers, viewEnginesCommand } from './packageManagers';

export async function getCompatData() {
  const manager = await getPackageManager();
  if (!manager) {
    throw new Error(
      'Could not determine package manager. You may be missing a lock file or using an unsupported package manager.'
    );
  }
  const deps = await getDependencies();
  return await getEngines(deps, manager);
}

async function getDependencies(): Promise<PackageList> {
  const list = await execWithLog(
    'Reading your dependencies',
    async () => await asyncExec(`npm ls --json`)
  );
  return JSON.parse(list.stdout).dependencies;
}

async function getEngines(deps: PackageList, manager: Managers) {
  const command = viewEnginesCommand(manager);
  const depsArray = Object.keys(deps).map(async (dep) => {
    const engines = await asyncExec(
      `${command} ${dep}@${deps[dep].version} engines --json`
    );
    const version = engines.stdout ? JSON.parse(engines.stdout) : '';
    return {
      package: dep,
      range: version.node ? version.node.replace(' ', '') : '',
    };
  });

  return await execWithLog(
    'Fetching engine data',
    async () => await Promise.all(depsArray)
  );
}
