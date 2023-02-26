#!/usr/bin/env node

import fs from 'fs';
import {
  argumentExists,
  argumentWithValueExists,
  deleteFile,
  deleteFolder,
  display,
  displayArguments,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayLogoCBJ,
  getAllPackageJsonDependenciesAndDevDependenciesAsReadyToInstallList,
  getAllPackageJsonDependenciesAndDevDependenciesAsReadyToInstallListExcept,
  getArgumentValue,
  getArgumentValueOrCrash,
  isPackageLockJsonCompatibleWithNodeVersion,
  node,
  parseDependenciesFromArgumentValueOrCrash,
  removePrefixesFromAllDependenciesInPackageJson,
  run,
  throwError,
} from '../@shared/index.node.mjs';
import packageJson from '../package.json' assert {type: 'json'};

displayInTheMiddle(`reinstall-dependencies.node.mjs version ${packageJson.version}`);

displayLogoCBJ();
displayHeaderCBJ();

displayArguments(process.argv);

const deleteNodeModules = argumentExists(process.argv, 'delete-node-modules');
const deletePackageLockJson = argumentExists(process.argv, 'delete-package-lock-json');
const legacyPeerDeps = argumentExists(process.argv, 'legacy-peer-deps') ? ' --legacy-peer-deps' : '';
const npmCI = argumentExists(process.argv, 'npm-ci');
const packageLockJsonIsRequired = argumentExists(process.argv, 'package-lock-json-is-required');
const removePrefixes = argumentExists(process.argv, 'remove-prefixes');
const switchPathTo = argumentWithValueExists(process.argv, 'switch-path-to');
const upgradeAllDependenciesAndDevDependenciesToTheLatestVersion = argumentExists(
  process.argv,
  'upgrade-all-dependencies-and-dev-dependencies-to-the-latest-version',
);
const upgradeAllDependenciesAndDevDependenciesToTheLatestVersionExcept = argumentWithValueExists(
  process.argv,
  'upgrade-all-dependencies-and-dev-dependencies-to-the-latest-version-except',
);
const upgradeTheseDependenciesToTheLatestVersion = argumentWithValueExists(
  process.argv,
  'upgrade-these-dependencies-to-the-latest-version',
);
const upgradeTheseDevDependenciesToTheLatestVersion = argumentWithValueExists(
  process.argv,
  'upgrade-these-dev-dependencies-to-the-latest-version',
);

if (switchPathTo) {
  run('dir /b');
  process.chdir(getArgumentValue(process.argv, 'switch-path-to'));
  run('dir /b');
}

if (packageLockJsonIsRequired) {
  !fs.existsSync('package-lock.json') && throwError('package-lock.json: File not found');
  !isPackageLockJsonCompatibleWithNodeVersion(node.version) &&
    throwError('package-lock.json is not compatible with this Node version');
}

run('node -v');
run('npm -v');
run('npm outdated');

deletePackageLockJson && deleteFile('package-lock.json');
deleteNodeModules && deleteFolder('node_modules');

if (npmCI) {
  run(`npm ci`);
} else if (upgradeAllDependenciesAndDevDependenciesToTheLatestVersion) {
  run(`npm i${legacyPeerDeps} ${getAllPackageJsonDependenciesAndDevDependenciesAsReadyToInstallList('package.json')}`);
} else if (upgradeAllDependenciesAndDevDependenciesToTheLatestVersionExcept) {
  run(
    `npm i${legacyPeerDeps} ${getAllPackageJsonDependenciesAndDevDependenciesAsReadyToInstallListExcept(
      'package.json',
      getArgumentValueOrCrash(
        process.argv,
        'upgrade-all-dependencies-and-dev-dependencies-to-the-latest-version-except',
      ),
    )}`,
  );
} else {
  upgradeTheseDependenciesToTheLatestVersion &&
    run(
      `npm i${legacyPeerDeps} ${parseDependenciesFromArgumentValueOrCrash(
        process.argv,
        'upgrade-these-dependencies-to-the-latest-version',
      )}`,
    );
  upgradeTheseDevDependenciesToTheLatestVersion &&
    run(
      `npm i${legacyPeerDeps} --save-dev ${parseDependenciesFromArgumentValueOrCrash(
        process.argv,
        'upgrade-these-dev-dependencies-to-the-latest-version',
      )}`,
    );
  run(`npm i${legacyPeerDeps}`);
}

removePrefixes && removePrefixesFromAllDependenciesInPackageJson('package.json');
run('npm outdated');

display('reinstall-dependencies.node.mjs script reached end', '[  DONE  ]');
