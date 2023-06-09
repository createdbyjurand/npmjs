import fs from 'fs';
import {
  argumentExists,
  argumentWithValueExists,
  display,
  displayArguments,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayLogoCBJ,
  getAllPackageJsonDependenciesAsLatestReadyToInstallList,
  getAllPackageJsonDependenciesAsLatestReadyToInstallListExcept,
  getAllPackageJsonDevDependenciesAsLatestReadyToInstallList,
  getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept,
  getArgumentValueOrCrash,
  removePrefixesFromAllDependenciesInPackageJson,
  run,
} from '../@shared/index.node.mjs';
// import rewire from 'rewire';
// https://www.elvenware.com/teach/assignments/NodeJsMocksWithRewire.html
// const updateDependenciesNodeMJS = rewire('../bin/update-dependencies.node.mjs');

console.log('directory before change:', fs.readdirSync('.'));
process.chdir('node-scripts/__tests__');
console.log('directory after change:', fs.readdirSync('.'));

test('deps', () => {
  expect(2 * 2).toBe(4);
  expect(4 - 2).not.toBe(1);
});

test('getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept', () => {
  expect(
    getAllPackageJsonDevDependenciesAsLatestReadyToInstallListExcept('./mocks/packageJsonFrontendMock.json', [
      'typescript',
    ]),
  ).toBe(
    '@createdbyjurand/node-scripts@latest ' +
      '@react-pdf/types@latest ' +
      '@testing-library/jest-dom@latest ' +
      '@testing-library/react@latest ' +
      '@testing-library/user-event@latest ' +
      '@types/jest@latest ' +
      '@types/node@latest ' +
      '@types/react@latest ' +
      '@types/react-dom@latest ' +
      'eslint@latest ' +
      'prettier@latest ' +
      'rimraf@latest ' +
      'sass@latest',
    // 'typescript@latest',
  );
});
