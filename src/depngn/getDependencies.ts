import { readFromFile } from '../utils';
import { PackageJson } from '../types';

const AUTO_EXCLUDE = [
  // automatically added to `node_modules` in Angular projects
  '__ngcc_entry_points__.json',
];

export async function getDependencies(): Promise<Array<string>> {
  try {
    const cwd = process.cwd();
    const pkg = await readFromFile<PackageJson>(cwd, 'package.json');
    if (!pkg) {
      throw new Error(`Unable to find package.json in ${cwd}`);
    }
    const deps = Object.keys(pkg.dependencies || {});
    const devDeps = Object.keys(pkg.devDependencies || {});
    const peerDeps = Object.keys(pkg.peerDependencies || {});

    return [...deps, ...devDeps, ...peerDeps].filter(
      (dep) => !AUTO_EXCLUDE.includes(dep)
    );
  } catch (error) {
    throw error;
  }
}
