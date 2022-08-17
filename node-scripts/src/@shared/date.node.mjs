import {displayInTheMiddle} from './display.node.mjs';
import {readAndParseJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`date.node.mjs version ${readAndParseJsonFile('./release-version-number.json').version}`);

export const setDate = date => console.log(new Date(date));

export const getDate = () => console.log(new Date());

getDate();
