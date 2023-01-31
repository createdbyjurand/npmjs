import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`generate-id.node.mjs version 2.0.0`);

export const generateId = (
  idMinimumLength = 4,
  idMaximumLength = 8,
  characterSet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
) => {
  const idLength = Math.round(Math.random() * (idMaximumLength - idMinimumLength)) + idMinimumLength;
  let id = '';
  for (let i = 0; i < idLength; i++) id += characterSet[Math.floor(Math.random() * characterSet.length)];
  return id;
};

export const generateDroidNames = () => {
  for (let i = 0; i < 24; i++) {
    let line =
      generateId(3, 3, '0123456789abcdefghijklmnopqrstuvwxyz') +
      ' ' +
      generateId(4, 4, '0123456789abcdefghijklmnopqrstuvwxyz');
    for (let i = 0; i < 14; i++)
      line +=
        ' ' +
        generateId(3, 3, '0123456789abcdefghijklmnopqrstuvwxyz') +
        ' ' +
        generateId(4, 4, '0123456789abcdefghijklmnopqrstuvwxyz');
    console.log(line);
  }
};

// generateDroidNames();
