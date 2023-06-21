import fs from 'fs';
import {getArgumentValueOrCrash} from './arguments.node.mjs';
import {display, displayInTheMiddle} from './display.node.mjs';
import {throwError} from './error.node.mjs';
import {fileExists} from './files.none.mjs';
import {readAndParseJsonFile, stringifyAndSaveJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`package-json.node.mjs version 3.0.0`);

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

/////////////////////////// PREPARE DEPENDENCIES TO INSTALL ///////////////////////////

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

/////////////////////////// REMOVERS ///////////////////////////

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
};

/////////////////////////// VERSION UPDATERS ///////////////////////////

export const increasePackageJsonMajorVersion = pathToPackageJsonFile => {
  if (!fileExists(pathToPackageJsonFile)) throwError(`${pathToPackageJsonFile} file does not exist`);
  const parsedPackageJsonFile = readAndParseJsonFile(pathToPackageJsonFile);
  const version = parsedPackageJsonFile.version.split('.');
  const prefixEnd = version[0].search(/\d/);
  if (prefixEnd > 0) {
    const prefix = version[0].slice(0, prefixEnd);
    const majorVersionNumber = +version[0].slice(prefixEnd) + 1;
    version[0] = `${prefix}${majorVersionNumber}`;
  } else {
    version[0] = +version[0] + 1;
  }
  version[1] = 0;
  const postfixStart = version[2].search(/\D/);
  if (postfixStart > 0) version[2] = `0${version[2].slice(postfixStart)}`;
  else version[2] = 0;

  parsedPackageJsonFile.version = version.join('.');
  stringifyAndSaveJsonFile(parsedPackageJsonFile, pathToPackageJsonFile);
};

export const increasePackageJsonMinorVersion = pathToPackageJsonFile => {
  if (!fileExists(pathToPackageJsonFile)) throwError(`${pathToPackageJsonFile} file does not exist`);
  const parsedPackageJsonFile = readAndParseJsonFile(pathToPackageJsonFile);
  const version = parsedPackageJsonFile.version.split('.');
  version[1] = +version[1] + 1;
  const postfixStart = version[2].search(/\D/);
  if (postfixStart > 0) {
    version[2] = `0${version[2].slice(postfixStart)}`;
  } else {
    version[2] = 0;
  }
  parsedPackageJsonFile.version = version.join('.');
  stringifyAndSaveJsonFile(parsedPackageJsonFile, pathToPackageJsonFile);
};

export const increasePackageJsonPatchVersion = pathToPackageJsonFile => {
  if (!fileExists(pathToPackageJsonFile)) throwError(`${pathToPackageJsonFile} file does not exist`);
  const parsedPackageJsonFile = readAndParseJsonFile(pathToPackageJsonFile);
  const version = parsedPackageJsonFile.version.split('.');
  const postfixStart = version[2].search(/\D/);
  if (postfixStart > 0) {
    const patchVersionNumber = +version[2].slice(0, postfixStart) + 1;
    const postfix = version[2].slice(postfixStart);
    version[2] = `${patchVersionNumber}${postfix}`;
  } else {
    version[2] = +version[2] + 1;
  }
  parsedPackageJsonFile.version = version.join('.');
  stringifyAndSaveJsonFile(parsedPackageJsonFile, pathToPackageJsonFile);
};
