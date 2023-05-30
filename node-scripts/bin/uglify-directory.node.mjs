#!/usr/bin/env node

import {
  display,
  displayInTheMiddle,
  getArgumentValueOrCrash,
  run,
  runFunctionOnFilesWithSpecificExtensionsInDirectoryRecursively,
} from '../@shared/index.node.mjs';
import packageJson from '../package.json' assert {type: 'json'};

displayInTheMiddle(`uglify-directory.node.mjs version ${packageJson.version}`);

const path = getArgumentValueOrCrash(process.argv, 'path');
const uglifyjsOptions = process.argv.reduce((accumulator, currentValue) => {
  if (currentValue.startsWith('--') && !currentValue.startsWith('--path='))
    return accumulator === '' ? currentValue : `${accumulator} ${currentValue}`;
  return accumulator;
}, '');
const f = path => `uglifyjs ${path} ${uglifyjsOptions} --output ${path}`;

displayInTheMiddle('Directory change START');
run('dir /b');
process.chdir(path);
run('dir /b');
displayInTheMiddle('Directory change END');

console.log('path:', path);
console.log('uglifyjsOptions:', uglifyjsOptions);

runFunctionOnFilesWithSpecificExtensionsInDirectoryRecursively('./', f, ['.js']);
display('uglify-directory.node.mjs script reached end', '[  DONE  ]');
