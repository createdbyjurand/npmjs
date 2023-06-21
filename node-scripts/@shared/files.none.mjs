import {existsSync} from 'node:fs';
import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`files.none.mjs version 1.0.2`);

/**
 * @param {string} path
 * @returns {boolean}
 */
export const fileExists = path => existsSync(path);
