import {spawnSync} from 'child_process';
import {display, displayInTheMiddle} from './@shared/index.node.mjs';

displayInTheMiddle('run-localy.node.mjs version 0.4.0');

export const run = command => {
  display(command, '[   OK   ]');
  spawnSync(command, {stdio: 'inherit', shell: true});
};
