import { asyncExec, execWithLog } from "../cli/exec";
import { PackageList } from "../types";

export async function getDependencies(logs: boolean): Promise<PackageList> {
  const list = await npmList(logs);
  return JSON.parse(list.stdout).dependencies;
}

async function npmList(logs: boolean) {
  const execList = async () => await asyncExec(`npm ls --depth=0 --json`);
  return logs
    ? await execWithLog('Reading your dependencies', execList)
    : await execList();
}
