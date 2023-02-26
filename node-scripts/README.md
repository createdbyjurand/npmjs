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

Path to module(s) directory from where the script was run.

_`--no-root`_

This can be set or not. If your root folder has no files, just subdirectories with modules, than you should add this to execution. It will not create empty index file in the root directory.

_`--extension=`_

This sets the extension of index files in modules. Only those files will be deleted and recreated.

&nbsp;

**Supported file extensions**:

Those are file extensions that this script will include in index module file. Other files will bo omitted.

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
    "uglify": "uglify-directory@createdbyjurand --path=dist --extensions=.js,.mjs,.cjs --compress --mangle --toplevel --v8"
  }
}
```

&nbsp;

**Parameters**:

| Parameter                                        | Required |
| ------------------------------------------------ | -------- |
| `--path=[PATH_TO_DIRECTORY_TO_BE_UGLIFIED]`      | yes      |
| `--extensions=[EXTENSIONS_SEPARATED_BY_COMMA]`   | yes      |
| `--[OTHER_ARGUMENTS_WILL_BE_PASSED_TO_UGLIFYJS]` | no       |

_`--path=`_

Path to module(s) directory from where the script was run.

_`--extensions=`_

Argument should be comma separated with no spaces: `.js,.mjs,.cjs,.node.js`.

Script will `.split(',')` this string and use `uglifyjs` command for each file that will match `.endsWith(extension)`.

Simple as that.

_`--[OTHER_ARGUMENTS]`_

Any other argument that starts with `--` except `--path=` and `--extensions=` will be passed to uglifyjs command.

_Examples: `--compress --mangle --toplevel --v8`_

Script does not support:

- arguments with one `-` (like `-p` or `-w`). Only two `--` arguments work
- arguments that have spaces, space is the end of an argument

&nbsp;

**Changelog**:

**`0.8.3-SNAPSHOT`**

- stable release of **Uglify Directory** script

**`0.8.2-SNAPSHOT`**

- bugfixes

**`0.8.1-SNAPSHOT`**

- bugfixes

**`0.8.0-SNAPSHOT`**

- test resease
