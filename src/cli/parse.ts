import arg from 'arg';
import { versions } from 'process';
import { Reporter } from 'src/types';

export function parseCliArgs() {
  const args = arg({
    '--help': Boolean,
    '--reporter': String,
    '--cwd': String,
    '--reportDir': String,
    '--reportFileName': String,
    '-h': '--help',
    '-r': '--reporter',
    '-d': '--reportDir',
    '-f': '--reportFileName',
  });
  const version = args._[0] ?? versions.node;
  const reporter = args['--reporter'];
  const help = args['--help'];
  const cwd = args['--cwd'];
  const reportDir = args['--reportDir'];
  const reportFileName = args['--reportFileName'];

  return { version, reporter, help, cwd, reportDir, reportFileName };
}
