export interface CompatData {
  package: string;
  range: string;
}

export type CompatDataArray = Array<CompatData>;

export interface CompatObject {
  compatible: boolean | undefined;
  range: string;
}

export type PackageList = Record<string, PackageData>;

export interface PackageData {
  version: string;
  resolved: string;
}
