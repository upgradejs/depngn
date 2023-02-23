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

export enum Reporter {
  Terminal = 'terminal',
  Json = 'json',
  Html = 'html'
}

export enum PackageManagerName {
  Npm = 'npm',
  Yarn = 'yarn'
}

export interface Manager {
  name: PackageManagerName;
  list: string;
  engines: string;
  lockFile: string;
}

export interface Options {
  version: string;
  cwd?: string;
}

export interface CliParsedOptions extends Options {
  reporter: Reporter;
}
