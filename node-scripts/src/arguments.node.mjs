import {display, displayInTheMiddle} from './display.node.mjs';
import {throwError} from './error.node.mjs';

displayInTheMiddle(`arguments.node.mjs version 1.1.0`);

export const displayArguments = processArgv => {
  displayInTheMiddle('process.argv START');
  console.log(processArgv);
  displayInTheMiddle('process.argv END');
};

export const argumentExists = (processArgv, argumentName) =>
  processArgv.some(element => element.match(new RegExp(`^--${argumentName}$`)));

export const argumentWithValueExists = (processArgv, argumentName) =>
  processArgv.some(element => new RegExp(`--${argumentName}=\S*`).test(element));

export const argumentWithValueExistsOrCrash = (processArgv, argumentName) =>
  argumentWithValueExists(processArgv, argumentName) || throwError(`Argument --${argumentName}=[value] is required`);

export const argumentValueExists = (processArgv, argumentName) => processArgv.toString().includes(`--${argumentName}=`);

export const argumentValueIsNotEmpty = (processArgv, argumentName) =>
  getArgumentValue(processArgv, argumentName) !== '' ? true : false;

export const getArgumentValue = (processArgv, argumentName, defaultValue = '') => {
  display(`getArgumentValue(${argumentName})`, `[   OK   ]`);
  const regex = new RegExp(`--${argumentName}=`);
  display(`getArgumentValue(${argumentName}) regex=${regex}`, `[   OK   ]`);
  const value = processArgv.find(arrayElement => regex.test(arrayElement)) || `--${argumentName}=${defaultValue}`;
  display(`getArgumentValue(${argumentName}) value=${value}`, `[   OK   ]`);
  return value.slice(argumentName.length + 3);
};

export const getArgumentValueOrCrash = (processArgv, argumentName) =>
  argumentWithValueExistsOrCrash(processArgv, argumentName) &&
  processArgv.find(element => new RegExp(`--${argumentName}=\S*`).test(element)).slice(argumentName.length + 3);

export const parseDependenciesFromArgumentValue = (processArgv, argumentName, version = 'latest') =>
  getArgumentValue(processArgv, argumentName)
    .split(',')
    .map(dependency => `${dependency}@${version}`)
    .join(' ');

export const argumentExperimantal = {
  applications: (() => {
    const baseUrl = '/api/applications';

    return {
      baseUrl,
      search: name => `${baseUrl}?search=${name}`,
      details: id => `${baseUrl}/${id}`,
      contacts: number => `${baseUrl}/${id}/contacts`,
      pageWithSearch: (pageNumber, searchText) => `${baseUrl}?page=${pageNumber}&search=${searchText}`,
      page: pageNumber => `${baseUrl}?page=${pageNumber}`
    };
  })(),
  exists: (
    () => (processArgv, argumentName) =>
      processArgv.includes(`--${argumentName}`)
  )(),
  value: {
    exists: (
      () => (processArgv, argumentName) =>
        processArgv.includes(`--${argumentName}=`)
    )(),
    isNotEmpty: (processArgv, argumentName) => processArgv.includes(`--${argumentName}=`)
  },
  parse: {
    asDependencies: () => ''
  }
};
