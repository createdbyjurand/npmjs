import fs from 'fs';
import {display, displayError, displayInTheMiddle} from './display.node.mjs';
import {node} from './node.node.mjs';
import {prefix} from './prefix.node.mjs';

displayInTheMiddle(`delete.node.mjs version 1.1.2`);

export const deleteFile = fileName => {
  display(`${prefix(fileName)} Deleting`, '[   OK   ]');
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
    display(`${prefix(fileName)} Deleted`, '[   OK   ]');
  } else {
    displayError(`${prefix(fileName)} File not found`, '[ FAILED ]');
  }
};

export const deleteFolder = folderName => {
  if (fs.existsSync(folderName) && !folderName.startsWith('.') && !folderName.startsWith('/')) {
    if (node.version >= 14) {
      display(`${prefix(folderName)} Detecting Node version...`, '[   OK   ]');
      display(`${prefix(folderName)} Node ${node.version} detected`, '[   OK   ]');
      display(`${prefix(folderName)} Deleting using rmSync`, '[   OK   ]');
      fs.rmSync(folderName, {recursive: true});
    } else if (node.version >= 12) {
      display(`${prefix(folderName)} Detecting Node version...`, '[   OK   ]');
      display(`${prefix(folderName)} Node ${node.version} detected`, '[   OK   ]');
      display(`${prefix(folderName)} Deleting using rmdirSync`, '[   OK   ]');
      fs.rmdirSync(folderName, {recursive: true});
    } else {
      display(`${prefix(folderName)} Detecting Node version...`, '[   OK   ]');
      display(`${prefix(folderName)} Node ${node.version} detected`, '[   OK   ]');
      display(`${prefix(folderName)} Deleting manually...`, '[   OK   ]');
      fs.readdirSync(folderName).forEach(file => {
        const curPath = `${folderName}/${file}`;
        if (fs.lstatSync(curPath).isDirectory()) {
          // recurse
          deleteFolder(curPath);
        } else {
          // delete file
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(folderName);
    }
    display(`${prefix(folderName)} Deleted`, '[   OK   ]');
  } else {
    displayError(`${prefix(folderName)} Folder not found`, '[ FAILED ]');
  }
};

/*

export const deleteFolderExcept = (folderName, except) => {
  display(folderName + ': Deleting', '[   OK   ]');
  if (fs.existsSync(folderName)) {
    fs.readdirSync(folderName).forEach(subfolder => {
      const curPath = path.join(folderName, subfolder);
      if (fs.lstatSync(curPath).isDirectory()) {
        fs.rmdirSync(curPath, {recursive: true});
      } else {
        if (shouldDelete(subfolder)) {
          fs.unlinkSync(curPath);
        }
      }
    });
    display(folderName + ': Deleted', '[   OK   ]');
  } else {
    displayError(folderName + ': Folder not found', '[ FAILED ]');
  }
};

*/
