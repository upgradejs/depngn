import { asyncExec } from './exec';
import {
  EnginesDataArray,
  Manager,
  PackageList,
  PackageManagerName,
} from '../types';
import path from 'path';

export async function getEngines(deps: PackageList, manager: Manager) {
  try {
    let enginesData: EnginesDataArray;
    if (manager.name === PackageManagerName.Npm) {
      const pkgLock = await require(path.resolve(
        process.cwd(),
        'package-lock.json'
      ));
      return Object.keys(deps).map((dep) => {
        const range: string =
          pkgLock.packages[`node_modules/${dep}`]?.engines?.node || '';
        return {
          package: dep,
          range,
        };
      });
    } else if (manager.name === PackageManagerName.Yarn) {
      enginesData = [] as never;
    } else {
      enginesData = [] as never;
    }
  } catch (error) {
    throw error;
  }
}

function parseEngines(
  engines: { stdout: string; stderr: string },
  manager: Manager
) {
  const res = engines.stdout ? JSON.parse(engines.stdout) : {};
  switch (manager.name) {
    case PackageManagerName.Npm:
      return res.node ? res.node : '';
    case PackageManagerName.Yarn:
      return res.data?.node ? res.data.node : '';
    default:
      const wrong = manager.name as never;
      throw new Error(
        `This error shouldn't happen, but somehow an invalid package manager made it through checks: ${wrong}.`
      );
  }
}

async function fetchEngines(
  deps: PackageList,
  manager: Manager
): Promise<EnginesDataArray> {
  try {
    // const pkg = await require(path.resolve(process.cwd(), 'package.json'));
    const pkgLock = await require(path.resolve(
      process.cwd(),
      'package-lock.json'
    ));
    return Object.keys(deps).map((dep) => {
      const range: string =
        pkgLock.packages[`node_modules/${dep}`]?.engines?.node || '';
      return {
        package: dep,
        range,
      };
    });
  } catch (error) {
    throw error;
  }
}
