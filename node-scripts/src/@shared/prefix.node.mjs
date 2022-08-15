import {displayInTheMiddle} from '@createdbyjurand/node-display';

displayInTheMiddle('prefix.node.mjs version 0.4.0');

export const prefix = (string, space = '') => `[ ${string} ]${space}`;
