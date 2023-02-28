import { depngn } from '../../src';

describe('cwd option', () => {
	it('possible to perform the check in the existing directory passing a relative path', async () => {
		const checkResult = await depngn({ version: '18.0.0', cwd: '.' });
		expect(checkResult.typescript.compatible).toBe(true);
	});

	it('possible to perform the check in the existing directory passing an absolute path', async () => {
		const checkResult = await depngn({ version: '18.0.0', cwd: process.cwd() });
		expect(checkResult).not.toBeNull();
	});

	it('impossible to perform the check in the non-existing directory', async () => {
		try {
			await depngn({ version: '18.0.0', cwd: './x' });
		} catch (e) {
			expect((e as Error ).message).toBe(`Error: ENOENT: no such file or directory, chdir '${process.cwd()}' -> '${process.cwd()}/x'`);
		}
	});

	it('impossible to perform the check in the directory without a lock file', async () => {
		try {
			await depngn({ version: '18.0.0', cwd: './src' });
		} catch (e) {
			expect((e as Error ).message).toBe(`Error: Could not determine package manager. You may be missing a lock file or using an unsupported package manager.\nThe search was performed on the path - ${process.cwd()}/src`);
		}
	});
});
