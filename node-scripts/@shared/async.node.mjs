import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`async.node.mjs version 0.4.0`);

export const async = f => setTimeout(() => f, 0);
