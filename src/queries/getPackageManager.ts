import { access } from '../utils';
import { Manager, PackageManagerName } from '../types';

const PACKAGE_MANAGER: Record<string, Manager> = {
  [PackageManagerName.Npm]: {
    name: PackageManagerName.Npm,
    list: 'npm ls --depth=0 --json',
    engines: 'npm view',
  },
  [PackageManagerName.Yarn]: {
    name: PackageManagerName.Yarn,
    // `yarn list --depth=0` is misleading and includes dependencies of dependencies
    // for some reason, `npm ls` works with `yarn` apps?
    // context: https://github.com/yarnpkg/yarn/issues/3569
    list: 'npm ls --depth=0 --json',
    engines: 'yarn info',
  },
};

export async function getPackageManager(): Promise<Manager> {
  const managerChecks = [pathExists('package-lock.json'), pathExists('yarn.lock')];
  const packageManager: PackageManagerName | undefined = await Promise.all(managerChecks).then(
    ([isNpm, isYarn]) => {
      let manager: PackageManagerName | undefined;
      if (isNpm) {
        manager = PackageManagerName.Npm;
      } else if (isYarn) {
        manager = PackageManagerName.Yarn;
      }
      return manager;
    }
  );
  if (!packageManager) {
    const currentCwd = process.cwd();
    throw new Error(
      `Could not determine package manager. You may be missing a lock file or using an unsupported package manager.\nThe search was performed on the path - ${currentCwd}`
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
