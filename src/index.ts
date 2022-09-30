import { getCompatData } from './queries';

export async function depngn(version: string) {
  try {
    return await getCompatData(version);
  } catch (error) {
    throw new Error(`${error}`);
  }
}
