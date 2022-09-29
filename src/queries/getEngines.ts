import { asyncExec, execWithLog } from "../cli/exec";
import { EnginesData, PackageList } from "../types";
import { Managers, viewEnginesCommand } from "./getPackageManager";

export async function getEngines(deps: PackageList, manager: Managers, logs: boolean) {
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

  return await promiseAllEngines(depsArray, logs);
}

async function promiseAllEngines(
  promises: Array<Promise<EnginesData>>,
  logs: boolean
) {
  const enginesPromise = async () => await Promise.all(promises);
  return logs
    ? await execWithLog('Fetching engine data', enginesPromise)
    : await enginesPromise();
}
