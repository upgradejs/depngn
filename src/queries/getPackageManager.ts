import { access } from 'fs/promises';
import { Manager, ManagerName } from '../types';

const PACKAGE_MANAGER: Record<string, Manager> = {
  npm: {
    name: 'npm',
    list: 'npm ls --depth=0 --json',
    engines: 'npm view',
  },
  yarn: {
    name: 'yarn',
    // `yarn list --depth=0` is misleading and includes dependencies of dependencies
    // for some reason, `npm ls` works with `yarn` apps?
    // context: https://github.com/yarnpkg/yarn/issues/3569
    list: 'npm ls --depth=0 --json',
    engines: 'yarn info',
  },
};

export async function getPackageManager(): Promise<Manager> {
  const managerChecks = [
    pathExists('package-lock.json'),
    pathExists('yarn.lock'),
  ];
  const packageManager: ManagerName | undefined = await Promise.all(
    managerChecks
  ).then(([isNpm, isYarn]) => {
    let manager: ManagerName | undefined;
    if (isNpm) {
      manager = 'npm';
    } else if (isYarn) {
      manager = 'yarn';
    }
    return manager;
  });
  if (!packageManager) {
    throw new Error(
      'Could not determine package manager. You may be missing a lock file or using an unsupported package manager.'
    );
  }
  return PACKAGE_MANAGER[packageManager];
}

async function pathExists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
