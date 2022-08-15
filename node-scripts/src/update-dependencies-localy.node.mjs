import {
  argumentExists,
  deleteFile,
  deleteFolder,
  display,
  displayArguments,
  displayInTheMiddle,
  getArgumentValue,
  parseDependenciesFromArgumentValue,
  removePrefix,
  removePrefixesFromDependenciesInPackageJson,
  run,
  updateAllDependenciesFromPackageJsonExcept
} from './@shared/index.node.mjs';

displayInTheMiddle('update-dependencies-localy.node.mjs version 0.4.0');

displayArguments(process.argv);

const deleteNodeModules = argumentExists(process.argv, 'delete-node-modules');
const deletePackageLockJson = argumentExists(process.argv, 'delete-package-lock-json');
const legacyPeerDeps = argumentExists(process.argv, 'legacy-peer-deps') ? '--legacy-peer-deps' : '';
const npmCI = argumentExists(process.argv, 'npm-ci') ? 'ci' : 'i';
const removePrefixes = argumentExists(process.argv, 'remove-prefixes');
const updateAllDependenciesExcept = argumentExists(process.argv, 'update-all-dependencies-except');
const updateDependencies = argumentExists(process.argv, 'update-dependencies');
const updateDevDependencies = argumentExists(process.argv, 'update-dev-dependencies');

run('node -v');
run('npm -v');
run('npm outdated');

deletePackageLockJson && deleteFile('package-lock.json');
deleteNodeModules && deleteFolder('node_modules');

if (updateAllDependenciesExcept) {
  updateAllDependenciesFromPackageJsonExcept(parseDependenciesFromArgumentValue(process.argv, 'skip-dependencies'));
} else {
  updateDependencies &&
    run(`npm i ${legacyPeerDeps} ${parseDependenciesFromArgumentValue(process.argv, 'update-dependencies')}`);
  updateDevDependencies &&
    run(
      `npm i ${legacyPeerDeps} --save-dev ${parseDependenciesFromArgumentValue(
        process.argv,
        'update-dev-dependencies'
      )}`
    );
  run(`npm ${npmCI} ${legacyPeerDeps}`);
}

removePrefixes && removePrefixesFromDependenciesInPackageJson();

run('node -v');
run('npm -v');
run('npm outdated');

display('Script ended', '[  DONE  ]');
