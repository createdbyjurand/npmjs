import { displayInTheMiddle } from './display.node.mjs';
import { readAndParseJsonFile } from './json-file.node.mjs';

displayInTheMiddle(`error.node.mjs version ${readAndParseJsonFile('./release-version-number.json').version}`);

export const throwError = mssg => {
  throw new Error(mssg);
};
