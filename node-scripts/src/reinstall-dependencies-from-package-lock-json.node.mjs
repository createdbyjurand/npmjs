import fs from 'fs';
import {deleteFolder, display, displayError, displayInTheMiddle, run} from './@shared/index.node.mjs';

displayInTheMiddle(
  `reinstall-dependencies-from-package-lock-json.node.mjs version ${
    readAndParseJsonFile('./@shared/release-version-number.json').version
  }`
);

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
