import {
  deleteFolder,
  display,
  displayArguments,
  displayError,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayLogoCBJ,
  getArgumentValueOrCrash,
  isPackageLockJsonCompatibleWithNodeVersion,
  node,
  run,
  throwError
} from './@shared/index.node.mjs';

displayLogoCBJ();
displayHeaderCBJ();

displayInTheMiddle(`reinstall-dependencies.node.mjs version 2.1.0`);

displayArguments(process.argv);

const pathToAppPackageJson = getArgumentValueOrCrash(process.argv, 'path-to-app-package-json');

process.chdir(pathToAppPackageJson);
run('dir /b');

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

display('Script ended', '[  DONE  ]');
