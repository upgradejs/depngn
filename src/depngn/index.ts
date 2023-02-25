import { getCompatData } from './getCompatData';
import { Options } from "../types";
import path from "path";

export async function depngn({ cwd, version }: Options) {
  const originalCwd = process.cwd();
  try {
    if (cwd && originalCwd !== cwd) {
      // There is no other way to get dependencies while using npm
      // rather than being in that particular directory and running a command
      // So it is irrelevant to pass the cwd argument down to be further used
      // to resolve the path
      process.chdir(path.resolve(cwd));
    }
    return await getCompatData(version);
  } catch (error) {
    throw new Error(`${error}`);
  } finally {
    process.chdir(originalCwd);
  }
}
