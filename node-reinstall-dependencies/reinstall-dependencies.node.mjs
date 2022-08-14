import {deleteFolder} from '@createdbyjurand/node-delete';
import {display, displayError, displayInTheMiddle} from '@createdbyjurand/node-display';
import {throwError} from '@createdbyjurand/node-error';
import {node} from '@createdbyjurand/node-node';
import {isPackageLockJsonCompatibleWithNodeVersion} from '@createdbyjurand/node-package-lock-json';
import {run} from '@createdbyjurand/node-run';

displayInTheMiddle('reinstall-dependencies.node.mjs version 0.4.0');

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
