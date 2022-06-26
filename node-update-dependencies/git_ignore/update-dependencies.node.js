const skipDependencies = [
  '',
];

const { spawnSync } = require('child_process');
const spawnChild = command => spawnSync(command, { stdio: 'inherit', shell: true });

console.log('---------- node -v');
spawnChild('node -v');
console.log('---------- npm -v');
spawnChild('npm -v');
console.log('---------- npm outdated');
spawnChild('npm outdated');

const fs = require('fs');
const pathToPackageJsonFile = './package.json';

let packageJsonFile = fs.readFileSync(pathToPackageJsonFile, 'utf-8');
console.log('[   OK   ] package.json readFileSync complete');

let parsedPackageJsonFile = JSON.parse(packageJsonFile);
console.log('[   OK   ] package.json parse complete');

const start = (new Date()).getTime();

const msToHMS = ms => {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  ms -= hours * 60 * 60 * 1000;
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  ms -= minutes * 60 * 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  return isNaN(hours) && isNaN(minutes) && isNaN(seconds)
    ? { hours: 0, minutes: 0, seconds: 0 }
    : { hours, minutes, seconds };
};

console.log('---------- Updating dependencies');
Object.keys(Object.assign(
  {},
  parsedPackageJsonFile.dependencies,
  parsedPackageJsonFile.devDependencies,
)).map((key, index, array) => {
  const difference = (new Date()).getTime() - start;
  const elapsed = msToHMS(difference);
  const remaining = msToHMS((difference / index) * (array.length - index));
  if (skipDependencies.includes(key)) {
    console.log(`[  SKIP  ] ${key}`);
    console.log(`package ${index + 1} of ${array.length}`);
    console.log(`${elapsed.hours} hours, ${elapsed.minutes} minutes, ${elapsed.seconds} seconds elapsed`);
    console.log(`~${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds left`);
  } else {
    console.log(`---------- npm i ${key}@latest`);
    console.log(`package ${index + 1} of ${array.length}`);
    console.log(`${elapsed.hours} hours, ${elapsed.minutes} minutes, ${elapsed.seconds} seconds elapsed`);
    console.log(`~${remaining.hours} hours, ${remaining.minutes} minutes, ${remaining.seconds} seconds remaining`);
    spawnChild(`npm i ${key}@latest`);
  }
});

packageJsonFile = fs.readFileSync(pathToPackageJsonFile, 'utf-8');
console.log('[   OK   ] package.json readFileSync complete');

parsedPackageJsonFile = JSON.parse(packageJsonFile);
console.log('[   OK   ] package.json parse complete');

const cleanup = dependencies => {
  Object.keys(dependencies).map(key => {
    if (dependencies[key][0] === '~' || dependencies[key][0] === '^') {
      let prefix = dependencies[key][0];
      dependencies[key] = dependencies[key].slice(1);
      console.log(`[ FIXING ] ${prefix}${dependencies[key]} -> ${dependencies[key]}`);
    } else {
      console.log(`[   OK   ] ${dependencies[key]}`);
    }
  });
};

console.log('---------- Removing prefixes (^ and ~) from package.json dependencies version numbers');
cleanup(parsedPackageJsonFile.dependencies);

console.log('---------- Removing prefixes (^ and ~) from package.json devDependencies version numbers');
cleanup(parsedPackageJsonFile.devDependencies);

console.log('---------- Saving package.json');

/**
 * JSON.stringify(parsedReleaseVersionNumberJson, null, 2);
 * @param null - represents the replacer function. (in this case we don't want to alter the process)
 * @param 2 - represents the spaces to indent.
 */
packageJsonFile = JSON.stringify(parsedPackageJsonFile, null, 2);
console.log(`[   OK   ] package.json stringify complete`);

packageJsonFile += '\n';
console.log(`[   OK   ] package.json added new line at the end`);

console.log('--------- new package.json START ---------');
console.log(packageJsonFile);
console.log('--------- new package.json END ---------');

fs.writeFileSync(pathToPackageJsonFile, packageJsonFile, 'utf-8');
console.log(`[   OK   ] package.json writeFileSync complete`);

console.log('---------- Script ended');
