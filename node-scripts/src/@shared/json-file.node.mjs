import fs from 'fs';
import {displayInTheMiddle} from './display.node.mjs';

export const readAndParseJsonFile = pathToJsonFile => JSON.parse(fs.readFileSync(pathToJsonFile, 'utf-8'));

export const stringifyAndSaveJsonFile = (parsedJsonFile, pathToJsonFile) =>
  /**
   * JSON.stringify(parsedReleaseVersionNumberJsonFile, null, 2);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 2 - represents the spaces to indent.
   */
  fs.writeFileSync(pathToJsonFile, JSON.stringify(parsedJsonFile, null, 2), 'utf-8');

displayInTheMiddle(`json-file.node.mjs version  0.4.0`);
