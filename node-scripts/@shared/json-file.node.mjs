import fs from 'fs';
import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`json-file.node.mjs version  1.0.0`);

export const readAndParseJsonFile = pathToJsonFile => JSON.parse(fs.readFileSync(pathToJsonFile, 'utf-8'));

export const stringifyAndSaveJsonFile = (parsedJsonFile, pathToJsonFile) =>
  /**
   * JSON.stringify(parsedReleaseVersionNumberJsonFile, null, 4);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 4 - represents the spaces to indent.
   */
  fs.writeFileSync(pathToJsonFile, JSON.stringify(parsedJsonFile, null, 4), 'utf-8');

export const parseJsonObjectIntoKeyArray = jsonObject => Object.keys(jsonObject);

export const parseJsonObjectIntoValueArray = jsonObject => Object.values(jsonObject);
