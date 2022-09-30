import { asyncExec, execWithLog } from "../cli/exec";
import { Managers, viewEnginesCommand } from "./getPackageManager";
import { PackageList } from "../types";

export async function getEngines(deps: PackageList, manager: Managers) {
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
