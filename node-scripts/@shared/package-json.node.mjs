import fs from 'fs';
import {getArgumentValueOrCrash} from './arguments.node.mjs';
import {display, displayInTheMiddle} from './display.node.mjs';
import {throwError} from './error.node.mjs';
import {readAndParseJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`package-json.node.mjs version 2.0.2`);

/////////////////////////// VALIDATORS ///////////////////////////

export const packageJsonDependenciesExist = pathToPackageJsonFile =>
  Object.hasOwn(JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')), 'dependencies');

export const packageJsonDevDependenciesExist = pathToPackageJsonFile =>
  Object.hasOwn(JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')), 'devDependencies');

/////////////////////////// GETTERS ///////////////////////////

export const getPackageJsonVersion = pathToPackageJsonFile => readAndParseJsonFile(pathToPackageJsonFile).version;

export const getAllPackageJsonDependenciesNames = pathToPackageJsonFile =>
  Object.keys(JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).dependencies ?? {});

export const getAllPackageJsonDevDependenciesNames = pathToPackageJsonFile =>
  Object.keys(JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).devDependencies ?? {});

export const getAllPackageJsonDependenciesAndDevDependenciesNames = pathToPackageJsonFile =>
  Object.keys(
    Object.assign(
      {},
      JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).dependencies ?? {},
      JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).devDependencies ?? {},
    ),
  );

export const getAllPackageJsonDependenciesAndDevDependenciesAsLatestReadyToInstallList = pathToPackageJsonFile =>
  getAllPackageJsonDependenciesAndDevDependenciesNames(pathToPackageJsonFile)
    .map(dependencyName => `${dependencyName}@latest`)
    .join(' ');

export const getAllPackageJsonDependenciesAsLatestReadyToInstallList = pathToPackageJsonFile =>
  getAllPackageJsonDependenciesNames(pathToPackageJsonFile)
    .map(dependencyName => `${dependencyName}@latest`)
    .join(' ');

export const getAllPackageJsonDevDependenciesAsLatestReadyToInstallList = pathToPackageJsonFile =>
  getAllPackageJsonDevDependenciesNames(pathToPackageJsonFile)
    .map(dependencyName => `${dependencyName}@latest`)
    .join(' ');

export const getAllPackageJsonDependenciesAndDevDependenciesAsLatestReadyToInstallListExcept = (
  pathToPackageJsonFile,
  listOfDependenciesToOmit,
) =>
  getAllPackageJsonDependenciesAndDevDependenciesNames(pathToPackageJsonFile)
    .filter(dependencyName => !listOfDependenciesToOmit.some(elementToOmit => elementToOmit === dependencyName))
    .map(dependencyName => `${dependencyName}@latest`)
    .join(' ');

/**
 * @param {*} pathToPackageJsonFile string
 * @param {*} listOfDependenciesToOmit string[]
 * @returns string
 */
export const getAllPackageJsonDependenciesAsLatestReadyToInstallListExcept = (
  pathToPackageJsonFile,
  listOfDependenciesToOmit,
) =>
  getAllPackageJsonDependenciesNames(pathToPackageJsonFile)
    .filter(dependencyName => !listOfDependenciesToOmit.some(elementToOmit => elementToOmit === dependencyName))
    .map(dependencyName => `${dependencyName}@latest`)
    .join(' ');

/**
 * @param {*} pathToPackageJsonFile string
 * @param {*} listOfDependenciesToOmit string[]
 * @returns string
 */
export const getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept = (
  pathToPackageJsonFile,
  listOfDependenciesToOmit,
) =>
  getAllPackageJsonDevDependenciesNames(pathToPackageJsonFile)
    .filter(dependencyName => !listOfDependenciesToOmit.some(elementToOmit => elementToOmit === dependencyName))
    .map(dependencyName => `${dependencyName}@latest`)
    .join(' ');

/////////////////////////// PARSERS ///////////////////////////

export const parseDependenciesFromArgumentValueOrCrash = (processArgv, argumentName, version = 'latest') =>
  getArgumentValueOrCrash(processArgv, argumentName)
    .split(',')
    .map(dependencyName => `${dependencyName}@${version}`)
    .join(' ');

