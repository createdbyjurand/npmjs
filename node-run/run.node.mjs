import {spawnSync} from 'child_process';
import {display, displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle('run.node.mjs version 1.0.2');

export const run = command => {
  display(command, '[   OK   ]');
  spawnSync(command, {stdio: 'inherit', shell: true});
};
