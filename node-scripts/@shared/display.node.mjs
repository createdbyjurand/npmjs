/* eslint-disable no-console */

import fs from 'fs';

const COLOR = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',

  fgBlack: '\x1b[30m',
  fgRed: '\x1b[31m',
  fgGreen: '\x1b[32m',
  fgYellow: '\x1b[33m',
  fgBlue: '\x1b[34m',
  fgMagenta: '\x1b[35m',
  fgCyan: '\x1b[36m',
  fgWhite: '\x1b[37m',

  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m',
};

const reduceWidthForJestConsole = 4;
const reduceWidthForSpaces = 2;

const fill = (char, numberOfRepetitions, str = '') => {
  while (numberOfRepetitions > 0) {
    str += char;
    numberOfRepetitions--;
  }
  return str;
};

export const displayLong = (
  left,
  right = '',
  prefix = '',
  color = COLOR.fgCyan,
  maxWidth = process.stdout.columns - reduceWidthForJestConsole,
) => {
  left += '';
  right += '';
  let output = [];

  for (let i = 0; left.length > maxWidth; i++) {
    while (left[0] === ' ') left = left.slice(1);
    if (i > 0) left = prefix + left;
    let lastIndexOfSpace = left.lastIndexOf(' ', maxWidth);
    if (lastIndexOfSpace < maxWidth / 10 + prefix.length) lastIndexOfSpace = maxWidth;
    output[i] = left.slice(0, lastIndexOfSpace);
    console.log(`${color}${output[i]}${COLOR.reset}`);
    left = left.slice(lastIndexOfSpace);
  }

  while (left[0] === ' ') left = left.slice(1);
  if (output.length > 0) left = prefix + left;

  if (right === '') {
    console.log(`${color}${left}${COLOR.reset}`);
  } else {
    const dots = maxWidth - left.length - reduceWidthForSpaces - right.length;
    console.log(`${color}${left}${COLOR.reset} ${fill('.', dots)} ${color}${right}${COLOR.reset}`);
  }

  return output;
};

export const display = (left, right = '') => {
  left += '';
  right += '';

  if (right === '') {
    console.log(`${COLOR.fgGreen}${left}${COLOR.reset}`);
  } else {
    const dots = process.stdout.columns - reduceWidthForJestConsole - left.length - reduceWidthForSpaces - right.length;
    console.log(`${COLOR.fgGreen}${left}${COLOR.reset} ${fill('.', dots)} ${COLOR.fgGreen}${right}${COLOR.reset}`);
  }
};

export const displayError = (left, right = '') => {
  left += '';
  right += '';

  if (right === '') {
    console.log(COLOR.fgRed + '%s' + COLOR.reset, left);
  } else {
    const dots = process.stdout.columns - reduceWidthForJestConsole - left.length - reduceWidthForSpaces - right.length;
    console.log(COLOR.fgRed + '%s' + COLOR.reset, `${left} ${fill('.', dots)} ${right}`);
  }
};

export const displayWarning = (left, right = '') => {
  left += '';
  right += '';

  if (right === '') {
    console.log(COLOR.fgYellow + '%s' + COLOR.reset, left);
  } else {
    const dots = process.stdout.columns - reduceWidthForJestConsole - left.length - reduceWidthForSpaces - right.length;
    console.log(COLOR.fgYellow + '%s' + COLOR.reset, `${left} ${fill('.', dots)} ${right}`);
  }
};

export const displayCommand = (left, right = '') => {
  left += '';
  right += '';

  if (right === '') {
    console.log(COLOR.fgCyan + '%s' + COLOR.reset, left);
  } else {
    const dots = process.stdout.columns - reduceWidthForJestConsole - left.length - reduceWidthForSpaces - right.length;
    console.log(COLOR.fgCyan + '%s' + COLOR.reset, `${left} ${fill('.', dots)} ${right}`);
  }
};

