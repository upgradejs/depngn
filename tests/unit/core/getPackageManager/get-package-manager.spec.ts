import { getPackageManager } from 'core/getPackageManager';
import path from 'path';
import { PackageManagerName } from 'src/types';

const npmDir = 'tests/unit/core/getPackageManager/mocks/npm';
const yarnDir = 'tests/unit/core/getPackageManager/mocks/yarn';
const testDir = 'tests/unit/core/getPackageManager';

const originalCwd = process.cwd();

describe('getPackageManager', () => {
  afterAll(() => {
    process.chdir(path.resolve(originalCwd));
  });

  it('determines npm as package manager', async () => {
    process.chdir(path.resolve(originalCwd, npmDir));
    const output = await getPackageManager();
    expect(output.name).toStrictEqual(PackageManagerName.Npm);
  });

  it('determines yarn as package manager', async () => {
    process.chdir(path.resolve(originalCwd, yarnDir));
    const output = await getPackageManager();
    expect(output.name).toStrictEqual(PackageManagerName.Yarn);
  });

  it('throws when no lock file is present', async () => {
    process.chdir(path.resolve(originalCwd, testDir));
    await expect(async () => {
      await getPackageManager();
    }).rejects.toEqual(
      new Error(
        `Could not determine package manager. You may be missing a lock file or using an unsupported package manager.\nThe search was performed on the path - ${process.cwd()}`
      )
    );
  });
});
