import {spawnSync} from 'child_process';
import {display, displayInTheMiddle} from './@shared/index.node.mjs';

displayInTheMiddle(
  `run-localy.node.mjs version ${readAndParseJsonFile('./@shared/release-version-number.json').version}`
);

export const run = command => {
  display(command, '[   OK   ]');
  spawnSync(command, {stdio: 'inherit', shell: true});
};
