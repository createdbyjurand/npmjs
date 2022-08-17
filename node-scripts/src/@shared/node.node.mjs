import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`node.node.mjs version 0.4.0`);

export const node = {
  version: (() => +process.version.match(/^v(\d+)/)[1])()
};
