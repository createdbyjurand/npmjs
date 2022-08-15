import fs from 'fs';
import {deleteFile, display, displayInTheMiddle, getArgumentValue, run} from './@shared/index.node.mjs';

displayInTheMiddle(
  `rebuild-modules.node.mjs version ${readAndParseJsonFile('./@shared/release-version-number.json').version}`
);

const path = getArgumentValue(process.argv, 'path');

process.chdir(path);

run('dir /b');

const rebuildModules = path => {
  const directory = fs.readdirSync(path);
  const indexFileContent = [];

  directory.forEach(element => {
    const currentPath = path.endsWith('/') ? `${path.slice(0, -1)}/${element}` : `${path}/${element}`;
    if (fs.lstatSync(currentPath).isDirectory()) {
      // recurse
      rebuildModules(currentPath);
    } else if (element === 'index.ts' || element === 'index.tsx') {
      deleteFile(currentPath);
      display(`[ ${currentPath} ] New content`, '[PREPARED]');
    } else if (element.endsWith('.tsx')) {
      indexFileContent.push(`export * from './${element.slice(0, -4)}';`);
    } else if (element.endsWith('.ts')) {
      indexFileContent.push(`export * from './${element.slice(0, -3)}';`);
    }
  });

  console.log(indexFileContent.join('\r\n'));

  fs.writeFileSync(
    path.endsWith('/') ? `${path.slice(0, -1)}/index.ts` : `${path}/index.ts`,
    indexFileContent.join('\r\n') + '\r\n',
    {encoding: 'utf8'}
  );
};

rebuildModules('./');

display('Script ended', '[  DONE  ]');
