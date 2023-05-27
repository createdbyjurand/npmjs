import {spawnSync} from 'child_process';
import {displayInTheMiddle, displayLong} from './display.node.mjs';

displayInTheMiddle(`run.node.mjs version 1.1.0`);

export const run = command => {
  displayLong(`$ ${command}`, '[   OK   ]', '  ');
  spawnSync(command, {stdio: 'inherit', shell: true});
};
