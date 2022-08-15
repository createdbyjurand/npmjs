import {displayInTheMiddle} from '@createdbyjurand/node-display';

displayInTheMiddle('node.node.mjs version 0.4.0');

export const node = {
  version: (() => +process.version.match(/^v(\d+)/)[1])()
};
