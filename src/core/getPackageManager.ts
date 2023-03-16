import { access } from 'src/utils';
import { Manager, PackageManagerName } from 'src/types';

export const MANAGERS: Record<string, Manager> = {
  [PackageManagerName.Npm]: {
    name: PackageManagerName.Npm,
    lockFile: 'package-lock.json',
  },
  [PackageManagerName.Yarn]: {
    name: PackageManagerName.Yarn,
    lockFile: 'yarn.lock',
  },
};

export async function getPackageManager(): Promise<Manager> {
  const managerChecks = [
    pathExists(MANAGERS[PackageManagerName.Npm].lockFile),
    pathExists(MANAGERS[PackageManagerName.Yarn].lockFile),
  ];
  const packageManager: PackageManagerName | undefined = await Promise.all(
    managerChecks
  ).then(([isNpm, isYarn]) => {
    let manager: PackageManagerName | undefined;
    if (isNpm) {
      manager = PackageManagerName.Npm;
    } else if (isYarn) {
      manager = PackageManagerName.Yarn;
    }
    return manager;
  });
  if (!packageManager) {
    const currentCwd = process.cwd();
    throw new Error(
      `Could not determine package manager. You may be missing a lock file or using an unsupported package manager.\nThe search was performed on the path - ${currentCwd}`
    );
  }
  return MANAGERS[packageManager];
}

async function pathExists(path: string) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}
