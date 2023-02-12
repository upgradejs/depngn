import { asyncExec } from '../utils';
import { Manager, PackageList, PackageManagerName } from '../types';

export async function getEngines(deps: PackageList, manager: Manager) {
  try {
    const depsArray = Object.keys(deps).map(async (dep) => {
      const engines = await asyncExec(
        `${manager.engines} ${dep}@${deps[dep].version} engines --json`
      );
      const range = parseEngines(engines, manager);
      return {
        package: dep,
        range,
      };
    });

    return await Promise.all(depsArray);
  } catch (error) {
    throw error;
  }
}

function parseEngines(
  engines: { stdout: string; stderr: string },
  manager: Manager
) {
  const res = engines.stdout ? JSON.parse(engines.stdout) : {};
  switch (manager.name) {
    case PackageManagerName.Npm:
      return res.node ? res.node : '';
    case PackageManagerName.Yarn:
      return res.data?.node ? res.data.node : '';
    default:
      const wrong = manager.name as never;
      throw new Error(
        `This error shouldn't happen, but somehow an invalid package manager made it through checks: ${wrong}.`
      );
  }
}
