import { validateArgs } from 'cli/validate';
import { Reporter } from 'src/types';
import {green, red, yellow} from 'kleur/colors';

describe('validate', () => {
  it('throws the correct error when node version is invalid', async () => {
    try {
      await validateArgs({
        version: 'foo',
        reporter: Reporter.Terminal,
      });
    } catch (error) {
      expect((error as Error).message).toBe(`Invalid Node version: ${red('foo')}.`);
    }
  });
  it('throws the correct error when reporter is invalid', async () => {
    try {
      await validateArgs({
        version: '1.0.0',
        reporter: 'foo' as Reporter.Terminal,
      });
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

  it('throws when reportDir is specified without a proper reporter', async () => {
    try {
      await validateArgs({
        version: '1.0.0',
        reportDir: './foo',
      });
    } catch (error) {
      expect((error as Error).message).toBe(
        `When using ${green('--reportDir')} you must also specify ${yellow('--reporter')}.`
      );
    }
  });

  it('throws when reportDir is specified with a wrong reporter', async () => {
    try {
      await validateArgs({
        version: '1.0.0',
        reporter: Reporter.Terminal,
        reportDir: './foo',
      });
    } catch (error) {
      expect((error as Error).message).toBe(
        `Both ${yellow('--reporterDir')} and ${yellow(
          '--reporter'
        )} were specified. Either remove one of these options or change the ${yellow(
          '--reporter'
        )} to ${green(Reporter.Json)} or ${green(Reporter.Html)}.`
      );
    }
  });

  it('throws when reportFileName is specified without a proper reporter', async () => {
    try {
      await validateArgs({
        version: '1.0.0',
        reportFileName: 'bar',
      });
    } catch (error) {
      expect((error as Error).message).toBe(
        `When using ${green('--reportFileName')} you must also specify ${yellow('--reporter')}.`
      );
    }
  });

  it('throws when reportFileName is specified with a wrong reporter', async () => {
    try {
      await validateArgs({
        version: '1.0.0',
        reporter: Reporter.Terminal,
        reportFileName: 'bar',
      });
    } catch (error) {
      expect((error as Error).message).toBe(
        `Both ${yellow('--reportFileName')} and ${yellow(
          '--reporter'
        )} were specified. Either remove one of these options or change the ${yellow(
          '--reporter'
        )} to ${green(Reporter.Json)} or ${green(Reporter.Html)}.`
      );
    }
  });
});
