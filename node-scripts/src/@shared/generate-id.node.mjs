import {displayInTheMiddle} from './display.node.mjs';
import {readAndParseJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`generate-id.node.mjs version ${readAndParseJsonFile('./release-version-number.json').version}`);

export const generateId = (idMinimumLength = 4, idMaximumLength = 8) => {
  const idLength = Math.round(Math.random() * (idMaximumLength - idMinimumLength)) + idMinimumLength;
  const characterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < idLength; i++) id += characterSet[Math.floor(Math.random() * characterSet.length)];
  return id;
};
