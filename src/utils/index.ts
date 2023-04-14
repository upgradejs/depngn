import { promisify } from 'util';
import {
  readFile as syncReadFile,
  writeFile as syncWriteFile,
  stat as syncStat,
  mkdir as syncMkdir,
} from 'fs';
import path from 'path';

// `fs/promises` is only available from Node v14 onwards
// so we import the sync versions of `writeFile` and `access` and transform them into
// async versions using `promisify` (available from Node v8 onwards)
// if we ever decided to drop support for Node <v14, we can revert to using `fs/promises`
export const readFile = promisify(syncReadFile);
export const writeFile = promisify(syncWriteFile);
export const mkdir = promisify(syncMkdir);
export const stat = promisify(syncStat);

export const readJsonFile = async <T>(...filepath: Array<string>): Promise<T | undefined> => {
  try {
    const resolvedPath = path.resolve(...filepath);
    const file = await readFile(resolvedPath, { encoding: 'utf-8' });
    return JSON.parse(file);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      // this means the file we're looking for doesn't exist.
      // return `undefined` so we can handle this in the function
      // it's called in
      return;
    }
    // just throw if the error is unexpected
    throw error;
  }
};

export async function pathExists(path: string) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function writeFileWithFolder(filePath: string, data: string) {
  const dirname = path.dirname(filePath);
  const exist = await pathExists(dirname);
  if (!exist) {
    await mkdir(dirname, { recursive: true });
  }
  await writeFile(filePath, data);
}
