import { getEngines } from '../../../../src/depngn/getEngines';
import { MANAGERS } from '../../../../src/depngn/getPackageManager';
import path from 'path';
import { PackageManagerName } from '../../../../src/types';

const npmDir = 'tests/unit/depngn/getEngines/mocks/npm';
const yarnDir = 'tests/unit/depngn/getEngines/mocks/yarn';
const lockfileVersion1 = `${npmDir}/lockfileVersion1`;
const lockfileVersion2 = `${npmDir}/lockfileVersion2`;

const originalCwd = process.cwd();

const mockDeps = ['test-package-1', 'test-package-2'];

describe('getEngines', () => {
  afterAll(() => {
    process.chdir(path.resolve(originalCwd));
  });

  describe('reads from package-lock.json when package manager is npm', () => {
    it('and lockfileVersion is 1', async () => {
      process.chdir(path.resolve(originalCwd, lockfileVersion1));
      const output = await getEngines(mockDeps, MANAGERS[PackageManagerName.Npm]);
      expect(output).toStrictEqual([{ package: 'test-package-1', range: '1.0.0' }, { package: 'test-package-2', range: '' }]);
    });

    it('and lockfileVersion is 2', async () => {
      process.chdir(path.resolve(originalCwd, lockfileVersion2));
      const output = await getEngines(mockDeps, MANAGERS[PackageManagerName.Npm]);
      expect(output).toStrictEqual([{ package: 'test-package-1', range: '1.0.0' }, { package: 'test-package-2', range: '' }]);
    });
  });

  it('reads from node_modules when package manager is yarn', async () => {
    process.chdir(path.resolve(originalCwd, yarnDir));
    const output = await getEngines(mockDeps, MANAGERS[PackageManagerName.Yarn]);
    expect(output).toStrictEqual([{ package: 'test-package-1', range: '1.0.0' }, { package: 'test-package-2', range: '' }]);
  });
});
