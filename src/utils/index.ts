import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile as syncWriteFile, access as syncAccess } from 'fs';
import path from 'path';

// `fs/promises` is only available from Node v14 onwards
// so we import the sync versions of `writeFile` and `access` and transform them into
// async versions using `promisify` (available from Node v8 onwards)
// if we ever decided to drop support for Node <v14, we can revert to using `fs/promises`
export const access = promisify(syncAccess);
export const writeFile = promisify(syncWriteFile);

export const readJsonFile = async <T>(...filepath: Array<string>): Promise<T> => {
  // TypeScript automatically parses JSON imports for us 
  // when we set `resolveJsonModules: true` in `tsconfig.json`
  return await require(path.resolve(...filepath));
};
