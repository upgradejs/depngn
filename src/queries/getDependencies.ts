import { asyncExec } from './exec';
import { PackageList, Manager } from '../types';

const AUTO_EXCLUDE = [
  // automatically added to `node_modules` in Angular projects
  '__ngcc_entry_points__.json',
];

export async function getDependencies(manager: Manager): Promise<PackageList> {
  try {
    const list = await asyncExec(manager.list);
    const parsedList = JSON.parse(list.stdout).dependencies;
    return Object.keys(parsedList)
    .filter((dep) => !AUTO_EXCLUDE.includes(dep))
    .reduce((acc, curr) => {
      return {
        ...acc,
        [curr]: parsedList[curr],
      }
    }, {});
  } catch (error) {
    throw error;
  }
}
