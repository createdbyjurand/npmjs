import {displayInTheMiddle} from '@createdbyjurand/node-display';

displayInTheMiddle('generate-id.node.mjs version 0.4.0');

export const generateId = (idMinimumLength = 4, idMaximumLength = 8) => {
  const idLength = Math.round(Math.random() * (idMaximumLength - idMinimumLength)) + idMinimumLength;
  const characterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let id = '';
  for (let i = 0; i < idLength; i++) id += characterSet[Math.floor(Math.random() * characterSet.length)];
  return id;
};
