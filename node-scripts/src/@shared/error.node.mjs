import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`error.node.mjs version 0.4.0`);

export const throwError = mssg => {
  throw new Error(mssg);
};
