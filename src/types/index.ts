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

interface RecursiveJsonObject {
  [key: string]: string | RecursiveJsonObject;
}

export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  homepage?: string;
  author?: string | { name: string; email: string; url: string };
  funding?: string | { type: string; url: string } | Array<string | { type: string; url: string }>;
  license?: string;
  bugs?: string | { email: string; url: string };
  repository?:
    | string
    | {
        type?: string;
        url?: string;
        directory?: string;
      };
  keywords?: string;
  type?: string;
  main?: string;
  module?: string;
  exports?: Record<string, string> | Record<string, Record<string, string>>;
  bin?: string | Record<string, string>;
  browser?: string;
  files?: Array<string>;
  scripts?: Record<string, string>;
  engines?: Record<string, string>;
  os?: Array<string>;
  cpu?: Array<string>;
  private?: boolean;
  workspaces?: Array<string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: RecursiveJsonObject;
  optionalDependencies?: Record<string, string>;
  overrides?: RecursiveJsonObject;
  resolutions?: RecursiveJsonObject;
}

export interface BaseOptions {
  version: string;
  cwd?: string;
}

export interface CliParsedOptions extends BaseOptions {
  reporter: Reporter;
}

export interface ApiOptions extends BaseOptions {
  reportOutputPath?: string;
  reporter?: Reporter;
}

export type CompatDataMap = Record<string, CompatData>;
