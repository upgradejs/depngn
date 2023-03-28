# main (unreleased)

# 0.5.0
- [[feature]: export types and migrate from `rollup` to `tsup` for the build purposes](https://github.com/upgradejs/depngn/pull/41)
- [[feature]: add tests](https://github.com/upgradejs/depngn/pull/40)

# 0.4.0
- [[feature]: refactor configuration files to export the types and declaration](https://github.com/upgradejs/depngn/pull/41)
- [[feature]: refactor `depngn` internals to read files directly, instead of using `npm`/`yarn` commands](https://github.com/upgradejs/depngn/pull/39)
- [[bugfix]: filter out `__ngcc_entry_points__.json` file](https://github.com/upgradejs/depngn/pull/38)
- [[bugfix]: remove whitespace from certain malformed version ranges](https://github.com/upgradejs/depngn/pull/37)
- [[bugfix]: support Node versions 10-14](https://github.com/upgradejs/depngn/pull/35)

# 0.3.0
- [[feature]: add the ability to perform the check in the specified path using `--cwd` option](https://github.com/upgradejs/depngn/pull/30)

# 0.2.0
- [[feature]: add links to the GitHub repo to be able to navigate from the npm package page](https://github.com/upgradejs/depngn/pull/27)
- [[bugfix]: keep README.md, CONTRIBUTING.md and CHANGELOG.md current and up to date](https://github.com/upgradejs/depngn/pull/27)
- [[feature]: add support for packages that specify * versions](https://github.com/upgradejs/depngn/pull/19)
- [[feature]: add support for html reporter](https://github.com/upgradejs/depngn/pull/21)
- [[feature]: start using GitHub Actions for CI](https://github.com/upgradejs/depngn/pull/23)
- [[feature]: allow us to use node 14](https://github.com/upgradejs/depngn/pull/24)

# 0.1.4
- [[feature]: use `process.versions.node`](https://github.com/upgradejs/depngn/pull/9)

# 0.1.3
- [[chore]: add jest config](https://github.com/upgradejs/depngn/pull/6)
- [[feature]: refactor logs, refactor package manager logic, fix RegEx bug](https://github.com/upgradejs/depngn/pull/7)

# 0.1.2
- [[bugfix]: update shape of data returned from yarn](https://github.com/ombulabs/depngn/pull/5)

# 0.1.1
- [[bugfix]: specify depth in npm ls to avoid errors from uninstalled peerDeps](https://github.com/ombulabs/depngn/pull/1)
- [[feature]: refactor and disable logging for standalone package](https://github.com/ombulabs/depngn/pull/2)
- [[feature]: revert logging change](https://github.com/ombulabs/depngn/pull/3)

# 0.1.0
- initial commit
