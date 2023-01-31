import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`prefix.node.mjs version 1.0.0`);

export const prefix = (string, space = '') => `[ ${string} ]${space}`;
