import {displayInTheMiddle} from './display.node.mjs';
import {spawnSync} from 'child_process';
displayInTheMiddle(`pause.node.mjs version 1.0.0`);

// Press any key to continue.
export const pressAnyKeyToContinue = () =>
  new Promise(resolve => {
    process.stdin.setRawMode(true);
    process.stdin.once('data', key => {
      process.stdin.setRawMode(false);
      return resolve(key.toString('utf8'));
    });
  });

export const pressAnyKeyToContinue_linux = () => spawnSync('read _ ', {shell: true, stdio: [0, 1, 2]}); // linux, osx
export const pressAnyKeyToContinue_windows = () => spawnSync('pause ', {shell: true, stdio: [0, 1, 2]}); // windows
