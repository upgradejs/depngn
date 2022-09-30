# Contributing

## Getting Started

```bash
git clone git@github.com:ombulabs/depngn.git
cd depngn
npm install
```

To be able to test running the CLI manually:

```bash
npm run build
npm link
depngn --help
```

## How it works

This package uses several `npm`/`yarn` built-in commands to fetch information about your dependencies:

```bash
# used when there is no `version` argument passed
node --version

# gets a list of your top-level dependencies. we use
# this because it contains the actual version of each
# package, instead of range (like in `package.json`).
#
# `yarn`'s version of this command is weird right now
# and doesn't respect the `depth` parameter, but the
# `npm` version works with both for some reason.
# context: https://github.com/yarnpkg/yarn/issues/3569
npm ls --depth=0 --json

# this fetches the `package.json` of a dependency and
# returns the `engines` field, which is used to specify
# what `node` version it supports, among other things.
# it isn't a required field, so it's not always present.
npm view <package-name>@<version> engines --json
# or
yarn info <package-name>@<version> engines --json
```

The project is split into two directories -- `queries`, where the `npm`/`yarn` commands live along with supporting modules. And `cli`, where the functionality of the CLI lives.

## When Submitting a Pull Request:

- If your PR closes any open GitHub issues, please include `Closes #XXXX` in your comment.
- Please include a summary of the change and which issue is fixed or which feature is introduced.
- If changes to the behavior are made, clearly describe what are the changes and why.
- If changes to the UI are made, please include screenshots of the before and after.
