import fs from 'fs';
import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`json-file.node.mjs version  0.4.0`);

export const readAndParseJsonFile = pathToJsonFile => JSON.parse(fs.readFileSync(pathToJsonFile, 'utf-8'));

export const stringifyAndSaveJsonFile = (parsedJsonFile, pathToJsonFile) =>
  /**
   * JSON.stringify(parsedReleaseVersionNumberJsonFile, null, 2);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 2 - represents the spaces to indent.
   */
  fs.writeFileSync(pathToJsonFile, JSON.stringify(parsedJsonFile, null, 2), 'utf-8');

export const parseJsonObjectIntoKeyArray = jsonObject => Object.keys(jsonObject);

export const parseJsonObjectIntoValueArray = jsonObject => Object.values(jsonObject);