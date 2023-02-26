# Under Construction

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