/**
 *   ┌ ─ ┬ ─ ┐
 *
 *   │   │   │
 *
 *   ├ ─ ┼ ─ ┤
 *
 *   │   │   │
 *
 *   └ ─ ┴ ─ ┘
 *
 * @param {*} dependencies string[]
 * @param {*} dependenciesToOverwrite string[]
 * @returns string
 */
export const overwriteDependencyVersions = (dependencies, dependenciesToOverwrite, title = 'dependencies') => {
  display('');
  display(`┌─── Overwriting ${title}`);
  display('│');

  const overwrittenDependencies = dependencies
    .map(dependency => {
      const dependencyName = dependency[0] === '@' ? `@${dependency.split('@')[1]}` : dependency.split('@')[0];
      for (let dependencyToOverwrite of dependenciesToOverwrite) {
        const dependencyNameToOverwrite =
          dependencyToOverwrite[0] === '@'
            ? `@${dependencyToOverwrite.split('@')[1]}`
            : dependencyToOverwrite.split('@')[0];
        if (dependencyName === dependencyNameToOverwrite) {
          display(`├ [ FIXED ] ${dependency} ->  ${dependencyToOverwrite}`);
          return dependencyToOverwrite;
        }
      }
      display(`├ [SKIPPED] ${dependencyName}`);
      return dependency;
    })
    .join(' ');

  display('│');
  display('└─── Finished');
  display('');
  return overwrittenDependencies;
};

/////////////////////////// INSTALLERS ///////////////////////////

export const installTheLatestVersionsOfDependencies = dependenciesNamesArray =>
  //--legacy-peer-deps restores peerDependency installation behavior from NPM v4 thru v6 for v7+
  dependenciesNamesArray === undefined || dependenciesNamesArray === []
    ? throwError('Array of dependencies is empty')
    : 'npm i --legacy-peer-deps --save' + dependenciesNamesArray.map(dependency => `${dependency}@latest`).join(' ');

export const installTheLatestVersionsOfDevDependencies = devDependenciesNamesArray =>
  //--legacy-peer-deps restores peerDependency installation behavior from NPM v4 thru v6 for v7+
  devDependenciesNamesArray === undefined || devDependenciesNamesArray === []
    ? throwError('Array of devDependencies is empty')
    : 'npm i --legacy-peer-deps --save-dev ' +
      devDependenciesNamesArray.map(dependency => `${dependency}@latest`).join(' ');

export const updateAllDependenciesToTheLatestWantedPatchVersion = (dependenciesNamesArrayToBeOmitted = []) => {
  display('<package.json>: Reading File Synchronously...', '[   OK   ]');
  const packageJsonFile = fs.readFileSync('./package.json', 'utf-8');
  display('<package.json>: Reading File Synchronously Success', '[   OK   ]');

  display('<package.json>: Parsing...', '[   OK   ]');
  const parsedPackageJsonFile = JSON.parse(packageJsonFile);
  display('<package.json>: Parsing Success', '[   OK   ]');

  let patchReleases = '';

  const dependenciesAIO = Object.assign({}, parsedPackageJsonFile.dependencies, parsedPackageJsonFile.devDependencies);

  Object.keys(dependenciesAIO).map(key => {
    if (dependenciesAIO[key][0] === '~') {
      patchReleases += ` ${key}@${dependenciesAIO[key]}`;
    }
  });

  // TODO: Not ready yet
  // return '';
  return 'npm i --legacy-peer-deps' + patchReleases;
  //--legacy-peer-deps restores peerDependency installation behavior from NPM v4 thru v6 for v7+
  //--save-exact
};

export const updateAllDependenciesWithSemVerMinorPrefix = (
  pathToPackageJsonFile,
  dependenciesNamesArrayToBeOmitted = [],
) => {
  const parsedPackageJsonFile = JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8'));
  const allDependencyNames = Object.keys(
    Object.assign({}, parsedPackageJsonFile.dependencies ?? {}, parsedPackageJsonFile.devDependencies ?? {}),
  );

  let listOfDependenciesWithSemVerMinorPrefix = '';

  const dependenciesAIO = Object.assign({}, parsedPackageJsonFile.dependencies, parsedPackageJsonFile.devDependencies);

  Object.keys(dependenciesAIO).map(key => {
    if (!dependenciesNamesArrayToBeOmitted.includes(key)) {
      if (dependenciesAIO[key][0] === '^') {
        listOfDependenciesWithSemVerMinorPrefix += ` ${key}@${dependenciesAIO[key].slice(
          0,
          dependenciesAIO[key].indexOf('.'),
        )}`;
      }
    }
  });

  return 'npm i --legacy-peer-deps' + listOfDependenciesWithSemVerMinorPrefix;
  //--legacy-peer-deps restores peerDependency installation behavior from NPM v4 thru v6 for v7+
};

