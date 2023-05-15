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
  getArgumentValueOrCrash,
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

run('node -v');
run('npm -v');
run('npm outdated');

if (except) {
  if (all || deps) {
    run(
      `npm i${legacyPeerDeps} ${getAllPackageJsonDependenciesAsLatestReadyToInstallListExcept(
        'package.json',
        getArgumentValueOrCrash(process.argv, 'except'),
      )}`,
    );
  }
  if (all || devDeps) {
    run(
      `npm i${legacyPeerDeps} ${getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept(
        'package.json',
        getArgumentValueOrCrash(process.argv, 'except'),
      )}`,
    );
  }
} else {
  if (all || deps) {
    run(`npm i${legacyPeerDeps} ${getAllPackageJsonDependenciesAsLatestReadyToInstallList('package.json')}`);
  }
  if (all || devDeps) {
    run(`npm i${legacyPeerDeps} -D ${getAllPackageJsonDevDependenciesAsLatestReadyToInstallList('package.json')}`);
  }
}

removePrefixes && removePrefixesFromAllDependenciesInPackageJson('package.json');
run('npm outdated');

display('reinstall-dependencies.node.mjs script reached end', '[  DONE  ]');
