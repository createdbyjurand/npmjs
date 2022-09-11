import {displayError, displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`error.node.mjs version 1.1.0`);

export const throwError = mssg => {
  displayError(mssg, '[ FAILED ]');
  throw new Error(mssg);
};
