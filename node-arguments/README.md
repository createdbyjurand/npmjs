# Node scripts

## Installation

`npm i -D @createdbyjurand/node-scripts`

> - `i` is substitute of `install`
> - `-D` is substitute of `--save-dev`

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

### package-json.node.mjs

### run.node.mjs
