import fs from 'fs';
import {deleteFolder} from './delete.node.mjs';
import {display, displayError, displayInTheMiddle} from './display.node.mjs';
import {run} from './run.node.mjs';

displayInTheMiddle('reinstall-dependencies-from-package-lock-json.node.mjs version 1.0.0');
if (fs.existsSync('package-lock.json')) {
  run('node -v');
  run('npm -v');
  run('npm outdated');
  deleteFolder('node_modules');
  run('npm ci');
  run('node -v');
  run('npm -v');
  run('npm outdated');
} else {
  displayError('package-lock.json: File not found', '[ FAILED ]');
}
display('Script ended', '[  DONE  ]');
