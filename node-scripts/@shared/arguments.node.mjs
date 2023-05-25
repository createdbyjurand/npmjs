import {display, displayInTheMiddle} from './display.node.mjs';
import {throwError} from './error.node.mjs';

displayInTheMiddle(`arguments.node.mjs version 1.2.0`);

export const displayArguments = processArgv => {
  displayInTheMiddle('process.argv START');
  console.log(processArgv);
  displayInTheMiddle('process.argv END');
};

/////////////////////////// VERIFIERS ///////////////////////////

export const argumentExists = (processArgv, argumentName) =>
  processArgv.some(element => element.match(new RegExp(`^--${argumentName}$`)));

export const argumentExistsOrCrash = (processArgv, argumentName) =>
  argumentExists(processArgv, argumentName) || throwError(`Argument --${argumentName} is required`);

export const argumentWithValueExists = (processArgv, argumentName) =>
  processArgv.some(element => new RegExp(`^--${argumentName}=\\S`).test(element));

export const argumentWithValueExistsOrCrash = (processArgv, argumentName) =>
  argumentWithValueExists(processArgv, argumentName) || throwError(`Argument --${argumentName}=[value(s)] is required`);

/////////////////////////// GETTERS ///////////////////////////

export const getArgumentValue = (processArgv, argumentName, defaultValue = '') => {
  display(`getArgumentValue(${argumentName})`, `[   OK   ]`);
  const regex = new RegExp(`--${argumentName}=`);
  display(`getArgumentValue(${argumentName}) regex=${regex}`, `[   OK   ]`);
  const value = processArgv.find(arrayElement => regex.test(arrayElement)) || `--${argumentName}=${defaultValue}`;
  display(`getArgumentValue(${argumentName}) value=${value}`, `[   OK   ]`);
  return value.slice(argumentName.length + 3);
};

/**
 *
 * @param {*} processArgv string[]
 * @param {*} argumentName string
 * @returns string
 */
export const getArgumentValueOrCrash = (processArgv, argumentName) =>
  argumentWithValueExistsOrCrash(processArgv, argumentName) &&
  processArgv.find(element => new RegExp(`--${argumentName}=\\S`).test(element)).slice(argumentName.length + 3);

export const getArgumentValuesOrCrash = (processArgv, argumentName) =>
  getArgumentValueOrCrash(processArgv, argumentName).split(',');

/////////////////////////// EXPERIMENTAL ///////////////////////////

export const argumentExperimental = {
  exists: {
    only: (
      () => (processArgv, argumentName) =>
        processArgv.includes(`--${argumentName}`)
    )(),
    orCrash: (
      () => (processArgv, argumentName) =>
        processArgv.includes(`--${argumentName}`)
    )(),
  },
  value: {
    exists: (
      () => (processArgv, argumentName) =>
        processArgv.includes(`--${argumentName}=`)
    )(),
    isNotEmpty: (processArgv, argumentName) => processArgv.includes(`--${argumentName}=`),
  },
  parse: {
    asDependencies: () => '',
  },
};