export const displayInTheMiddle = centre => {
  const half = (process.stdout.columns - reduceWidthForJestConsole - centre.length - reduceWidthForSpaces) / 2;
  console.log(
    COLOR.fgCyan + '%s' + COLOR.reset,
    `${fill('-', Math.floor(half))} ${centre} ${fill('-', Math.ceil(half))}`,
  );
};

export const displayInTheMiddleWithVersion = centre =>
  displayInTheMiddle(
    `${centre} version ${JSON.parse(fs.readFileSync('./release-version-number.json', 'utf-8')).version}`,
  );

export const displayHeaderCBJ = () =>
  console.log(
    "   ____                      _           _ _            _                           _\r\n  / __ \\  ___ _ __ ___  __ _| |_ ___  __| | |__  _   _ (_)_   _ _ __ __ _ _ __   __| |\r\n / / _` |/ __| '__/ _ \\/ _` | __/ _ \\/ _` | '_ \\| | | || | | | | '__/ _` | '_ \\ / _` |\r\n| | (_| | (__| | |  __/ (_| | ||  __/ (_| | |_) | |_| || | |_| | | | (_| | | | | (_| |\r\n \\ \\__,_|\\___|_|  \\___|\\__,_|\\__\\___|\\__,_|_.__/ \\__, |/ |\\__,_|_|  \\__,_|_| |_|\\__,_|\r\n  \\____/                                         |___/__/",
  );

export const displayLogoCBJ = () =>
  console.log(
    '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\r\n @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  \r\n   @@@@@@@                 @@@@                 @@@                @@@@@@@   \r\n    @@@@@@@                  @@@       @@@       @@@@             @@@@@@@    \r\n      @@@@@@@@@@@@@@@@@       @@@@      @@@@       @@@@@@       @@@@@@@      \r\n       @@@@@@@@@@@@@@@@@@      @@@@       @@@       @@@@       @@@@@@@       \r\n         @@@@@@@@@@@@@@@@@       @@@       @@@@              @@@@@@@         \r\n          @@@@@@@@@@@@@@@@@       @@@@       @@@            @@@@@@@          \r\n            @@@@@@@@@@@@@@@@@       @@@       @@@@        @@@@@@@            \r\n             @@@@@@@@@@@@@@@@@       @@@@       @@@      @@@@@@@             \r\n              @@@@@@@@@@@@@@@@@@       @@@       @@@@  @@@@@@@               \r\n                @@@@@@@@@@@@@@@@@       @@@@       @@@@@@@@@@                \r\n                 @@@@@@@@@@@@@@@@@@       @@@       @@@@@@@                  \r\n                   @@@@@@@       @@@       @@@@    @@@@@@@                   \r\n                    @@@@@@@       @@@@       @@@  @@@@@@@                    \r\n                      @@@@@@@       @@@       @@@@@@@@@                      \r\n                       @@@@@@@       @@@       @@@@@@@                       \r\n                         @@@@@@@             @@@@@@@                         \r\n                          @@@@@@@           @@@@@@@                          \r\n                            @@@@@@@       @@@@@@@                            \r\n                             @@@@@@@     @@@@@@@                             \r\n                              @@@@@@@  @@@@@@@                               \r\n                                @@@@@@@@@@@@@                                \r\n                                 @@@@@@@@@@@                                 \r\n                                   @@@@@@@                                   \r\n                                    @@@@@                                    \r\n                                      @                                      ',
  );

/**
 *   ┌ ─ ┬ ─ ┐
 *
 *   │   │   │
 *
 *   ├ ─ ┼ ─ ┤
 *
 *   │   │   │
 *
 *   └ ─ ┴ ─ ┘
 *
 * @param {*} array string[]
 * @param {*} title string
 * @returns void
 */
export const displayList = (array, title) => {
  display(`┌─── ${title}`);
  display('│');
  for (let element of array) {
    display(`├ ${element}`);
  }
  display('│');
  display('└─── Finished');
};

displayInTheMiddle(`display.node.mjs version 3.0.0`);
