import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`node.node.mjs version 1.0.2`);

export const node = {
  version: (() => +process.version.match(/^v(\d+)/)[1])()
};
