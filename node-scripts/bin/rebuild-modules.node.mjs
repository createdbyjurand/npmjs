#!/usr/bin/env node

import {
  argumentExists,
  argumentWithValueExists,
  getArgumentValue,
  getArgumentValueOrCrash,
} from '../@shared/arguments.node.mjs';
import {display, displayInTheMiddle} from '../@shared/display.node.mjs';
import {availableExtensions, rebuildModules} from '../@shared/modules.node.mjs';
import {run} from '../@shared/run.node.mjs';
import packageJson from '../package.json' assert {type: 'json'};

displayInTheMiddle(`rebuild-modules.node.mjs version ${packageJson.version}`);

const path = getArgumentValueOrCrash(process.argv, 'path');

run('dir /b');
process.chdir(path);
run('dir /b');

const extension = availableExtensions.ts;
const noRoot = false;

const options = {extension, noRoot};

argumentWithValueExists(process.argv, 'extension') && (options.extension = getArgumentValue(process.argv, 'extension'));
argumentExists(process.argv, 'no-root') && (options.noRoot = true);

console.log(options);

rebuildModules(options);

display('rebuild-modules.node.mjs script reached end', '[  DONE  ]');
