import { validate } from 'compare-versions';
import { green, red } from 'kleur/colors';
import { ApiOptions, Reporter } from 'src/types';
import { pathExists } from 'src/utils';

const REPORTERS = [Reporter.Terminal, Reporter.Json, Reporter.Html];

export async function validateArgs({ version, reporter, cwd }: ApiOptions) {
  validateNodeVersion(version);
  if (reporter) validateReporter(reporter);
  if (cwd) await validateCwd(cwd);
}

function validateNodeVersion(nodeVersion: string) {
  if (!validate(nodeVersion)) {
    throw new Error(`Invalid Node version: ${red(nodeVersion)}.`);
  }
}

function validateReporter(reporter: Reporter) {
  if (!REPORTERS.includes(reporter)) {
    throw new Error(
      `Invalid reporter: ${red(reporter)}. Valid options are: ${green(REPORTERS.join(', '))}.`
    );
  }
}

async function validateCwd(cwd: string) {
  if (!(await pathExists(cwd))) {
    throw new Error(`Invalid cwd: ${red(cwd)}. This directory does not exist.`);
  }
}
