import fs from 'fs';
import {display, displayInTheMiddle} from './display.node.mjs';
import {run} from './run.node.mjs';

displayInTheMiddle(`directories.node.mjs version 0.0.1`);

export const runFunctionOnFilesWithSpecificExtensionsInDirectoryRecursively = (path, f, extensionsArray) => {
  const directory = fs.readdirSync(path);

  directory.forEach(element => {
    const currentPath = path.endsWith('/') ? `${path}${element}` : `${path}/${element}`;
    const foundExtension = extensionsArray.reduce((accumulator, currentValue) => {
      if (accumulator === true) return true;
      if (element.endsWith(currentValue)) return true;
      return false;
    }, false);

    if (fs.lstatSync(currentPath).isDirectory()) {
      // recurse
      display(`[ ${currentPath} ] is directory (recurse)`, '[   OK   ]');
      runFunctionOnFilesWithSpecificExtensionsInDirectoryRecursively(currentPath, f, extensionsArray);
    } else if (foundExtension) {
      run(f(currentPath));
    }
  });
};
