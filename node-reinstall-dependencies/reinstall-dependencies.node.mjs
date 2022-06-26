import {deleteFolder} from './delete.node.mjs';
import {display, displayInTheMiddle} from './display.node.mjs';
import {installTheLatestVersionsOfDevDependencies} from './package.json.node.mjs';
import {run} from './run.node.mjs';

displayInTheMiddle('reinstall-dependencies.node.mjs version 1.2.5');

run('node -v');
run('npm -v');
run('npm outdated');
deleteFolder('node_modules');
run(
    installTheLatestVersionsOfDevDependencies([
      '@prettier/plugin-xml',
      // '@testing-library/react',
      '@types/jest',
      '@types/nightwatch',
      'nightwatch',
      'prettier',
      'prettier-plugin-java',
      'prettier-plugin-properties'
    ])
);
run('npm i --legacy-peer-deps');
run('node -v');
run('npm -v');
run('npm outdated');

display('Script ended', '[  DONE  ]');
