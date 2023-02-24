import {
  EnginesDataArray,
  Manager,
  PackageJson,
  PackageList,
  PackageLock,
  PackageManagerName,
} from '../types';
import path from 'path';

export async function getEngines(
  deps: PackageList,
  manager: Manager
): Promise<EnginesDataArray> {
  try {
    switch (manager.name) {
      case PackageManagerName.Npm:
        return await getNpmEngines(deps, manager);

      case PackageManagerName.Yarn:
        return await getYarnEngines(deps);

      default:
        const wrong = manager.name as never;
        throw new Error(
          `This error shouldn't happen, but somehow an invalid package manager made it through checks: ${wrong}.`
        );
    }
  } catch (error) {
    throw error;
  }
}

async function getNpmEngines(deps: PackageList, manager: Manager) {
  const pkgLock: PackageLock = await require(path.resolve(
    process.cwd(),
    manager.lockFile
  ));
  const lockFileVersion = pkgLock.lockfileVersion;
  // `npm` version 7 onwards uses lockfileVersion: 2
  // it's JSON keys are named using the full file path.
  // in lockfileVersion: 1, it was just the name of the package
  const pathPrefix = lockFileVersion === 2 ? 'node_modules/' : '';
  return Object.keys(deps).map((dep) => {
    const range: string =
      pkgLock.packages[`${pathPrefix}${dep}`]?.engines?.node || '';
    return {
      package: dep,
      range,
    };
  });
}

async function getYarnEngines(deps: PackageList) {
  // yarn.lock doesn't contain all the same information as package-lock.json,
  // so we have to traverse `node_modules` to read each package's `package.json`.
  // still faster than fetching from `npm`
  return await Promise.all(
    Object.keys(deps).map(async (dep) => {
      const pkg: PackageJson = await require(path.resolve(
        process.cwd(),
        'node_modules',
        dep,
        'package.json'
      ));
      const range = pkg?.engines?.node || '';
      return {
        package: dep,
        range,
      };
    })
  );
}
