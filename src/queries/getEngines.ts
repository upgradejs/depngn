import {
  EnginesDataArray,
  Manager,
  PackageJson,
  PackageList,
  PackageLock,
  PackageManagerName,
} from '../types';
import path from 'path';

export async function getEngines(deps: PackageList, manager: Manager): Promise<EnginesDataArray> {
  try {
    switch (manager.name) {
      case PackageManagerName.Npm: {
        const pkgLock: PackageLock = await require(path.resolve(
          process.cwd(),
          manager.lockFile
        ));
        const lockFileVersion = pkgLock.lockfileVersion;
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
    case PackageManagerName.Yarn: {
      return await Promise.all(Object.keys(deps).map(async (dep) => {
        const pkg: PackageJson = await require(
          path.resolve(process.cwd(), 'node_modules', dep, 'package.json')
        );
        const range = pkg?.engines?.node || '';
        return {
          package: dep,
          range
        }
      }));
    }
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
