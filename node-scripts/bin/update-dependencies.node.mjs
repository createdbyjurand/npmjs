#!/usr/bin/env node

import {
  argumentExists,
  argumentWithValueExists,
  display,
  displayArguments,
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

displayArguments(process.argv);

const removePrefixes = argumentExists(process.argv, 'remove-prefixes');
const legacyPeerDeps = argumentExists(process.argv, 'legacy-peer-deps') ? ' --legacy-peer-deps' : '';

const all = argumentExists(process.argv, 'all');
const deps = argumentExists(process.argv, 'deps');
const devDeps = argumentExists(process.argv, 'dev-deps');
const except = argumentWithValueExists(process.argv, 'except');
const overwrite = argumentWithValueExists(process.argv, 'overwrite');
const path = argumentWithValueExists(process.argv, 'path');

if (path) {
  displayInTheMiddle('Directory change START');
  run('ls -1');
  process.chdir(path);
  run('ls -1');
  displayInTheMiddle('Directory change END');
} else {
  displayInTheMiddle('Current directory');
  run('ls -1');
}

run('node -v');
run('npm -v');
run('npm outdated');

let dependenciesToInstall = '';
let devDependenciesToInstall = '';

const packageJsonHasDependencies = packageJsonDependenciesExist('package.json');
const packageJsonHasDevDependencies = packageJsonDevDependenciesExist('package.json');

if (except) {
  if (packageJsonHasDependencies && (all || deps)) {
    dependenciesToInstall = getAllPackageJsonDependenciesAsLatestReadyToInstallListExcept(
      'package.json',
      getArgumentValuesOrCrash(process.argv, 'except'),
    );
  }
  if (packageJsonHasDevDependencies && (all || devDeps)) {
    devDependenciesToInstall = getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept(
      'package.json',
      getArgumentValuesOrCrash(process.argv, 'except'),
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
  if (packageJsonHasDependencies && (all || deps)) {
    dependenciesToInstall = overwriteDependencyVersions(
      dependenciesToInstall.split(' '),
      dependenciesToOverwrite,
      'dependencies',
    );
  }
  if (packageJsonHasDevDependencies && (all || devDeps)) {
    devDependenciesToInstall = overwriteDependencyVersions(
      devDependenciesToInstall.split(' '),
      dependenciesToOverwrite,
      'devDependencies',
    );
  }
}

if (dependenciesToInstall !== '') run(`npm i${legacyPeerDeps} ${dependenciesToInstall}`);
if (devDependenciesToInstall !== '') run(`npm i${legacyPeerDeps} -D ${devDependenciesToInstall}`);

removePrefixes && removePrefixesFromAllDependenciesInPackageJson('package.json');
run('npm outdated');

display('reinstall-dependencies.node.mjs script reached end', '[  DONE  ]');
