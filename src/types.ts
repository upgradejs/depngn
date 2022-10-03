export interface EnginesData {
  package: string;
  range: string;
}

export type EnginesDataArray = Array<EnginesData>;

export interface CompatData {
  compatible: boolean | undefined;
  range: string;
}

export type PackageList = Record<string, PackageData>;

export interface PackageData {
  version: string;
  resolved: string;
}

export type Reporter = 'terminal' | 'json';

export type ManagerName = 'npm' | 'yarn';

export interface Manager {
  name: ManagerName;
  list: string;
  engines: string;
}
