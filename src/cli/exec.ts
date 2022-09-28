import { exec } from 'child_process';
import { promisify } from 'util';
import { clearLog, hideCursor, logUpdate, showCursor } from './log';

export const asyncExec = promisify(exec);

export async function execWithLog<T>(text: string, callback: () => Promise<T>) {
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
    const output = await callback();
    return output;
  } catch (error) {
    throw error;
  } finally {
    clear(loadingAnimation);
  }
}

function clear(interval: NodeJS.Timer) {
  clearInterval(interval);
  clearLog();
  showCursor();
}
