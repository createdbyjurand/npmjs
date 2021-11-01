import fs from 'fs';

export const openAndParseJsonFile = (jsonFileName, pathToJsonFile = '') =>
  JSON.parse(fs.readFileSync(`./${pathToJsonFile !== '' && pathToJsonFile + '/'}${jsonFileName}`, 'utf-8'));

export const stringifyAndSaveJsonFile = (parsedJsonFile, jsonFileName, pathToJsonFile = '') =>
  fs.writeFileSync(
    `./${pathToJsonFile !== '' && pathToJsonFile + '/'}${jsonFileName}`,
    JSON.stringify(parsedJsonFile, null, 2),
    'utf-8',
  );