/**
 *   ┌ ─ ┬ ─ ┐
 *
 *   │   │   │
 *
 *   ├ ─ ┼ ─ ┤
 *
 *   │   │   │
 *
 *   └ ─ ┴ ─ ┘
 *
 * @param {*} pathToPackageJsonFile
 * @param {*} except
 */
export const removePrefixesFromAllDependenciesInPackageJson = (pathToPackageJsonFile, except = []) => {
  display('');
  display('┌─── Removing prefixes');
  display('│');
  display('├ Reading package.json file...');
  let packageJsonFile = fs.readFileSync(pathToPackageJsonFile, 'utf-8');
  display('├ Reading finished', '[   OK   ]');
  display('│');
  display('├ Parsing package.json file...');
  const parsedPackageJsonFile = JSON.parse(packageJsonFile);
  display('├ Parsing finished', '[   OK   ]');

  if (parsedPackageJsonFile.dependencies) {
    display('│');
    display('├ Removing prefixes from dependencies...');
    Object.keys(parsedPackageJsonFile.dependencies).map(dependencyName => {
      if (
        parsedPackageJsonFile.dependencies[dependencyName][0] === '~' ||
        parsedPackageJsonFile.dependencies[dependencyName][0] === '^'
      ) {
        const prefix = parsedPackageJsonFile.dependencies[dependencyName][0];
        parsedPackageJsonFile.dependencies[dependencyName] =
          parsedPackageJsonFile.dependencies[dependencyName].slice(1);
        display(
          `├ [ FIXING ] ${dependencyName}: ${prefix}${parsedPackageJsonFile.dependencies[dependencyName]} -> ${parsedPackageJsonFile.dependencies[dependencyName]}`,
        );
      } else {
        display(`├ [ [   OK   ] ${dependencyName}: ${parsedPackageJsonFile.dependencies[dependencyName]}`);
      }
    });
    display('├ Removed prefixes from dependencies', '[   OK   ]');
  }

  if (parsedPackageJsonFile.devDependencies) {
    display('│');
    display('├ Removing prefixes from devDependencies...');
    Object.keys(parsedPackageJsonFile.devDependencies).map(dependencyName => {
      if (
        parsedPackageJsonFile.devDependencies[dependencyName][0] === '~' ||
        parsedPackageJsonFile.devDependencies[dependencyName][0] === '^'
      ) {
        const prefix = parsedPackageJsonFile.devDependencies[dependencyName][0];
        parsedPackageJsonFile.devDependencies[dependencyName] =
          parsedPackageJsonFile.devDependencies[dependencyName].slice(1);
        display(
          `├ [ FIXING ] ${dependencyName}: ${prefix}${parsedPackageJsonFile.devDependencies[dependencyName]} -> ${parsedPackageJsonFile.devDependencies[dependencyName]}`,
        );
      } else {
        display(`├ [   OK   ] ${dependencyName}: ${parsedPackageJsonFile.devDependencies[dependencyName]}`);
      }
    });
    display('├ Removed prefixes from devDependencies', '[   OK   ]');
  }

  /**
   * JSON.stringify(parsedReleaseVersionNumberJson, null, 4);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 4 - represents the spaces to indent.
   */
  display('│');
  display('├ Stringifying package.json data...');
  packageJsonFile = JSON.stringify(parsedPackageJsonFile, null, 4);
  display('├ Stringifying finished', '[   OK   ]');
  display('│');
  display('├ Adding empty line at the end of file...');
  packageJsonFile += '\n';
  display('├ Added', '[   OK   ]');
  display('│');
  display('├ Saving file...');
  fs.writeFileSync(pathToPackageJsonFile, packageJsonFile, 'utf-8');
  display('├ File saved', '[   OK   ]');
  display('│');
  display('└─── Finished');
  display('');
};
