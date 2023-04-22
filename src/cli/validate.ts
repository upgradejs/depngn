import {validate} from 'compare-versions';
import {green, red, yellow} from 'kleur/colors';
import {CliOptions, Reporter} from 'src/types';
import {pathExists} from 'src/utils';

const REPORTERS = [Reporter.Terminal, Reporter.Json, Reporter.Html];

export async function validateArgs({
  version,
  reporter,
  cwd,
  reportDir,
  reportFileName,
}: CliOptions) {
  validateNodeVersion(version);
  if (reporter) validateReporter(reporter);
  if (cwd) await validateCwd(cwd);
  if (reportDir) validateReportDir(reporter);
  if (reportFileName) validateReportFileName(reporter);
}

function validateReportDir(reporter?: Reporter) {
  if (!reporter) {
    throw new Error(
      `When using ${green('--reportDir')} you must also specify ${yellow('--reporter')}.`
    );
  }

  if (![Reporter.Html, Reporter.Json].includes(reporter)) {
    throw new Error(
      `Both ${yellow('--reporterDir')} and ${yellow(
        '--reporter'
      )} were specified. Either remove one of these options or change the ${yellow(
        '--reporter'
      )} to ${green(Reporter.Json)} or ${green(Reporter.Html)}.`
    );
  }
}

function validateReportFileName(reporter?: Reporter) {
  if (!reporter) {
    throw new Error(
      `When using ${green('--reportFileName')} you must also specify ${yellow('--reporter')}.`
    );
  }

  if (![Reporter.Html, Reporter.Json].includes(reporter)) {
    throw new Error(
      `Both ${yellow('--reportFileName')} and ${yellow(
        '--reporter'
      )} were specified. Either remove one of these options or change the ${yellow(
        '--reporter'
      )} to ${green(Reporter.Json)} or ${green(Reporter.Html)}.`
    );
  }
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
