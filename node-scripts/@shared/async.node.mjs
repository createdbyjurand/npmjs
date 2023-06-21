import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`async.node.mjs version 1.0.0`);

export const async = f => setTimeout(() => f, 0);
