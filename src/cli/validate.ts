import { validate } from 'compare-versions';
import { green, red } from 'kleur/colors';

const REPORTERS = ['terminal', 'json', 'html'];

export function validateArgs(nodeVersion: string, reporter: string) {
  validateNodeVersion(nodeVersion);
  validateReporter(reporter);
}

function validateNodeVersion(nodeVersion: string) {
  if (!validate(nodeVersion)) {
    throw new Error(`Invalid Node version: ${red(nodeVersion)}.`);
  }
}

function validateReporter(reporter: string) {
  if (!REPORTERS.includes(reporter)) {
    throw new Error(
      `Invalid reporter: ${red(reporter)}. Valid options are: ${green(
        REPORTERS.join(', ')
      )}.`
    );
  }
}
