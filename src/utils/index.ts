import { promisify } from 'util';
import { readFile as syncReadFile, writeFile as syncWriteFile, access as syncAccess } from 'fs';
import path from 'path';

// `fs/promises` is only available from Node v14 onwards
// so we import the sync versions of `writeFile` and `access` and transform them into
// async versions using `promisify` (available from Node v8 onwards)
// if we ever decided to drop support for Node <v14, we can revert to using `fs/promises`
export const access = promisify(syncAccess);
export const readFile = promisify(syncReadFile);
export const writeFile = promisify(syncWriteFile);

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
