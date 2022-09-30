import { asyncExec, execWithLog } from '../cli/exec';
import { Managers, viewEnginesCommand } from './getPackageManager';
import { PackageList } from '../types';

export async function getEngines(deps: PackageList, manager: Managers) {
  const command = viewEnginesCommand(manager);
  const depsArray = Object.keys(deps).map(async (dep) => {
    const engines = await asyncExec(
      `${command} ${dep}@${deps[dep].version} engines --json`
    );
    const range = parseEngines(engines, manager);
    return {
      package: dep,
      range,
    };
  });

  return await execWithLog(
    'Fetching engine data',
    async () => await Promise.all(depsArray)
  );
}

function parseEngines(
  engines: { stdout: string; stderr: string },
  manager: Managers
) {
  const res = engines.stdout ? JSON.parse(engines.stdout) : {};
  switch (manager) {
    case 'npm':
      return res.node ? res.node : '';

    case 'yarn':
      return res.data?.node ? res.data.node : '';

    default:
      const wrong = manager as never;
      throw new Error(
        `This error shouldn't happen, but somehow an invalid package manager made it through checks: ${wrong}.`
      );
  }
}
