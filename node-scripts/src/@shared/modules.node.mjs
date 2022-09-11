import fs from 'fs';
import {deleteFile} from './delete.node.mjs';
import {display, displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`modules.node.mjs version 3.0.0`);

export const availableExtensions = {
  cjs: 'cjs',
  js: 'js',
  jsx: 'jsx',
  mjs: 'mjs',
  node: {
    js: 'node.js',
    mjs: 'node.mjs',
  },
  ts: 'ts',
  tsx: 'tsx',
};

export const rebuildModules = (pathToModulesRootDirectory, extension = 'mjs') => {
  const directory = fs.readdirSync(pathToModulesRootDirectory);
  const indexFileContent = [];

  directory.forEach(element => {
    const currentPath = pathToModulesRootDirectory.endsWith('/')
      ? `${pathToModulesRootDirectory.slice(0, -1)}/${element}`
      : `${pathToModulesRootDirectory}/${element}`;
    if (fs.lstatSync(currentPath).isDirectory()) {
      // recurse
      rebuildModules(currentPath);
    } else if (element === `index.${extension}`) {
      deleteFile(currentPath);
      display(`[ ${currentPath} ] New content`, '[PREPARED]');
    } else if (
      element.endsWith('.cjs') ||
      element.endsWith('.jsx') ||
      element.endsWith('.mjs') ||
      element.endsWith('.tsx')
    ) {
      indexFileContent.push(`export * from './${element.slice(0, -4)}';`);
    } else if (element.endsWith('.js') || element.endsWith('.ts')) {
      indexFileContent.push(`export * from './${element.slice(0, -3)}';`);
    }
  });

  console.log(indexFileContent.join('\r\n'));

  fs.writeFileSync(
    pathToModulesRootDirectory.endsWith('/')
      ? `${pathToModulesRootDirectory.slice(0, -1)}/index.${extension}`
      : `${pathToModulesRootDirectory}/index.${extension}`,
    indexFileContent.join('\r\n') + '\r\n',
    {encoding: 'utf8'},
  );
};
