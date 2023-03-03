export interface EnginesData {
  package: string;
  range: string;
}

export type EnginesDataArray = Array<EnginesData>;

export interface CompatData {
  compatible: boolean | 'invalid' | undefined;
  range: string;
}

export enum Reporter {
  Terminal = 'terminal',
  Json = 'json',
  Html = 'html',
}

export enum PackageManagerName {
  Npm = 'npm',
  Yarn = 'yarn',
}

export interface Manager {
  name: PackageManagerName;
  lockFile: string;
}

export interface PackageInfo {
  version: string;
  resolved: string;
  integrity: string;
  dev: boolean;
  dependencies: Record<string, string>;
  engines?: {
    node?: string;
  };
}

export interface PackageLock {
  name: string;
  version: string;
  lockfileVersion: number;
  requires: boolean;
  packages: Record<string, PackageInfo>;
}

export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  author?: string | { name: string };
  license?: string;
  bugs?: string | { email: string; url: string };
  repository?:
    | string
    | {
        type?: 'git';
        url?: string;
        directory?: string;
      };
  keywords?: string;
  type?: string;
  main?: string;
  module?: string;
  exports?: Record<string, string> | Record<string, Record<string, string>>;
  bin?: Record<string, string>;
  files?: Array<string>;
  scripts?: Record<string, string>;
  engines?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export interface Options {
  version: string;
  cwd?: string;
}

export interface CliParsedOptions extends Options {
  reporter: Reporter;
}
