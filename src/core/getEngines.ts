import { readJsonFile } from '../utils';
import {
  EnginesDataArray,
  Manager,
  PackageJson,
  PackageLock,
  PackageManagerName,
} from '../types';

export async function getEngines(deps: Array<string>, manager: Manager): Promise<EnginesDataArray> {
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

async function getNpmEngines(deps: Array<string>, manager: Manager) {
  // at this point, we know `package-lock.json` exists
  // as that's how we determined that `npm` is the package manager
  const pkgLock = await readJsonFile<PackageLock>(
    process.cwd(),
    manager.lockFile
  );
  // `npm` version 7 onwards uses lockfileVersion: 2
  // it's JSON keys are named using the full file path.
  // in lockfileVersion: 1, it was just the name of the package
  const prefix = pkgLock?.lockfileVersion === 2 ? 'node_modules/' : '';
  return deps.map((dep) => {
    const range = pkgLock?.packages[`${prefix}${dep}`]?.engines?.node || '';
    return {
      package: dep,
      range,
    };
  });
}

async function getYarnEngines(deps: Array<string>) {
  const cwd = process.cwd();
  // `yarn.lock` doesn't contain all the same information as package-lock.json,
  // so we have to traverse `node_modules` to read each package's `package.json`.
  // still faster than fetching from `npm`
  return await Promise.all(
    deps.map(async (dep) => {
      const pkg = await readJsonFile<PackageJson>(
        cwd,
        'node_modules',
        dep,
        'package.json'
      );
      const range = pkg?.engines?.node || '';
      return {
        package: dep,
        range,
      };
    })
  );
}
