import { asyncExec } from '../utils';
import { PackageList, Manager } from '../types';

export async function getDependencies(manager: Manager): Promise<PackageList> {
  try {
    const list = await asyncExec(manager.list);
    return JSON.parse(list.stdout).dependencies;
  } catch (error) {
    throw error;
  }
}
