import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`date.node.mjs version 0.4.0`);

export const setDate = date => console.log(new Date(date));

export const getDate = () => console.log(new Date());

getDate();
