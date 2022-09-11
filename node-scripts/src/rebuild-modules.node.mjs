import {display, displayInTheMiddle, getArgumentValueOrCrash, rebuildModules, run} from './@shared/index.node.mjs';

displayInTheMiddle(`rebuild-modules.node.mjs version 0.4.0`);

const usePath = getArgumentValueOrCrash(process.argv, 'use-path');

run('dir /b');
process.chdir(usePath);
run('dir /b');

rebuildModules();

display('Script ended', '[  DONE  ]');
