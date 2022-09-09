import fs from 'fs';
import {
  argumentExists,
  argumentWithValueExists,
  argumentWithValueExistsOrCrash,
  deleteFile,
  deleteFolder,
  display,
  displayArguments,
  displayError,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayLogoCBJ,
  getArgumentValue,
  parseDependenciesFromArgumentValue,
  removePrefixesFromDependenciesInPackageJson,
  run,
  updateAllDependenciesFromPackageJsonExcept
} from './@shared/index.node.mjs';

displayLogoCBJ();
displayHeaderCBJ();

displayInTheMiddle(`reinstall-dependencies.node.mjs version 0.4.0`);

displayArguments(process.argv);

const deleteNodeModules = argumentExists(process.argv, 'delete-node-modules');
const deletePackageLockJson = argumentExists(process.argv, 'delete-package-lock-json');
const legacyPeerDeps = argumentExists(process.argv, 'legacy-peer-deps') ? ' --legacy-peer-deps' : '';
const npmCI = argumentExists(process.argv, 'npm-ci') ? ' ci' : ' i';
const packageLockJsonIsRequired = argumentExists(process.argv, 'package-lock-json-is-required');
const removePrefixes = argumentExists(process.argv, 'remove-prefixes');
const switchPathTo = argumentWithValueExists(process.argv, 'switch-path-to');
const upgradeAllDependenciesToTheLatestVersion = argumentExists(
  process.argv,
  'upgrade-all-dependencies-to-the-latest-version'
);
const upgradeAllDependenciesToTheLatestVersionExcept = argumentWithValueExists(
  process.argv,
  'upgrade-all-dependencies-to-the-latest-version-except'
);
const upgradeTheseDependenciesToTheLatestVersion = argumentWithValueExists(
  process.argv,
  'upgrade-these-dependencies-to-the-latest-version'
);
const upgradeTheseDevDependenciesToTheLatestVersion = argumentWithValueExists(
  process.argv,
  'upgrade-these-dev-dependencies-to-the-latest-version'
);

if (switchPathTo) {
  run('dir /b');
  process.chdir(getArgumentValue(process.argv, 'switch-path-to'));
  run('dir /b');
}

if (!isPackageLockJsonCompatibleWithNodeVersion(node.version)) {
  displayError('package-lock.json is not compatible with this Node version', '[ FAILED ]');
  throwError('package-lock.json is not compatible with this Node version');
} else {
  run('node -v');
  run('npm -v');
  run('npm outdated');
  deleteFolder('node_modules');
  run('npm i --legacy-peer-deps');
  run('npm outdated');
}

if (!packageLockJsonIsRequired || (packageLockJsonIsRequired && fs.existsSync('package-lock.json'))) {
  run('node -v');
  run('npm -v');
  run('npm outdated');
  deletePackageLockJson && deleteFile('package-lock.json');
  deleteNodeModules && deleteFolder('node_modules');
  if (upgradeAllDependenciesToTheLatestVersion) {
    console.log('TODO: upgradeAllDependenciesToTheLatestVersion');
    run(`npm${npmCI}${legacyPeerDeps} ${parseDependenciesFromArgumentValue(getAll)}`);
  } else if (upgradeAllDependenciesToTheLatestVersionExcept) {
    console.log('TODO: upgradeAllDependenciesToTheLatestVersionExcept');
    // updateAllDependenciesFromPackageJsonExcept(parseDependenciesFromArgumentValue(process.argv, 'skip-dependencies'));
  } else {
    upgradeTheseDependenciesToTheLatestVersion &&
      run(
        `npm${npmCI}${legacyPeerDeps} ${parseDependenciesFromArgumentValue(
          process.argv,
          'upgrade-these-dependencies-to-the-latest-version'
        )}`
      );
    upgradeTheseDevDependenciesToTheLatestVersion &&
      run(
        `npm${npmCI}${legacyPeerDeps} --save-dev ${parseDependenciesFromArgumentValue(
          process.argv,
          'upgrade-these-dev-dependencies-to-the-latest-version'
        )}`
      );
  }
  run(`npm${npmCI}${legacyPeerDeps}`);
  removePrefixes && removePrefixesFromDependenciesInPackageJson();
  run('node -v');
  run('npm -v');
  run('npm outdated');
} else {
  displayError('package-lock.json: File not found', '[ FAILED ]');
}

display('Script ended', '[  DONE  ]');
