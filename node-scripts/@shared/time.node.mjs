import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`time.node.mjs version 0.4.0`);

export const start = new Date().getTime();

export const msToHMS = ms => {
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  ms -= hours * 60 * 60 * 1000;
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  ms -= minutes * 60 * 1000;
  const seconds = Math.floor((ms / 1000) % 60);
  return isNaN(hours) && isNaN(minutes) && isNaN(seconds)
    ? {hours: 0, minutes: 0, seconds: 0}
    : {hours, minutes, seconds};
};

export const remainingTimeFromMap = (start, key, index, array) => {
  const difference = new Date().getTime() - start;
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
};
