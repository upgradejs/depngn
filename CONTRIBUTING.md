# Contributing

## Getting Started

```bash
git clone git@github.com:upgradejs/depngn.git
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

The standalone `depngn` package essentially does 4 things:

- determines a user's package manager by looking in the CWD for a lock file (`package-lock.json`/`yarn.lock`)
- reads a user's top-level dependencies from `package.json` (`dependencies`, `devDependencies`, `peerDependencies`)
- reads each dependency's `engines.node` field (if present) from either `package-lock.json` (`npm`) or traversing `node_modules` and reading each dependency's `package.json` (`yarn`)
- determines whether the Node version in question is supported by each dependency

If run with the CLI, you can receive your data in the following formats:
- table (printed to the console)
- json (written to the CWD)
- html (written to the CWD)

The project is split into two directories -- `depngn`, where the modules for reading and parsing dependency information live. And `cli`, where the functionality of the CLI lives.

## When Submitting a Pull Request:

- If your PR closes any open GitHub issues, please include `Closes #XXXX` in your comment.
- Please include a line in the CHANGELOG.md so that it's easier to release new versions.
- Please include a summary of the change and which issue is fixed or which feature is introduced.
- If changes to the behavior are made, clearly describe what are the changes and why.
- If changes to the UI are made, please include screenshots of the before and after.
