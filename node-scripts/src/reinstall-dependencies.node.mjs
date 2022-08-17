import {
  deleteFolder,
  display,
  displayError,
  displayInTheMiddle,
  isPackageLockJsonCompatibleWithNodeVersion,
  node,
  run,
  throwError
} from './@shared/index.node.mjs';

displayInTheMiddle(`reinstall-dependencies.node.mjs version 2.0.1`);

process.chdir('../../');
// run('dir /b');

run('node -v');
run('npm -v');
run('npm outdated');

deleteFolder('node_modules');

if (!isPackageLockJsonCompatibleWithNodeVersion(node.version)) {
  displayError('package-lock.json is not compatible with Node version', '[ FAILED ]');
  throwError('package-lock.json is not compatible with Node version');
}

run('npm i --legacy-peer-deps');
run('npm outdated');

display('Script ended', '[  DONE  ]');
