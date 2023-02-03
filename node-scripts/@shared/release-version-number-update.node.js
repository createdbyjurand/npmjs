console.log('--------- process.argv START ---------');
console.log(process.argv);
console.log('--------- process.argv END ---------');

const getArgumentValue = (argumentName, defaultValue) => {
  console.log(`[   OK   ] getArgumentValue(${argumentName})`);
  const regex = new RegExp('--' + argumentName + '=');
  console.log(`[   OK   ] getArgumentValue(${argumentName}) regex=${regex}`);
  const value = process.argv.find(arrayElement => regex.test(arrayElement)) || `--${argumentName}=${defaultValue}`;
  console.log(`[   OK   ] getArgumentValue(${argumentName}) value=${value}`);
  return value.slice(argumentName.length + 3);
};

const build = getArgumentValue('build', 0); // CI/CD build number
console.log(`[   OK   ] build=${build}`);
const branch = getArgumentValue('branch', 'none'); // master || develop || none
console.log(`[   OK   ] branch=${branch}`);
const release = getArgumentValue('release', 'minor'); // major || minor, any other value cancels release change
console.log(`[   OK   ] release=${release}`);

const fs = require('fs');

const access = {
  none: {
    'package.json': {
      version: false,
    },
    'package-lock.json': {
      version: false,
    },
    'release-version-number.json': {
      version: false,
      master: false,
      develop: false,
    },
  },
  master: {
    'package.json': {
      version: false,
    },
    'package-lock.json': {
      version: false,
    },
    'release-version-number.json': {
      version: false,
      master: true,
      develop: false,
    },
  },
  develop: {
    'package.json': {
      version: true,
    },
    'package-lock.json': {
      version: true,
    },
    'release-version-number.json': {
      version: true,
      master: false,
      develop: true,
    },
  },
};

const verifyAccess = (jsonFileName, jsonKey) => access[branch][jsonFileName][jsonKey];

const updateJsonFile = (jsonFileName, jsonKey, newValue) => {
  const pathToJsonFile = `./${jsonFileName}`;

  let jsonFile = fs.readFileSync(pathToJsonFile, 'utf-8');
  console.log(`[   OK   ] ${jsonFileName} readFileSync complete`);

  // console.log(`--------- ${jsonFileName} START ---------`);
  // console.log(jsonFile);
  // console.log(`--------- ${jsonFileName} END ---------`);

  const parsedJsonFile = JSON.parse(jsonFile);
  console.log(`[   OK   ] ${jsonFileName} parse complete`);

  console.log(`[   OK   ] ${jsonFileName} ${jsonKey} before update: ${parsedJsonFile[jsonKey]}`);
  parsedJsonFile[jsonKey] = newValue;
  console.log(`[   OK   ] ${jsonFileName} ${jsonKey} after update: ${parsedJsonFile[jsonKey]}`);

  /**
   * JSON.stringify(parsedReleaseVersionNumberJsonFile, null, 2);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 2 - represents the spaces to indent.
   */
  jsonFile = JSON.stringify(parsedJsonFile, null, 2);
  console.log(`[   OK   ] ${jsonFileName} stringify complete`);

  jsonFile += '\n';
  console.log(`[   OK   ] ${jsonFileName} added new line at the end`);

  // console.log(`--------- new ${jsonFileName} START ---------`);
  // console.log(jsonFile);
  // console.log(`--------- new ${jsonFileName} END ---------`);

  fs.writeFileSync(pathToJsonFile, jsonFile, 'utf-8');
  console.log(`[   OK   ] ${jsonFileName} writeFileSync complete`);
};

if (
  verifyAccess('package.json', 'version') ||
  verifyAccess('package-lock.json', 'version') ||
  verifyAccess('release-version-number.json', 'version')
) {
  const getValueFromJsonFile = (jsonFileName, jsonKey) => {
    console.log(`[   OK   ] getValueFromJsonFile(${jsonFileName}, ${jsonKey})`);
    const pathToJsonFile = `./${jsonFileName}`;
    console.log(`[   OK   ] getValueFromJsonFile(${jsonFileName}, ${jsonKey}) pathToJsonFile=${pathToJsonFile}`);
    const jsonFile = fs.readFileSync(pathToJsonFile, 'utf-8');
    console.log(`[   OK   ] getValueFromJsonFile(${jsonFileName}, ${jsonKey}) readFileSync complete`);
    const parsedJsonFile = JSON.parse(jsonFile);
    console.log(`[   OK   ] getValueFromJsonFile(${jsonFileName}, ${jsonKey}) parse complete`);
    return parsedJsonFile[jsonKey];
  };

  const oldVersion = getValueFromJsonFile('release-version-number.json', 'version');

  const newVersion = oldVersion
    .split('.')
    .map((value, index) => {
      switch (index) {
        case 0:
          return release === 'major' ? +value + 1 : value;
        case 1:
          return release === 'minor' ? +value + 1 : value;
        case 2:
          return build;
        default:
          return value;
      }
    })
    .join('.');

  if (verifyAccess('package.json', 'version')) updateJsonFile('package.json', 'version', newVersion);
  if (verifyAccess('package-lock.json', 'version')) updateJsonFile('package-lock.json', 'version', newVersion);
  if (verifyAccess('release-version-number.json', 'version'))
    updateJsonFile('release-version-number.json', 'version', newVersion);
}

const newDateToJSON = new Date().toJSON();

if (verifyAccess('release-version-number.json', 'master'))
  updateJsonFile('release-version-number.json', 'master', newDateToJSON);
if (verifyAccess('release-version-number.json', 'develop'))
  updateJsonFile('release-version-number.json', 'develop', newDateToJSON);

console.log(`[  DONE  ] update complete`);
