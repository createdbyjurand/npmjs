#!/usr/bin/env node

import {
  argumentExists,
  argumentWithValueExists,
  display,
  displayArguments,
  displayArray,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayLogoCBJ,
  getAllPackageJsonDependenciesAsLatestReadyToInstallList,
  getAllPackageJsonDependenciesAsLatestReadyToInstallListExcept,
  getAllPackageJsonDevDependenciesAsLatestReadyToInstallList,
  getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept,
  getArgumentValuesOrCrash,
  overwriteDependencyVersions,
  packageJsonDependenciesExist,
  packageJsonDevDependenciesExist,
  removePrefixesFromAllDependenciesInPackageJson,
  run,
} from '../@shared/index.node.mjs';
import packageJson from '../package.json' assert {type: 'json'};

displayInTheMiddle(`update-dependencies.node.mjs version ${packageJson.version}`);

displayLogoCBJ();
displayHeaderCBJ();

display('');
displayArguments(process.argv);

const removePrefixes = argumentExists(process.argv, 'remove-prefixes');
const legacyPeerDeps = argumentExists(process.argv, 'legacy-peer-deps') ? ' --legacy-peer-deps' : '';

const all = argumentExists(process.argv, 'all');
const deps = argumentExists(process.argv, 'deps');
const devDeps = argumentExists(process.argv, 'dev-deps');
const except = argumentWithValueExists(process.argv, 'except');
const overwrite = argumentWithValueExists(process.argv, 'overwrite');
const path = argumentWithValueExists(process.argv, 'path');

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

display('');
run('node -v');

display('');
run('npm -v');

display('');
displayInTheMiddle('Outdated dependencies START');
run('npm outdated');
displayInTheMiddle('Outdated dependencies END');

let dependenciesToInstall = '';
let devDependenciesToInstall = '';

const packageJsonHasDependencies = packageJsonDependenciesExist('package.json');
const packageJsonHasDevDependencies = packageJsonDevDependenciesExist('package.json');

if (except) {
  const arrayOfDependencyNames = getArgumentValuesOrCrash(process.argv, 'except');

  display('');
  displayArray(arrayOfDependencyNames, 'Dependencies that will be ignored');

  if (packageJsonHasDependencies && (all || deps)) {
    dependenciesToInstall = getAllPackageJsonDependenciesAsLatestReadyToInstallListExcept(
      'package.json',
      arrayOfDependencyNames,
    );
  }
  if (packageJsonHasDevDependencies && (all || devDeps)) {
    devDependenciesToInstall = getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept(
      'package.json',
      arrayOfDependencyNames,
    );
  }
} else {
  if (packageJsonHasDependencies && (all || deps)) {
    dependenciesToInstall = getAllPackageJsonDependenciesAsLatestReadyToInstallList('package.json');
  }
  if (packageJsonHasDevDependencies && (all || devDeps)) {
    devDependenciesToInstall = getAllPackageJsonDevDependenciesAsLatestReadyToInstallList('package.json');
  }
}

if (overwrite) {
  const dependenciesToOverwrite = getArgumentValuesOrCrash(process.argv, 'overwrite');

  display('');
  displayArray(dependenciesToOverwrite, 'Dependencies that will be overwritten');

  if (packageJsonHasDependencies && (all || deps)) {
    display('');
    dependenciesToInstall = overwriteDependencyVersions(
      dependenciesToInstall.split(' '),
      dependenciesToOverwrite,
      'dependencies',
    );
  }
  if (packageJsonHasDevDependencies && (all || devDeps)) {
    display('');
    devDependenciesToInstall = overwriteDependencyVersions(
      devDependenciesToInstall.split(' '),
      dependenciesToOverwrite,
      'devDependencies',
    );
  }
}

if (dependenciesToInstall !== '') {
  display('');
  displayInTheMiddle('Updating dependencies START');
  run(`npm i${legacyPeerDeps} -S ${dependenciesToInstall}`);
  displayInTheMiddle('Updating dependencies END');
}
if (devDependenciesToInstall !== '') {
  display('');
  displayInTheMiddle('Updating devDependencies START');
  run(`npm i${legacyPeerDeps} -D ${devDependenciesToInstall}`);
  displayInTheMiddle('Updating devDependencies END');
}

display('');
if (removePrefixes) {
  removePrefixesFromAllDependenciesInPackageJson('package.json');

  display('');
  displayInTheMiddle('Reinstalling dependencies without prefixes START');
  run(`npm i${legacyPeerDeps}`);
  displayInTheMiddle('Reinstalling dependencies without prefixes END');
}

display('');
displayInTheMiddle('Outdated dependencies START');
run('npm outdated');
displayInTheMiddle('Outdated dependencies END');

display('');
display('update-dependencies.node.mjs script reached end', '[  DONE  ]');
