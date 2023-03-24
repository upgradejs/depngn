import process from 'process';
import { green } from 'kleur/colors';
import onExit from 'signal-exit';

export async function execWithLog<T>(text: string, callback: () => Promise<T>) {
  // this is necessary because the
  // cursor could remain hidden when
  // exited with `^C`
  onExit(() => {
    showCursor();
  });

  const dots = ['', '.', '..', '...'];
  let index = 0;

  hideCursor();
  const loadingAnimation = setInterval(() => {
    clearLog();
    logUpdate(`${text}${dots[index]}`);
    if (index === dots.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
  }, 200);
  try {
    return await callback();
    // eslint-disable-next-line no-useless-catch
  } catch (error) {
    throw error;
  } finally {
    clearInterval(loadingAnimation);
    clearLog();
    showCursor();
  }
}

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
