import {displayInTheMiddle} from '@createdbyjurand/node-display';
import {readAndParseJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`prefix.node.mjs version ${readAndParseJsonFile('./release-version-number.json').version}`);

export const prefix = (string, space = '') => `[ ${string} ]${space}`;
