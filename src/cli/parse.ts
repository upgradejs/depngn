import arg from 'arg';
import { versions } from 'process';
import { Reporter } from 'src/types';

export function parseCliArgs() {
  const args = arg({
    '--help': Boolean,
    '--reporter': String,
    '--cwd': String,
    '--reportOutputPath': String,
    '-h': '--help',
    '-r': '--reporter',
    '-o': '--reportOutputPath',
  });
  const version = args._[0] ?? versions.node;
  const reporter = (args['--reporter'] as Reporter) ?? Reporter.Terminal;
  const help = args['--help'];
  const cwd = args['--cwd'];
  const reportOutputPath = args['--reportOutputPath'];

  return { version, reporter, help, cwd, reportOutputPath };
}
