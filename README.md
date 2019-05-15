```
  /$$$$$$  /$$       /$$$$$$                      /$$$$$$  /$$   /$$
 /$$__  $$| $$      |_  $$_/                     /$$__  $$| $$$ | $$
| $$  \__/| $$        | $$   /$$$$$$$   /$$$$$$ | $$  \ $$| $$$$| $$
| $$      | $$        | $$  | $$__  $$ /$$__  $$| $$  | $$| $$ $$ $$
| $$      | $$        | $$  | $$  \ $$| $$  \ $$| $$  | $$| $$  $$$$
| $$    $$| $$        | $$  | $$  | $$| $$  | $$| $$  | $$| $$\  $$$
|  $$$$$$/| $$$$$$$$ /$$$$$$| $$  | $$|  $$$$$$$|  $$$$$$/| $$ \  $$
 \______/ |________/|______/|__/  |__/ \____  $$ \______/ |__/  \__/
                                       /$$  \ $$
                                      |  $$$$$$/
                                       \______/

```
=======

**CLIngON** allows you to scaffold frontmatter and/or other metadata into your [`mdx`](https://mdxjs.com) or `markdown` files.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/clingon.svg)](https://npmjs.org/package/clingon)
[![Downloads/week](https://img.shields.io/npm/dw/clingon.svg)](https://npmjs.org/package/clingon)
[![License](https://img.shields.io/npm/l/clingon.svg)](https://github.com/rajinwonderland/clingon/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g clingon
$ clingon COMMAND
running command...
$ clingon (-v|--version|version)
clingon/0.0.2 darwin-x64 node-v10.13.0
$ clingon --help [COMMAND]
USAGE
  $ clingon COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
- [Usage](#usage)
- [Commands](#commands)
  - [`clingon convert`](#clingon-convert)
  - [`clingon create`](#clingon-create)
  - [`clingon help [COMMAND]`](#clingon-help-command)
  - [`clingon list`](#clingon-list)

## `clingon convert`

Convert a medium url into plain old markdown 😎

```
USAGE
  $ clingon convert

OPTIONS
  -h, --help           show CLI help

  -o, --output=output  The desired destination for the parsed markdown (e.g. path/to/content/index.mdx) or copy to copy
                       the markdown
```

_See code: [src/commands/convert.ts](https://github.com/rajinwonderland/clingon/blob/v0.0.2/src/commands/convert.ts)_

## `clingon create`

[38;5;218mScaffold metadata or frontmatter for your mdx or md content[39m

```
USAGE
  $ clingon create

OPTIONS
  -h, --help           show CLI help
  -o, --output=output  The desired output file for the scaffolded metadata

EXAMPLES
  $ clingon create
  clingon create -p=/path/to/content
  clingon create -e=mdx
```

_See code: [src/commands/create.ts](https://github.com/rajinwonderland/clingon/blob/v0.0.2/src/commands/create.ts)_

## `clingon help [COMMAND]`

display help for clingon

```
USAGE
  $ clingon help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `clingon list`

[38;5;218mdescribe the command here[39m

```
USAGE
  $ clingon list

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/list.ts](https://github.com/rajinwonderland/clingon/blob/v0.0.2/src/commands/list.ts)_
<!-- commandsstop -->
