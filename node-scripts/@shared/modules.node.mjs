import fs from 'fs';
import {deleteFile} from './delete.node.mjs';
import {display, displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`modules.node.mjs version 4.2.0`);

export const availableExtensions = {
  cjs: 'cjs',
  js: 'js',
  jsx: 'jsx',
  mjs: 'mjs',
  node: {
    cjs: 'node.cjs',
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
    const currentPath = path.endsWith('/') ? `${path}${element}` : `${path}/${element}`;
    const toPascalCase = str =>
      (String(str).match(/[a-zA-Z0-9]+/g) || []).map(w => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
    const getFileName = e => e.split('.').slice(0, -1).join('');
    const getFileExtension = e => e.split('.').pop();

    if (fs.lstatSync(currentPath).isDirectory()) {
      // recurse
      rebuildModules({...options, path: currentPath});
    } else if (element === `index.${extension}`) {
      deleteFile(currentPath);
      display(`[ ${currentPath} ] Deleted`, '[   OK   ]');
    } else if (element.endsWith('.cjs') || element.endsWith('.mjs')) {
      indexFileContent.push(`export * from './${element}';`);
    } else if (
      element.endsWith('.js') ||
      element.endsWith('.ts') ||
      element.endsWith('.jsx') ||
      element.endsWith('.tsx')
    ) {
      indexFileContent.push(`export * from './${getFileName(element)}';`);
    } else if (
      element.endsWith('.json') ||
      element.endsWith('.jsonc') ||
      element.endsWith('.json5') ||
      element.endsWith('.svg')
    ) {
      indexFileContent.push(`import ${toPascalCase(getFileName(element))} from './${element}';`);
      indexFileContent.push(`export const ${toPascalCase(element)} = ${toPascalCase(getFileName(element))};`);
    }
  });

  indexFileContent.sort((a, b) => {
    const A = a.split(' ')[0];
    const AA = a.split(' ')[1];
    const B = b.split(' ')[0];
    const BB = b.split(' ')[1];
    if (A === 'import' && B === 'export') return -1;
    if (A === 'export' && B === 'export' && AA === 'const' && BB === '*') return -1;
    if (A === 'export' && B === 'import') return 1;
    if (A === 'export' && B === 'export' && AA === '*' && BB === 'const') return 1;
    return 0;
  });

  indexFileContent.splice(
    indexFileContent.findIndex(e => e.split(' ')[0] === 'export'),
    0,
    '',
  );
  indexFileContent.splice(
    indexFileContent.findLastIndex(e => e.split(' ')[1] === '*'),
    0,
    '',
  );

  console.log(indexFileContent.join('\r\n'));
  console.log('noRoot', noRoot);

  if ((noRoot && path !== './') || !noRoot)
    fs.writeFileSync(
      path.endsWith('/') ? `${path}index.${extension}` : `${path}/index.${extension}`,
      indexFileContent.join('\r\n') + '\r\n',
      {encoding: 'utf8'},
    );
};
