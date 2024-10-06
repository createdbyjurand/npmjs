#!/usr/bin/env node

import {
  argumentExists,
  argumentWithValueExists,
  display,
  displayArguments,
  displayError,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayJSON,
  displayLogoCBJ,
  displayValue,
  fileExists,
  getArgumentValueOrCrash,
  getDate,
  increaseMajorVersion,
  increaseMinorVersion,
  increasePatchVersion,
  readAndParseJsonFile,
  run,
  stringifyAndSaveJsonFile,
} from '../@shared/index.node.mjs';
import packageJson from '../package.json' with {type: 'json'};

displayInTheMiddle(`update-release-version.node.mjs version ${packageJson.version}`);

displayLogoCBJ();
displayHeaderCBJ();

display('');
displayArguments(process.argv);

const major = argumentExists(process.argv, 'major');
const minor = argumentExists(process.argv, 'minor');
const patch = argumentExists(process.argv, 'patch');

const init = argumentExists(process.argv, 'init');
const path = argumentWithValueExists(process.argv, 'path');
const set = argumentWithValueExists(process.argv, 'set');

const pr = argumentExists(process.argv, 'pr');
const np = argumentExists(process.argv, 'np');
const prod = argumentExists(process.argv, 'prod');

let pathToPackageJsonFile = './package.json';
let pathToPackageLockJsonFile = './package-lock.json';
let pathToReleaseVersionJsonFile = './release-version.json';

let newPackageJsonVersion = '';

if (argumentWithValueExists(process.argv, 'path-to-package-json')) {
  pathToPackageJsonFile = getArgumentValueOrCrash('path-to-package-json');
  pathToPackageLockJsonFile = pathToPackageJsonFile.replace('package.json', 'package-lock.json');
}

if (argumentWithValueExists(process.argv, 'path-to-release-version-json')) {
  pathToReleaseVersionJsonFile = getArgumentValueOrCrash('path-to-release-version-json');
}

display('');
if (path) {
  displayInTheMiddle('Directory change START');
  run('ls -1');
  process.chdir(path);
  run('ls -1');
  displayInTheMiddle('Directory change END');
} else {
  displayInTheMiddle('Current directory START');
  run('ls -1');
  displayInTheMiddle('Current directory END');
}

/////////////////////////// INIT ///////////////////////////

if (init) {
  const newReleaseVersionJsonFile = {
    pr: '',
    np: '',
    prod: '',
    version: '1.0.0',
  };

  if (pr) newReleaseVersionJsonFile.pr = getDate();
  if (np) newReleaseVersionJsonFile.np = getDate();
  if (prod) newReleaseVersionJsonFile.prod = getDate();
  if (set) newReleaseVersionJsonFile.version = getArgumentValueOrCrash(process.argv, 'set');

  stringifyAndSaveJsonFile(newReleaseVersionJsonFile, './release-version.json');
  display('');
  displayJSON(newReleaseVersionJsonFile, 'newReleaseVersionJsonFile');
} else {
  /////////////////////////// PACKAGE.JSON ///////////////////////////

  if (fileExists(pathToPackageJsonFile)) {
    const parsedPackageJsonFile = readAndParseJsonFile(pathToPackageJsonFile);

    if (patch) parsedPackageJsonFile.version = increasePatchVersion(parsedPackageJsonFile.version);
    if (minor) parsedPackageJsonFile.version = increaseMinorVersion(parsedPackageJsonFile.version);
    if (major) parsedPackageJsonFile.version = increaseMajorVersion(parsedPackageJsonFile.version);
    if (set) parsedPackageJsonFile.version = getArgumentValueOrCrash(process.argv, 'set');
    newPackageJsonVersion = parsedPackageJsonFile.version;

    stringifyAndSaveJsonFile(parsedPackageJsonFile, pathToPackageJsonFile);
    display('');
    displayValue('parsedPackageJsonFile.version:', parsedPackageJsonFile.version);

    /////////////////////////// PACKAGE-LOCK.JSON ///////////////////////////

    if (fileExists(pathToPackageLockJsonFile)) {
      const parsedPackageLockJsonFile = readAndParseJsonFile(pathToPackageLockJsonFile);

      parsedPackageLockJsonFile.version = newPackageJsonVersion;

      stringifyAndSaveJsonFile(parsedPackageLockJsonFile, pathToPackageLockJsonFile);
      display('');
      displayValue('parsedPackageLockJsonFile.version:', parsedPackageLockJsonFile.version);
    } else {
      display('');
      displayError(`${pathToPackageLockJsonFile} file does not exist`, '[ FAILED ]');
    }
  } else {
    display('');
    displayError(`${pathToPackageJsonFile} file does not exist`, '[ FAILED ]');
  }

  /////////////////////////// RELEASE-VERSION.JSON ///////////////////////////

  if (fileExists(pathToReleaseVersionJsonFile)) {
    const parsedReleaseVersionJsonFile = readAndParseJsonFile(pathToReleaseVersionJsonFile);

    if (pr) parsedReleaseVersionJsonFile.pr = getDate();
    if (np) parsedReleaseVersionJsonFile.np = getDate();
    if (prod) parsedReleaseVersionJsonFile.prod = getDate();

    if (newPackageJsonVersion !== '') {
      parsedReleaseVersionJsonFile.version = newPackageJsonVersion;
    } else {
      if (patch) parsedReleaseVersionJsonFile.version = increasePatchVersion(parsedReleaseVersionJsonFile.version);
      if (minor) parsedReleaseVersionJsonFile.version = increaseMinorVersion(parsedReleaseVersionJsonFile.version);
      if (major) parsedReleaseVersionJsonFile.version = increaseMajorVersion(parsedReleaseVersionJsonFile.version);
      if (set) parsedReleaseVersionJsonFile.version = getArgumentValueOrCrash(process.argv, 'set');
    }

    stringifyAndSaveJsonFile(parsedReleaseVersionJsonFile, pathToReleaseVersionJsonFile);
    display('');
    displayJSON(parsedReleaseVersionJsonFile, 'parsedReleaseVersionJsonFile');
  } else {
    display('');
    displayError(`${pathToReleaseVersionJsonFile} file does not exist`, '[ FAILED ]');
    displayError(`Use --init argument to create release-version.json.`);
  }
}

display('');
display('update-release-version.node.mjs script reached end', '[  DONE  ]');
