import { depngn } from 'src/core';
import { red } from 'kleur/colors';

describe('cwd option', () => {
  it('possible to perform the check in the existing directory passing a relative path', async () => {
    const checkResult = await depngn({ version: '18.0.0', cwd: '.' });
    expect(checkResult!.typescript.compatible).toBe(true);
  });

  it('possible to perform the check in the existing directory passing an absolute path', async () => {
    const checkResult = await depngn({ version: '18.0.0', cwd: process.cwd() });
    expect(checkResult).not.toBeNull();
  });

  it('impossible to perform the check in the non-existing directory', async () => {
    const cwd = './x';
    try {
      await depngn({ version: '18.0.0', cwd });
    } catch (e) {
      expect((e as Error).message).toBe(`Invalid cwd: ${red(cwd)}. This directory does not exist.`);
    }
  });

  it('impossible to perform the check in the directory without a lock file', async () => {
    try {
      await depngn({ version: '18.0.0', cwd: './src' });
    } catch (e) {
      expect((e as Error).message).toBe(
        `Could not determine package manager. You may be missing a lock file or using an unsupported package manager.\nThe search was performed on the path - ${process.cwd()}/src`
      );
    }
  });
});
