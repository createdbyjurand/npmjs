import {
  argumentExists,
  argumentWithValueExists,
  availableExtensions,
  display,
  displayInTheMiddle,
  getArgumentValue,
  getArgumentValueOrCrash,
  rebuildModules,
  run,
} from './@shared/index.node.mjs';

displayInTheMiddle(`rebuild-modules.node.mjs version 0.4.0`);

const path = getArgumentValueOrCrash(process.argv, 'path');

run('dir /b');
process.chdir(path);
run('dir /b');

const extension = availableExtensions.node.mjs;
const noRoot = false;
const options = {extension, noRoot};

argumentWithValueExists(process.argv, 'extension') && (options.extension = getArgumentValue(process.argv, 'extension'));
argumentExists(process.argv, 'no-root') && (options.noRoot = true);

console.log(options);

rebuildModules(options);

display('rebuild-modules.node.mjs script reached end', '[  DONE  ]');
