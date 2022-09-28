import { access } from "fs/promises";


const PACKAGE_MANAGER = {
  npm: {
    list: 'npm ls',
    engines: 'npm view'
  },
  yarn: {
    // `yarn list --depth=0` is misleading and includes dependencies of dependencies
    // for some reason, `npm ls` works with `yarn` apps?
    // context: https://github.com/yarnpkg/yarn/issues/3569
    list: 'npm ls',
    engines: 'yarn info'
  }
};

export type Managers = 'npm' | 'yarn';

export async function getPackageManager() {
  const managerChecks = [
    pathExists('package-lock.json'),
    pathExists('yarn.lock')
  ];
  return Promise.all(managerChecks).then(([isNpm, isYarn]) => {
    let manager: Managers | undefined;
    if (isNpm) {
      manager = 'npm';
    } else if (isYarn) {
      manager = 'yarn'
    }
    return manager;
  });
}

async function pathExists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export function listCommand(manager: keyof typeof PACKAGE_MANAGER) {
  return PACKAGE_MANAGER[manager].list;
}

export function viewEnginesCommand(manager: keyof typeof PACKAGE_MANAGER) {
  return PACKAGE_MANAGER[manager].engines;
}
