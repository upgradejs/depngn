import { validate } from 'compare-versions';
import { green, red } from 'kleur/colors';

const REPORTERS = ['terminal', 'json'];

export function validateArgs(nodeVersion: string, reporter?: string) {
  validateNodeVersion(nodeVersion);
  validateReporter(reporter);
}

function validateNodeVersion(nodeVersion: string) {
  // defaults to current Node version if not specified
  if (!nodeVersion) return true;
  if (!validate(nodeVersion)) {
    throw new Error(`Invalid Node version: ${red(nodeVersion)}.`);
  }
}

function validateReporter(reporter?: string) {
  // defaults to 'terminal' if not specified
  if (!reporter) return true;
  if (!REPORTERS.includes(reporter)) {
    throw new Error(
      `Invalid reporter: ${red(reporter)}. Valid options are: ${green(
        REPORTERS.join(', ')
      )}.`
    );
  }
}
