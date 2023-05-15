import fs from 'fs';
import {getArgumentValueOrCrash} from './arguments.node.mjs';
import {display, displayInTheMiddle} from './display.node.mjs';
import {throwError} from './error.node.mjs';
import {readAndParseJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`package-json.node.mjs version 1.3.0`);

/////////////////////////// GETTERS ///////////////////////////

export const getPackageJsonVersion = pathToPackageJsonFile => readAndParseJsonFile(pathToPackageJsonFile).version;

export const getAllPackageJsonDependenciesNames = pathToPackageJsonFile =>
  Object.keys(JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).dependencies);

export const getAllPackageJsonDevDependenciesNames = pathToPackageJsonFile =>
  Object.keys(JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).devDependencies);

export const getAllPackageJsonDependenciesAndDevDependenciesNames = pathToPackageJsonFile =>
  Object.keys(
    Object.assign(
      {},
      JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).dependencies,
      JSON.parse(fs.readFileSync(pathToPackageJsonFile, 'utf-8')).devDependencies,
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

export const getAllPackageJsonDependenciesAsLatestReadyToInstallListExcept = (
  pathToPackageJsonFile,
  listOfDependenciesToOmit,
) =>
  getAllPackageJsonDependenciesNames(pathToPackageJsonFile)
    .filter(dependencyName => !listOfDependenciesToOmit.some(elementToOmit => elementToOmit === dependencyName))
    .map(dependencyName => `${dependencyName}@latest`)
    .join(' ');

/**
 *
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

export const updateAllDependenciesWithSemVerMinorPrefix = (dependenciesNamesArrayToBeOmitted = []) => {
  const packageJsonFile = fs.readFileSync('./package.json', 'utf-8');
  display('package.json: Reading File Synchronously', '[   OK   ]');

  const parsedPackageJsonFile = JSON.parse(packageJsonFile);
  display('package.json: Parsing', '[   OK   ]');

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

export const removePrefixesFromAllDependenciesInPackageJson = (dependenciesNamesArrayToBeOmitted = []) => {
  let packageJsonFile = fs.readFileSync('./package.json', 'utf-8');
  display('package.json: Reading File Synchronously', '[   OK   ]');

  let parsedPackageJsonFile = JSON.parse(packageJsonFile);
  display('package.json: Parsing', '[   OK   ]');

  let listOfDependenciesToUpdate = '';

  Object.keys(Object.assign({}, parsedPackageJsonFile.dependencies, parsedPackageJsonFile.devDependencies)).map(
    (key, index, dependenciesAIO) => {
      if (dependenciesAIO[key][0] === '~' || dependenciesAIO[key][0] === '^') {
        let prefix = dependencies[key][0];
        dependenciesAIO[key] = dependenciesAIO[key].slice(1);
        console.log(`[ FIXING ] ${prefix}${dependenciesAIO[key]} -> ${dependenciesAIO[key]}`);
      } else {
        console.log(`[   OK   ] ${dependenciesAIO[key]}`);
      }
    },
  );

  /**
   * JSON.stringify(parsedReleaseVersionNumberJson, null, 2);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 2 - represents the spaces to indent.
   */
  packageJsonFile = JSON.stringify(parsedPackageJsonFile, null, 2);
  display('package.json: Stringifying', '[   OK   ]');

  packageJsonFile += '\n';
  display('package.json: Adding empty line at EOF', '[   OK   ]');

  fs.writeFileSync('./package.json', packageJsonFile, 'utf-8');
  display('package.json: Writing File Synchronously', '[   OK   ]');

  return 'npm i --legacy-peer-deps ' + listOfDependencies;
  //--legacy-peer-deps restores peerDependency installation behavior from NPM v4 thru v6 for v7+
};
