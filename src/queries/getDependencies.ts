import { asyncExec, execWithLog } from "../cli/exec";
import { PackageList } from "../types";

export async function getDependencies(): Promise<PackageList> {
  const list = await execWithLog(
    'Reading your dependencies',
    async () => await asyncExec(`npm ls --depth=0 --json`)
  );
  return JSON.parse(list.stdout).dependencies;
}
