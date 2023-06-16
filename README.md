# dependency-import-counter [![npm version](https://badge.fury.io/js/dependency-import-counter.png)](https://badge.fury.io/js/dependency-import-counter)

> Helps you understand your project's dependency usage by counting the number of imports.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

To install dependency-import-counter globally, use the following command:

```bash
$ npm install -g dependency-import-counter
```

## Usage

You can specify the directory to be analyzed. If no directory is specified, the default directory is ./src.

```bash
$ dependency-import-counter ./src

@mdx-js/react: 0
sanitize-filename: 2
@react-hook/merged-ref: 3
semver: 7
react-i18next: 616
```

You can also specify multiple directories:

```bash
$ dependency-import-counter ./src1 ./src2 ./src3
```

The results will be merged and displayed in the console.

## Contribute

PRs accepted.

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

MIT © 2023 ichiwa
