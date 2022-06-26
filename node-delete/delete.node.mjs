import fs from 'fs';
import { display, displayError, displayInTheMiddle } from '@createdbyjurand/node-display';

displayInTheMiddle('delete.node.mjs version 0.4.0');

export const deleteFile = fileName => {
  display(fileName + ': Deleting', '[   OK   ]');
  if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
    display(fileName + ': Deleted', '[   OK   ]');
  } else {
    displayError(fileName + ': File not found', '[ FAILED ]');
  }
};

export const deleteFolder = folderName => {
  display(folderName + ': Deleting', '[   OK   ]');
  if (fs.existsSync(folderName)) {
    fs.rmSync(folderName, { recursive: true });
    display(folderName + ': Deleted', '[   OK   ]');
  } else {
    displayError(folderName + ': Folder not found', '[ FAILED ]');
  }
};

export const deleteFolderExcept = (folderName, except) => {
  display(folderName + ': Deleting', '[   OK   ]');
  if (fs.existsSync(folderName)) {
    fs.readdirSync(folderName).forEach(subfolder => {
      const curPath = path.join(folderName, subfolder);
      if (fs.lstatSync(curPath).isDirectory()) {
        fs.rmdirSync(curPath, { recursive: true });
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
