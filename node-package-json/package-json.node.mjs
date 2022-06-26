import { run } from '../node-scripts/run.node.mjs';
import { openAndParseJsonFile, stringifyAndSaveJsonFile } from './json.node.mjs';

export const removePrefix = value => (/^\d/.test(value) ? value : value.slice(1));

export const removePrefixesFromDependenciesInPackageJson = () => {
  const parsedPackageJson = openAndParseJsonFile('package.json');
  Object.entries(parsedPackageJson.dependencies).map(
    ([key, value]) => (parsedPackageJson.dependencies[key] = removePrefix(value)),
  );
  Object.entries(parsedPackageJson.devDependencies).map(
    ([key, value]) => (parsedPackageJson.devDependencies[key] = removePrefix(value)),
  );
  stringifyAndSaveJsonFile(parsedPackageJson, 'package.json');
};

export const updateAllDependenciesFromPackageJsonExcept = (skipDependencies, npmArguments) => {
  const parsedPackageJson = openAndParseJsonFile('package.json');
  let dependenciesToUpdate = '';

  for (let [key, value] of Object.entries({
    ...parsedPackageJson.dependencies,
    ...parsedPackageJson.devDependencies,
  })) {
    if (skipDependencies.includes(key)) {
      dependenciesToUpdate += ` ${key}@${value}`;
    } else {
      dependenciesToUpdate += ` ${key}@latest`;
    }
  }

  run(`npm i${npmArguments}${dependenciesToUpdate}`);
};
