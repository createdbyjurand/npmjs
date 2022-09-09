import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`error.node.mjs version 1.0.2`);

export const throwError = mssg => {
  throw new Error(mssg);
};
