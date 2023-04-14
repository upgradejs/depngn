import { validateArgs } from 'cli/validate';
import { Reporter } from 'src/types';
import { green, red } from 'kleur/colors';

describe('validate', () => {
  it('throws the correct error when node version is invalid', async () => {
    try {
      await validateArgs({ version: 'foo', reporter: Reporter.Terminal });
    } catch (error) {
      expect((error as Error).message).toBe(`Invalid Node version: ${red('foo')}.`);
    }
  });
  it('throws the correct error when reporter is invalid', async () => {
    try {
      await validateArgs({ version: '1.0.0', reporter: 'foo' as Reporter.Terminal });
    } catch (error) {
      expect((error as Error).message).toBe(
        `Invalid reporter: ${red('foo')}. Valid options are: ${green('terminal, json, html')}.`
      );
    }
  });
  it('throws when cwd is invalid', async () => {
    try {
      await validateArgs({
        version: '1.0.0',
        reporter: Reporter.Terminal,
        cwd: './foo',
      });
    } catch (error) {
      expect((error as Error).message).toBe(
        `Invalid cwd: ${red('./foo')}. This directory does not exist.`
      );
    }
  });
});
