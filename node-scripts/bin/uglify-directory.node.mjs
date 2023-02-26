#!/usr/bin/env node

import {displayArguments, getArgumentValueOrCrash} from '../@shared/arguments.node.mjs';
import {display, displayInTheMiddle} from '../@shared/display.node.mjs';
import {run} from '../@shared/run.node.mjs';

import packageJson from '../package.json' assert {type: 'json'};

displayInTheMiddle(`uglify-directory.node.mjs version ${packageJson.version}`);

const path = getArgumentValueOrCrash(process.argv, 'path');
const uglifyjsOptions = process.argv.reduce((accumulator, currentValue) => {
  if (currentValue.startsWith('--') && !currentValue.startsWith('--path=') && !currentValue.startsWith('--extensions='))
    return accumulator === '' ? currentValue : `${accumulator} ${currentValue}`;
  return accumulator;
}, '');
const f = path => `uglifyjs ${path} ${uglifyjsOptions} --output ${path}`;
const extensionsArray = getArgumentValueOrCrash(process.argv, 'extensions');
const logMessage = 'Uglified';

displayArguments(process.argv);

displayInTheMiddle('Directory change START');
run('dir /b');
process.chdir(path);
run('dir /b');
displayInTheMiddle('Directory change END');

console.log('path', path);
console.log('uglifyjsOptions', uglifyjsOptions);
console.log('f', f);
console.log('extensionsArray', extensionsArray);
console.log('logMessage', logMessage);

runFunctionOnFilesWithSpecificExtensionsInDirectoryRecursively(path, f, extensionsArray, logMessage);
display('rebuild-modules.node.mjs script reached end', '[  DONE  ]');
