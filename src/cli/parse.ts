import arg from 'arg';
import { asyncExec } from './exec';

export async function parseCliArgs() {
    const args = arg({
      '--help': Boolean,
      '--reporter': String,
      '-h': '--help',
      '-r': '--reporter',
    });
    const version = await safeVersion(args._[0]);
    const reporter = args['--reporter'] ?? 'terminal';
    const help = args['--help'];
    return { version, reporter, help };
}

async function safeVersion(version: string): Promise<string> {
  let output;
  if (!version) {
    const res = await asyncExec('node --version');
    output = res.stdout;
  } else {
    output = version;
  }
  return output.trim();
}
