import {spawnSync} from 'child_process';
import {display, displayInTheMiddle} from './display.node.mjs';
import {readAndParseJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`run.node.mjs version ${readAndParseJsonFile('./release-version-number.json').version}`);

export const run = command => {
  display(command, '[   OK   ]');
  spawnSync(command, {stdio: 'inherit', shell: true});
};
