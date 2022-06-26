# Node: Update Dependencies

## Installation

`npm i -D @createdbyjurand/node-update-dependencies`

> - `i` is substitute of `install`
> - `-D` is substitute of `--save-dev`

## Documentation

### Reference

**Synopsis**

`node node_modules/@createdbyjurand/node-update-dependecies/update-dependencies.mjs [--delete-node-modules] [--delete-package-lock-json] [--legacy-peer-deps] [--remove-prefixes] [--npm-ci] [--update-all-dependencies-except=<dependency-name>,<dependency-name>,...]`

`node node_modules/@createdbyjurand/node-update-dependecies/update-dependencies.mjs [--delete-node-modules] [--delete-package-lock-json] [--legacy-peer-deps] [--remove-prefixes] [--npm-ci] [--update-dependencies=<dependency-name>,<dependency-name>,...] [--update-dev-dependencies=<dependency-name>,<dependency-name>,...]`

**Description**

You can setup reinstalling all dependecies acording to package.json with options to remove node_modules, updating only one dependency to the @latest and the rest install as is.

**Options**

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
