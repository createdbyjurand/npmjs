import {displayInTheMiddle} from '@createdbyjurand/node-display';
import {readAndParseJsonFile} from './json-file.node.mjs';

displayInTheMiddle(`node.node.mjs version ${readAndParseJsonFile('./release-version-number.json').version}`);

export const node = {
  version: (() => +process.version.match(/^v(\d+)/)[1])()
};
