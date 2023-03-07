import { validate } from 'compare-versions';
import { green, red } from 'kleur/colors';
import fs from 'fs';
import { CliParsedOptions } from '../types';

const REPORTERS = ['terminal', 'json', 'html'];

export function validateArgs({ version, reporter, cwd }: CliParsedOptions) {
  validateNodeVersion(version);
  validateReporter(reporter);
  if (cwd) validateCwd(cwd);
}

function validateNodeVersion(nodeVersion: string) {
  if (!validate(nodeVersion)) {
    throw new Error(`Invalid Node version: ${red(nodeVersion)}.`);
  }
}

function validateReporter(reporter: string) {
  if (!REPORTERS.includes(reporter)) {
    throw new Error(
      `Invalid reporter: ${red(reporter)}. Valid options are: ${green(REPORTERS.join(', '))}.`
    );
  }
}

function validateCwd(cwd: string) {
  fs.existsSync(cwd);
}
