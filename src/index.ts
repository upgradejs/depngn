import { getCompatData } from './queries';

export async function depngn(version: string) {
  try {
    return await getCompatData(version, { logs: false });
  } catch (error) {
    throw new Error(`${error}`);
  }
}
