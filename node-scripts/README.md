# @createdbyjurand/node-scripts

## Table of contents

- [Description](#description)
- [Installation](#installation)
- [Scripts](#scripts)
  - [Rebuild modules](#rebuild-modules)
  - [Uglify directory](#uglify-directory)
  - [Update dependencies](#update-dependencies)
  - [Update release version number](#update-release-version-number)

&nbsp;

## Description

Node scripts with beautiful colorful logging :)

&nbsp;

## Installation

```bash
npm i -D @createdbyjurand/node-scripts
```

> - `i` is alias of `install`
> - `-D` is alias of `--save-dev`

&nbsp;

## Scripts

&nbsp;

---

## Rebuild modules

[Back to table of contents](#table-of-contents)

&nbsp;

**Description**:

Script goes through specified directory and all its subdirectories recursively deleting index files and creating new ones for each directory with exports of all files in the directory.

&nbsp;

**Configuration**:

Add to `package.json`:

```json
{
  "scripts": {
    "rebuild modules": "rebuild-modules@createdbyjurand --path=src/@module --no-root --extension=ts"
  }
}
```

&nbsp;

**Parameters**:

| Parameter                            | Required | Default value | Available options                                                                                         |
| ------------------------------------ | -------- | ------------- | --------------------------------------------------------------------------------------------------------- |
| `--path=[PATH_TO_MODULES_DIRECTORY]` | yes      |
| `--no-root`                          | no       |
| `--extension=[INDEX_FILE_EXTENSION]` | no       | `ts`          | `js` <br> `ts` <br> `jsx` <br> `tsx` <br> `cjs` <br> `mjs` <br> `node.cjs` <br> `node.js` <br> `node.mjs` |

_`--path=`_

Path to module(s) directory.

_`--no-root`_

This can be set or not. It forces not to create index file in the root directory where path is pointing.

_`--extension=`_

This sets the extension of **index** files in modules. Only **index** files with specified extension will be removed and recreated.

&nbsp;

**Supported file extensions**:

Those are file extensions that this script will include in index module file. Other files will be omitted.

- js
- ts
- jsx
- tsx
- cjs
- mjs
- json
- jsonc
- json5
- svg

&nbsp;

**Examples**:

&nbsp;

_Commands to build modules_:

```bash
rebuild-modules@createdbyjurand --path=src/@io
```

&nbsp;

_Imports_:

```javascript
import { sth1, sth2, sth3 } from @io/auth
import { sth4, sth5 } from @io/components
import { sth6, sth7, sth8, sth9 } from @io/interfaces
```

&nbsp;

_Folder structure_:

```javascript
└ src
  └ @io
    ├ auth
    │ ├ sth1.ts // or .js or .mjs or .cjs or .json or .svg
    │ ├ sth2.ts
    │ └ sth3.ts
    ├ components
    │ ├ sth4.ts
    │ └ sth5.ts
    ├ interfaces
    │ ├ sth6.ts
    │ ├ sth7.ts
    │ ├ sth8.ts
    │ └ sth9.ts
    ├ resources
    │ ├ sth10.svg
    │ └ sth11.json
    ├ routes
    │ ├ sth12.ts
    │ └ sth13.ts
    └ some-other-folder
      └ sth14.ts
```

&nbsp;

_Folder structure after script run_:

```javascript
└ src
  └ @io
    ├ auth
    │ ├ index.ts
    │ ├ sth1.ts
    │ ├ sth2.ts
    │ └ sth3.ts
    ├ components
    │ ├ index.ts
    │ ├ sth4.ts
    │ └ sth5.ts
    ├ interfaces
    │ ├ index.ts
    │ ├ sth6.ts
    │ ├ sth7.ts
    │ ├ sth8.ts
    │ └ sth9.ts
    ├ resources
    │ ├ index.ts
    │ ├ sth10.svg
    │ └ sth11.json
    ├ routes
    │ ├ index.ts
    │ ├ sth12.ts
    │ └ sth13.ts
    └ some-other-folder
    │ ├ index.ts
      └ sth14.ts
```

&nbsp;

_Index files contents_:

```javascript
export * from './sth1';
export * from './sth2';
export * from './sth3';
```

```javascript
import Sth10 from './sth10.svg';
import Sth11 from './sth11.json';

export const Sth10Svg = Sth10;
export const Sth11Json = Sth11;
```

&nbsp;

**Changelog**:

**`0.8.11-SNAPSHOT`**

- added: remove empty index files
- added: do not create empty index files
- info: `--no-root` still forces not to create index file for root directory even if there are files

**`0.7.3-SNAPSHOT`**

- stable release of **rebuild modules** script

**`0.7.2-SNAPSHOT`**

- bugfixes

**`0.7.1-SNAPSHOT`**

- bugfixes

**`0.7.0-SNAPSHOT`**

- added `*.svg` and `*.json` support.

**`0.5.3-SNAPSHOT`**

- bugfixes

**`0.5.0-SNAPSHOT`**

- test resease

&nbsp;

---

## Uglify directory

[Back to table of contents](#table-of-contents)

&nbsp;

**Description**:

This script runs [UglifyJS](https://github.com/mishoo/UglifyJS) command for every file in the directory recursively overwriting it with uglified version.

> !!! &nbsp; :warning: &nbsp; BE CAREFUL, THIS SCRIPT OVERWRITES FILES &nbsp; :warning: &nbsp; !!!

> Use it on `dist` or `build` directories. For this it was build for.

&nbsp;

**Installation**:

`npm i -D @createdbyjurand/node-scripts uglify-js`

> - `i` is substitute of `install`
> - `-D` is substitute of `--save-dev`

&nbsp;

**Usage**:

Add script to `package.json`:

```json
{
  "scripts": {
    "uglify": "uglify-directory@createdbyjurand --path=dist --compress --mangle --toplevel --v8"
  }
}
```

&nbsp;

**Parameters**:

| Parameter                                        | Required |
| ------------------------------------------------ | -------- |
| `--path=[PATH_TO_DIRECTORY_TO_BE_UGLIFIED]`      | yes      |
| `--[OTHER_ARGUMENTS_WILL_BE_PASSED_TO_UGLIFYJS]` | no       |

_`--path=`_

Path to directory to be uglified.

_`--[OTHER_ARGUMENTS]`_

Any other argument that starts with `--` except `--path=` will be passed to uglifyjs command.

_Examples: `--compress --mangle --toplevel --v8`_

Script does not support:

- arguments with one `-` (like `-p` or `-w`). Only two `--` arguments work
- arguments that have spaces, space is the end of an argument

&nbsp;

**Changelog**:

**`0.8.6-SNAPSHOT`**

- removed some console logs
- added yellow color to console logs for directory

**`0.8.5-SNAPSHOT`**

- removed extensions support

**`0.8.3-SNAPSHOT`**

- stable release of **uglify directory** script

**`0.8.2-SNAPSHOT`**

- bugfixes

**`0.8.1-SNAPSHOT`**

- bugfixes

**`0.8.0-SNAPSHOT`**

- test resease

&nbsp;

---

## Update dependencies

[Back to table of contents](#table-of-contents)

&nbsp;

**Changelog**:

**`0.11.0-SNAPSHOT`**

- stable release of **update dependencies** script

&nbsp;

---

## Update release version number

[Back to table of contents](#table-of-contents)

&nbsp;

**Changelog**:

**`0.12.0-SNAPSHOT`**

- beta release of **update release version number** script
