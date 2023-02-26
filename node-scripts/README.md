# @createdbyjurand/node-scripts

## Package description

> This package is a bunch of scripts I made for myself. I use them all the time to speed up my work. My friends use them, you can too :)
>
> The list of what is here and what can you do is down below.

&nbsp;

## Rebuild Modules

> The idea came up when we have created a modules for the project. By the way, I love modules. They give you nice imports and control that there are no duplicate names.
>
> The problem was everyone had to add new components to index file, which they didn't. So once in a while we were finding files in modules with normal exports.
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
    "rebuild modules": "rebuild-modules@createdbyjurand --path=src/@modules --no-root --extension=ts",
    }
}
```

&nbsp;

**Parameters**:

Parameter | Required | Default value | Available options
---|---|---|---
`--path=[PATH_TO_MODULES_DIRECTORY]` | yes
`--no-root` | no |
`--extension=[INDEX_FILE_EXTENSION]` | no | `ts` | `js` <br> `ts` <br> `jsx` <br> `tsx` <br> `cjs` <br> `mjs` <br> `node.cjs` <br> `node.js` <br> `node.mjs`

*`--path=`*

Path to module(s) directory from where the script was run.

*`--no-root`*

This can be set or not. If your root folder has no files, just subdirectories with modules, than you should add this to execution. It will not create empty index file in the root directory.

*`--extension=`*

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

- has stable release of **Rebuild Modules** script that is ready to use.

**`0.4.0`**

- preparing for usage on the side of main node_modules folder

**`0.3.0`**

- bugfixes

**`0.2.0`**

- test resease

&nbsp;

## Update Dependencies

> &nbsp;
>
> !!! THIS SCRIPT IS IN BETA TESTING STATE NOT READY FOR USE !!!
>
> &nbsp;

&nbsp;

**Description**:

You can setup reinstalling all dependecies acording to package.json with options to remove node_modules, updating only one dependency to the @latest and the rest install as is.

&nbsp;

**Installation**:

`npm i -D @createdbyjurand/node-update-dependencies`

> - `i` is substitute of `install`
> - `-D` is substitute of `--save-dev`

&nbsp;

**Usage**:

`node node_modules/@createdbyjurand/node-update-dependecies/update-dependencies.mjs [--delete-node-modules] [--delete-package-lock-json] [--legacy-peer-deps] [--remove-prefixes] [--npm-ci] [--update-all-dependencies-except=<dependency-name>,<dependency-name>,...]`

`node node_modules/@createdbyjurand/node-update-dependecies/update-dependencies.mjs [--delete-node-modules] [--delete-package-lock-json] [--legacy-peer-deps] [--remove-prefixes] [--npm-ci] [--update-dependencies=<dependency-name>,<dependency-name>,...] [--update-dev-dependencies=<dependency-name>,<dependency-name>,...]`

**Parameters**:

`--delete-node-modules`<br>
&nbsp; &nbsp; Delete node_modules folder before installation.

`--delete-package-lock-json`<br>
&nbsp; &nbsp; Delete package-lock.json before installation.

`--legacy-peer-deps`<br>
&nbsp; &nbsp; Use --legacy-peer-deps argument for npm install.

> --legacy-peer-deps restores peerDependency installation behavior from NPM v4 thru v6 for v7+

`--remove-prefixes`<br>
&nbsp; &nbsp; Remove prefixes from package.json dependencies and devDependencies.

> `"jest": "^27.3.1"` -> `"jest": "27.3.1"`

`--npm-ci`<br>
&nbsp; &nbsp; Use npm ci instead of npm i during installation

`--update-all-dependencies-except=<dependency-name>,<dependency-name>,...`<br>
&nbsp; &nbsp; Update all dependencies and devDependencies from package.json to the @latest version except provided ones.

`--update-dependencies=<dependency-name>,<dependency-name>,...`<br>
&nbsp; &nbsp; Update only provided dependencies and install normaly the rest.

> --update-dependencies and --update-dev-dependencies are executed together before installing the rest of all dependencies and are intended to be used together.

`--update-dev-dependencies=<dependency-name>,<dependency-name>,...`<br>
&nbsp; &nbsp; Update only provided devDependencies and install normaly the rest.

> --update-dependencies and --update-dev-dependencies are executed together before installing the rest of all dependencies and are intended to be used together.

&nbsp;

## Scripts

### arguments.node.mjs

- `displayArguments(processArgv)` prints process.argv
- `argumentExists(processArgv, argumentName)`

### delete.node.mjs

### display.node.mjs

### generate.node.mjs

#### `generateId(idMinimumLength = 4, idMaximumLength = 8)`

- Generates random string from `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ` character set.
- **Default length** is **random** between **4** and **8**.
- **@param** `idMinimumLength`**: number** - minimum length of randomly generated id
- **@param** `idMaximumLength`**: number** - maximum length of randomly generated id

### json.node.mjs

`openAndParseJsonFile(jsonFileName, pathToJsonFile)`

`stringifyAndSaveJsonFile = (parsedJsonFile, jsonFileName, pathToJsonFile = '')`

`JSON.stringify(parsedReleaseVersionNumberJsonFile, null, 2);`

- `@param null` - represents the replacer function. (in this case we don't want to alter the process)
- `@param 2` - represents the spaces to indent.
