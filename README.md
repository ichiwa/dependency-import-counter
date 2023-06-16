# dependency-import-counter [![npm version](https://badge.fury.io/js/dependency-import-counter.png)](https://badge.fury.io/js/dependency-import-counter)

> Helps you understand your project's dependency usage by counting the number of imports.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```bash
$ npm install -g dependency-import-counter
```

## Usage

Please pass the directory to be examined.
The default directory is `.src`.

```bash
$ dependency-import-counter ./src

@mdx-js/react: 0
sanitize-filename: 2
@react-hook/merged-ref: 3
semver: 7
react-i18next: 616
```

Multiple directories can be passed.

```bash
$ dependency-import-counter ./src1 ./src2 ./src3
```

The results will be merged into the output.

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2023 ichiwa
