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
    .reduce((acc, curr) => {
      if (AUTO_EXCLUDE.includes(curr)) {
        return acc;
      }
      return {
        ...acc,
        [curr]: parsedList[curr],
      }
    }, {});
  } catch (error) {
    throw error;
  }
}
