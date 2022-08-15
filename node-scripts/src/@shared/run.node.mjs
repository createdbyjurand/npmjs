import {display, displayInTheMiddle} from '@createdbyjurand/node-display';
import {spawnSync} from 'child_process';

displayInTheMiddle('run.node.mjs version 0.4.0');

export const run = command => {
  display(command, '[   OK   ]');
  spawnSync(command, {stdio: 'inherit', shell: true});
};
