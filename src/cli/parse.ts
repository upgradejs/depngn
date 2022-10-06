import arg from 'arg';
import { versions } from 'process';

export function parseCliArgs() {
    const args = arg({
      '--help': Boolean,
      '--reporter': String,
      '-h': '--help',
      '-r': '--reporter',
    });
    const version = args._[0] ?? versions.node;
    const reporter = args['--reporter'] ?? 'terminal';
    const help = args['--help'];
    return { version, reporter, help };
}
