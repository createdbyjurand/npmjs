const fs = require('fs');
import {display, displayInTheMiddle, getArgumentValue} from './index.node.mjs';

displayInTheMiddle(`update-release-version-number.node.mjs version 0.4.0`);

const pathToPackageJsonFile = getArgumentValue(process.argv, 'path-to-package-json') || './package.json';
const pathToPackageLockJsonFile = getArgumentValue(process.argv, 'path-to-package-lock-json') || './package-lock.json';
const pathToReleaseVersionNumberJsonFile =
  getArgumentValue(process.argv, 'path-to-release-version-number-json') || './release-version-number.json';
const pathToShared = getArgumentValue(process.argv, 'path-to-@shared') || './src/@shared';

let packageJsonFile = fs.readFileSync(pathToPackageJsonFile, 'utf-8');
console.log(`[   OK   ] packageJson readFileSync complete`);
let packageLockJsonFile = fs.readFileSync(pathToPackageLockJsonFile, 'utf-8');
console.log(`[   OK   ] packageLockJson readFileSync complete`);
let releaseVersionNumberJsonFile = fs.readFileSync(`${pathToShared}/release-version-number.json`, 'utf-8');
console.log(`[   OK   ] releaseVersionNumberJson readFileSync complete`);

console.log('--------- package.json START ---------');
console.log(packageJsonFile);
console.log('--------- package.json END ---------');
console.log('--------- package-lock.json START ---------');
console.log(packageLockJsonFile);
console.log('--------- package-lock.json END ---------');
console.log('--------- release-version-number.json START ---------');
console.log(releaseVersionNumberJsonFile);
console.log('--------- release-version-number.json END ---------');

const parsedPackageJsonFile = JSON.parse(packageJsonFile);
console.log(`[   OK   ] packageJson parse complete`);
const parsedPackageLockJsonFile = JSON.parse(packageLockJsonFile);
console.log(`[   OK   ] packageLockJson parse complete`);
const parsedReleaseVersionNumberJsonFile = JSON.parse(releaseVersionNumberJsonFile);
console.log(`[   OK   ] releaseVersionNumberJson parse complete`);

console.log(`[   OK   ] Release version number in package.json before update: ${parsedPackageJsonFile.version}`);
console.log(
  `[   OK   ] Release version number in package-lock.json before update: ${parsedPackageLockJsonFile.version}`
);
console.log(
  `[   OK   ] Release version number in release-version-number.json before update: ${parsedReleaseVersionNumberJsonFile.version}`
);
console.log(
  `[   OK   ] Release date in release-version-number.json before update: ${parsedReleaseVersionNumberJsonFile.date}`
);

parsedReleaseVersionNumberJsonFile.version = parsedReleaseVersionNumberJsonFile.version
  .split('.')
  .map((value, index) => (index === 2 ? +value + 1 : value))
  .join('.');

parsedPackageJsonFile.version = parsedReleaseVersionNumberJsonFile.version;
parsedPackageLockJsonFile.version = parsedReleaseVersionNumberJsonFile.version;

console.log(`[   OK   ] Release version number in package.json after update: ${parsedPackageJsonFile.version}`);
console.log(
  `[   OK   ] Release version number in package-lock.json after update: ${parsedPackageLockJsonFile.version}`
);
console.log(
  `[   OK   ] Release version number in release-version-number.json after update: ${parsedReleaseVersionNumberJsonFile.version}`
);

const date = new Date();
parsedReleaseVersionNumberJsonFile.date = date.toJSON();
console.log(
  `[   OK   ] Release date in release-version-number.json after update: ${parsedReleaseVersionNumberJsonFile.date}`
);

/**
 * JSON.stringify(parsedReleaseVersionNumberJsonFile, null, 2);
 * @param null - represents the replacer function. (in this case we don't want to alter the process)
 * @param 2 - represents the spaces to indent.
 */
packageJsonFile = JSON.stringify(parsedPackageJsonFile, null, 2);
console.log(`[   OK   ] packageJson stringify complete`);
packageLockJsonFile = JSON.stringify(parsedPackageLockJsonFile, null, 2);
console.log(`[   OK   ] packageLockJson stringify complete`);
releaseVersionNumberJsonFile = JSON.stringify(parsedReleaseVersionNumberJsonFile, null, 2);
console.log(`[   OK   ] releaseVersionNumberJson stringify complete`);

packageJsonFile += '\n';
console.log(`[   OK   ] packageJson added new line at the end`);
packageLockJsonFile += '\n';
console.log(`[   OK   ] packageLockJson added new line at the end`);
releaseVersionNumberJsonFile += '\n';
console.log(`[   OK   ] releaseVersionNumberJson added new line at the end`);

console.log('--------- new package.json START ---------');
console.log(packageJsonFile);
console.log('--------- new package.json END ---------');
console.log('--------- new package-lock.json START ---------');
console.log(packageLockJsonFile);
console.log('--------- new package-lock.json END ---------');
console.log('--------- new release-version-number.json START ---------');
console.log(releaseVersionNumberJsonFile);
console.log('--------- new release-version-number.json END ---------');

fs.writeFileSync(pathToPackageJsonFile, packageJsonFile, 'utf-8');
console.log(`[   OK   ] packageJson writeFileSync complete`);
fs.writeFileSync(pathToPackageLockJsonFile, packageLockJsonFile, 'utf-8');
console.log(`[   OK   ] packageLockJson writeFileSync complete`);
fs.writeFileSync(pathToReleaseVersionNumberJsonFile, releaseVersionNumberJsonFile, 'utf-8');
console.log(`[   OK   ] releaseVersionNumberJson writeFileSync complete`);

console.log(`[  DONE  ] update complete`);
