# depngn

(short for dependency engine)

A CLI tool to find out if your dependencies support a given version of `node`. It fetches the `engines` field of your dependencies' `package.json` file and, if it's present, determines whether or not the version of `node` satisfies the range of supported versions.

## CLI

### Usage

```bash
npx depngn <node-version> [options]

# examples
npx depngn 10.0.0

npx depngn 14.17.6 --reporter=json
```

**Note**:
For now, this package only supports `npm` and `yarn`. If you want support for your favorite package manager, feel free to open a PR!

### Node Version

`depngn` will accept any single value version of `node` as an argument (ie, not a range). If no version is given, it will attempt to determine your current `node` version and use that.

### Options

#### `reporter`

The only option right now (besides `--help`) is `--reporter`. The valid values are `terminal` (default) or `json`.

`terminal` will output a table to the terminal and `json` will write a file to the directory the command is executed in. It uses the following format:

```javascript
[package_name]: {
  compatible: boolean // whether or not this package will work with the given Node version
  range: string // the range of supported Node versions
}
```

**Note**
The `engines` field in `package.json` is optional and many libraries don't include it. If that's the case, the output for that package will be:

```javascript
{
  compatible: undefined,
  range: 'n/a'
}
```

## Standalone Package

You can also import `depngn` as a standalone function to use in your own CLI tools. It takes one argument: `nodeVersion: string`, and it returns a promise that resolves to:

```typescript
type DepngnReturn = Record<string, CompatData>;

interface CompatData {
  compatible: boolean | undefined;
  range: string;
}
```

### Usage

```javascript
import { depngn } from 'depngn';

const generateReport = async () => {
  return await depngn('10.0.0');
};
```

## Possible future features
- Support the ability to sort and/or filter output
- Ignore irrelevant dependencies (ie, `@types/<package>`)
- Support `html` output
- Support all `node` versions (pretty sure this should work going back to `node` version `10`, but if we wrote our own versions of some dependencies, we could support further back. the main offender is `table` (`>=10.0.0`), but a lot of modern cli table packages seem to only support `node` `10` or `12` and above).
- Support attempting to determine support for dependencies that don't include `engines` field (not sure if it's worth it, since we'd have to fetch the `engines` of the dependency's dependencies and make an educated guess on what the supported version range is)
- Support `pnpm`
