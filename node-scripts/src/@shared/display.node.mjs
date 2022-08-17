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
  bgWhite: '\x1b[47m'
};

const fill = (char, numberOfRepetitions, str = '') => {
  while (numberOfRepetitions > 0) {
    str += char;
    numberOfRepetitions--;
  }
  return str;
};

export const display = (left, right) => {
  left += '';
  right += '';
  const dots = process.stdout.columns - left.length - 2 - right.length;
  console.log(`${COLOR.fgGreen}${left}${COLOR.reset} ${fill('.', dots)} ${COLOR.fgGreen}${right}${COLOR.reset}`);
};

export const displayError = (left, right) => {
  left += '';
  right += '';
  const dots = process.stdout.columns - left.length - 2 - right.length;
  console.log(COLOR.fgRed + '%s' + COLOR.reset, `${left} ${fill('.', dots)} ${right}`);
};

export const displayWarning = (left, right) => {
  const dots = process.stdout.columns - left.length - 2 - right.length;
  console.log(COLOR.fgYellow + '%s' + COLOR.reset, `${left} ${fill('.', dots)} ${right}`);
};

export const displayInTheMiddle = centre => {
  const half = (process.stdout.columns - centre.length - 2) / 2;
  console.log(
    COLOR.fgCyan + '%s' + COLOR.reset,
    `${fill('-', Math.floor(half))} ${centre} ${fill('-', Math.ceil(half))}`
  );
};

export const displayInTheMiddleWithVersion = centre =>
  displayInTheMiddle(
    `${centre} version ${JSON.parse(fs.readFileSync('./release-version-number.json', 'utf-8')).version}`
  );

export const displayHeaderCBJ = () =>
  console.log(
    "   ____                      _           _ _            _                           _\r\n  / __ \\  ___ _ __ ___  __ _| |_ ___  __| | |__  _   _ (_)_   _ _ __ __ _ _ __   __| |\r\n / / _` |/ __| '__/ _ \\/ _` | __/ _ \\/ _` | '_ \\| | | || | | | | '__/ _` | '_ \\ / _` |\r\n| | (_| | (__| | |  __/ (_| | ||  __/ (_| | |_) | |_| || | |_| | | | (_| | | | | (_| |\r\n \\ \\__,_|\\___|_|  \\___|\\__,_|\\__\\___|\\__,_|_.__/ \\__, |/ |\\__,_|_|  \\__,_|_| |_|\\__,_|\r\n  \\____/                                         |___/__/"
  );

export const displayLogoCBJ = () =>
  console.log(
    '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\r\n @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@  \r\n   @@@@@@@                 @@@@                 @@@                @@@@@@@   \r\n    @@@@@@@                  @@@       @@@       @@@@             @@@@@@@    \r\n      @@@@@@@@@@@@@@@@@       @@@@      @@@@       @@@@@@       @@@@@@@      \r\n       @@@@@@@@@@@@@@@@@@      @@@@       @@@       @@@@       @@@@@@@       \r\n         @@@@@@@@@@@@@@@@@       @@@       @@@@              @@@@@@@         \r\n          @@@@@@@@@@@@@@@@@       @@@@       @@@            @@@@@@@          \r\n            @@@@@@@@@@@@@@@@@       @@@       @@@@        @@@@@@@            \r\n             @@@@@@@@@@@@@@@@@       @@@@       @@@      @@@@@@@             \r\n              @@@@@@@@@@@@@@@@@@       @@@       @@@@  @@@@@@@               \r\n                @@@@@@@@@@@@@@@@@       @@@@       @@@@@@@@@@                \r\n                 @@@@@@@@@@@@@@@@@@       @@@       @@@@@@@                  \r\n                   @@@@@@@       @@@       @@@@    @@@@@@@                   \r\n                    @@@@@@@       @@@@       @@@  @@@@@@@                    \r\n                      @@@@@@@       @@@       @@@@@@@@@                      \r\n                       @@@@@@@       @@@       @@@@@@@                       \r\n                         @@@@@@@             @@@@@@@                         \r\n                          @@@@@@@           @@@@@@@                          \r\n                            @@@@@@@       @@@@@@@                            \r\n                             @@@@@@@     @@@@@@@                             \r\n                              @@@@@@@  @@@@@@@                               \r\n                                @@@@@@@@@@@@@                                \r\n                                 @@@@@@@@@@@                                 \r\n                                   @@@@@@@                                   \r\n                                    @@@@@                                    \r\n                                      @                                      '
  );

displayInTheMiddleWithVersion('display.node.mjs');
