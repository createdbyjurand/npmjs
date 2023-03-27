# @createdbyjurand/node-scripts

## Package description

> This is a toolkit with some useful scripts for automation.
>
> The list of what is here and what can you do is down below.

&nbsp;

## Rebuild Modules

**Problem that this script solves**:

> I love modules. They give you nice imports and control that there are no duplicate names.
>
> The problem is when you move, rename, add or delete files in module, because each time you have to additionally edit `index.js` / `index.ts` file.
>
> That is why I have created this script.

&nbsp;

**Description**:

This script rebuilds index files in modules directory recursively. It goes through specified directory and it subdirectories, deletes index files and creates new ones with exports for all files in directory.

&nbsp;

**Installation**:

`npm i -D @createdbyjurand/node-scripts`

> - `i` is substitute of `install`
> - `-D` is substitute of `--save-dev`

&nbsp;

**Usage**:

Add script to `package.json`:

```json
{
  "scripts": {
    "rebuild modules": "rebuild-modules@createdbyjurand --path=src/@modules --no-root --extension=ts"
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

**Changelog**:

**`0.8.11-SNAPSHOT`**

- added: remove empty index files
- added: do not create empty index files
- info: `--no-root` still forces not to create index file for root directory even if there are files

**`0.7.3-SNAPSHOT`**

- stable release of **Rebuild Modules** script

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

## Uglify Directory

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

- stable release of **Uglify Directory** script

**`0.8.2-SNAPSHOT`**

- bugfixes

**`0.8.1-SNAPSHOT`**

- bugfixes

**`0.8.0-SNAPSHOT`**

- test resease
