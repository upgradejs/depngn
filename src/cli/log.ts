import process from 'process';
import { green } from 'kleur/colors';

export function hideCursor() {
  process.stdout.write('\x1B[?25l');
}

export function showCursor() {
  process.stdout.write('\x1B[?25h');
}

export function logUpdate(text: string) {
  process.stdout.write(green(text));
}

export function clearLog() {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
}

// you can `throw` anything in JavaScript, so typing an error is silly -- we just want to log it and quit
export function bail(error: unknown) { 
  clearLog();
  showCursor();
  console.log(error);
  process.exitCode = 1;
}
