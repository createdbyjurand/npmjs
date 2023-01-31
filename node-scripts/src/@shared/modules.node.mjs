import fs from 'fs';
import { deleteFile } from './delete.node.mjs';
import { display, displayInTheMiddle } from './display.node.mjs';

displayInTheMiddle(`modules.node.mjs version 4.0.0`);

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

export const rebuildModules = options => {
  const extension = options.extension ?? 'ts';
  const noRoot = options.noRoot ?? false;
  const path = options.path ?? './';
  const directory = fs.readdirSync(path);
  const indexFileContent = [];

  directory.forEach(element => {
    const currentPath = path.endsWith('/')
      ? `${path}${element}`
      : `${path}/${element}`;

    if (fs.lstatSync(currentPath).isDirectory()) {
      // recurse
      rebuildModules({ ...options, path: currentPath });
    } else if (element === `index.${extension}`) {
      deleteFile(currentPath);
      display(`[ ${currentPath} ] Deleted`, '[   OK   ]');
    } else if (element.endsWith('.cjs') || element.endsWith('.mjs')) {
      indexFileContent.push(`export * from './${element}';`);
    } else if (element.endsWith('.jsx') || element.endsWith('.tsx')) {
      indexFileContent.push(`export * from './${element.slice(0, -4)}';`);
    } else if (element.endsWith('.js') || element.endsWith('.ts')) {
      indexFileContent.push(`export * from './${element.slice(0, -3)}';`);
    }
  });

  console.log(indexFileContent.join('\r\n'));

  if (noRoot && path !== './')
    fs.writeFileSync(
      path.endsWith('/')
        ? `${path}index.${extension}`
        : `${path}/index.${extension}`,
      indexFileContent.join('\r\n') + '\r\n',
      { encoding: 'utf8' },
    );
};
