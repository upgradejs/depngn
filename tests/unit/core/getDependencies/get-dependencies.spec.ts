import { getDependencies } from '../../../../src/core/getDependencies';
import path from 'path';

const withPackageTestDir =
  'tests/unit/core/getDependencies/mocks/withPackageJson';
const withoutPackageTestDir =
  'tests/unit/core/getDependencies/mocks/withoutPackageJson';

const originalCwd = process.cwd();

describe('getDepdendencies', () => {
  afterAll(() => {
    process.chdir(path.resolve(originalCwd));
  });

  it('reads dependencies from `package.json`', async () => {
    process.chdir(path.resolve(originalCwd, withPackageTestDir));
    const output = await getDependencies();
    expect(output).toStrictEqual([
      'test-package-1',
      `test-package-2`,
      `test-package-3`,
    ]);
  });

  it('throws when no `package.json` is present', async () => {
    process.chdir(path.resolve(originalCwd, withoutPackageTestDir));
    await expect(async () => {
      await getDependencies();
    }).rejects.toEqual(
      new Error(`Unable to find package.json in ${process.cwd()}`)
    );
  });
});
