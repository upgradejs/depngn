# depngn (short for dependency engine)

A CLI tool to find out if your dependencies support a given version of `node`.
It fetches the `engines` field of your dependencies' `package.json` file and,
if it's present, determines whether or not the version of `node` satisfies the
range of supported versions.

## CLI

### Usage

```bash
npx depngn <node-version> [options]

# examples
npx depngn 10.0.0

npx depngn 14.17.6 --reporter=json
```

### Node Version

`depngn` will accept any single value version of `node` as an argument (ie, not a range). If no version is given, it will attempt to determine your current `node` version and use that.

### Options

`depngn` supports these options:

- `--help`
- `--cwd`
- `--reporter`
- `--reportDir`
- `--reportFileName`

#### `--cwd`

Specify the path where you want the check to be performed 

#### `--reporter`

These are the valid values for `--reporter`:

- `terminal` (**default**): It will output a table to the terminal.
- `html`: It will generate an HTML file named `compat.html` to the directory the
command is executed in.
- `json`: It will write a file named `compat.json` to the directory the command
is executed in. It uses the following format:

```javascript
[package_name]: {
  compatible: boolean // whether or not this package will work with the given Node version
  range: string // the range of supported Node versions
}
```

#### `--reportDir`
This allows you to specify the path where you want the report to be generated. If no path is specified, it will default to the current working directory.

#### `--reportFileName`
This allows you to specify the name of the report file. If no name is specified, it will default to `compat`.

### A Note on The Engines Field

The `engines` field in `package.json` is optional and many libraries don't include it. If that's the case, the output for that package will be:

```javascript
{
  compatible: undefined,
  range: 'n/a'
}
```

## Standalone Package

You can also import `depngn` as a standalone function to use in your own CLI
tools. It takes an object as an argument:

```typescript
interface Options {
  version: string;
  cwd: string | undefined;
}
```

And it returns a promise that resolves to:

```typescript
type DepngnReturn = Record<string, CompatData>;

interface CompatData {
  compatible: boolean | 'invalid' | undefined;
  range: string;
}
```

### Usage

```javascript
import { depngn } from 'depngn';

const generateReport = async () => {
  return await depngn({ version: '10.0.0' });
};
```

There's also a chance there *is* an `engines` field specified in the package, but the range is invalid in some way. Since RegEx for SemVer can be tricky, we return the following, if that's the case:

```javascript
{
  compatible: 'invalid',
  range: '1 .2 . 0not-a-valid-range'
}
```

## Report module

You can import `report` (the function that generates a report file when using CLI) as a standalone function to use in your tools to create reports exactly when you need them. It takes two arguments - the first is a result of the `depngn` function, and the second is an object with options:

```typescript
interface CliOptions {
  version: string;
  cwd: string | undefined;
  reporter: 'terminal' | 'html' | 'json' | undefined;
  reportDir: string | undefined;
  reportFileName: string | undefined;
}
```

It returns a promise that resolves as a report file of the given type (`html`, `json`) or prints the result to the console if the report is not provided or is `terminal`.

### Usage

```javascript
import { report } from 'depngn/report';

const createReport = async () => {
  const desiredVersion = '10.0.0';
  const result = await depngn({ version: desiredVersion });
  await report(result, { version: desiredVersion, reportDir: './dependencies-reports', reportFileName: 'depngn' });
};
```

## Supported Package Managers

For now, this package supports `npm` and `yarn`. If you want support for
your favorite package manager, feel free to open a PR!

## Development

In order to start contributing to `depngn`, you can follow these steps: [CONTRIBUTING.md](CONTRIBUTING.md)

## CHANGELOG

If you want to see what changed between versions: [CHANGELOG.md](CHANGELOG.md)

## Possible future features
- Support the ability to sort and/or filter output
- Ignore irrelevant dependencies (ie, `@types/<package>`)
- Support all `node` versions (pretty sure this should work going back to `node` version `10`, but if we wrote our own versions of some dependencies, we could support further back. the main offender is `table` (`>=10.0.0`), but a lot of modern cli table packages seem to only support `node` `10` or `12` and above).
- Support attempting to determine support for dependencies that don't include `engines` field (not sure if it's worth it, since we'd have to fetch the `engines` of the dependency's dependencies and make an educated guess on what the supported version range is)
- Support `pnpm`
