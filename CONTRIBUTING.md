# :construction: Notice :construction:

Pardon the mess. The `master` branch is in flux while I work on CLIngON v1. This
means things like npm scripts, which is encouraged using for contributions, may
not be working. Thank you for your patience.

# Contributing to CLIngON

Contributions are always welcome. To contribute,
[fork](https://help.github.com/articles/fork-a-repo/) CLIngON, commit your changes,
& [send a pull request](https://help.github.com/articles/using-pull-requests/).

## Feature Requests

Feature requests should be submitted in the
[issue tracker](https://github.com/rajinwonderland/clingon-cli/issues), with a description of
the expected behavior & use case, where they’ll remain closed until sufficient interest,
[e.g. :+1: reactions](https://help.github.com/articles/about-discussions-in-issues-and-pull-requests/),
has been [shown by the community](https://github.com/rajinwonderland/clingon-cli/issues?q=label%3A%22votes+needed%22+sort%3Areactions-%2B1-desc).

## Pull Requests

For additions or bug fixes you may need to modify `utils` and `commands`.

All commands are being generated via [`oclif`](https://oclif.io/docs) so I'd recommend you checking that out first!



## Coding Guidelines

> I literally copied tthis from [`lodash`](http://github.com/lodash/lodash) :laughing:

In addition to the following guidelines, please follow the conventions already
established in the code.

- **Spacing**:<br>
  Use two spaces for indentation. No tabs.

- **Naming**:<br>
  Keep variable & method names concise & descriptive.<br>
  Variable names `index`, `array`, & `iteratee` are preferable to
  `i`, `arr`, & `fn`.

- **Quotes**:<br>
  Single-quoted strings are preferred to double-quoted strings; however,
  please use a double-quoted string if the value contains a single-quote
  character to avoid unnecessary escaping.

- **Comments**:<br>
  Please use single-line comments to annotate significant additions, &
  [JSDoc-style](http://www.2ality.com/2011/08/jsdoc-intro.html) comments for
  functions.

Guidelines are enforced using [ESLint](https://www.npmjs.com/package/eslint):
```bash
$ npm run style
```

