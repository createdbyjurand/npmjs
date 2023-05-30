#!/usr/bin/env node

import {
  argumentExists,
  argumentWithValueExists,
  display,
  displayArguments,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayList,
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

displayInTheMiddle(`update-release-version-number.node.mjs version ${packageJson.version}`);

display('');
display('update-release-version-number.node.mjs script reached end', '[  DONE  ]');
