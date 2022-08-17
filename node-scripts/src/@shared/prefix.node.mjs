import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`prefix.node.mjs version 0.4.0`);

export const prefix = (string, space = '') => `[ ${string} ]${space}`;
