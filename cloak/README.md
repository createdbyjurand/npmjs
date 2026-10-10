# @createdbyjurand/cloak

Generate random strings containing lowercase letters, digits, and hyphens.
Requires Node.js 26 or newer. Uses Node's cryptographic random number generator.

## Install

```sh
npm i @createdbyjurand/cloak
```

## Usage

```js
import {generateCloak, generateCloaks} from '@createdbyjurand/cloak';

const cloak = generateCloak(); // One 9-character string, including hyphens.
const cloaks = generateCloaks(5); // An array of five strings.

const longer = generateCloak(36, 36, 3, 12);
const batch = generateCloaks(5, 36, 36, 3, 12);

console.log(cloaks.join('\n')); // Printing is up to you.
```

`generateCloak(minLength = 9, maxLength = 9, minGap = 3, maxGap = 12)`

- Length includes hyphens. Both length limits are inclusive.
- Every cloak has at least one hyphen, with no leading, trailing, or adjacent hyphens.
- `minGap` and `maxGap` set the number of characters between hyphens.
- The first and last segments contain between `1` and `maxGap` characters.
- Lengths must be integers from `3` to `4096`; gaps must be integers from `1` to `4096`.
- Minimums cannot exceed maximums. Invalid or impossible settings throw `RangeError`.
- Only feasible lengths are chosen. For gaps of `1..1`, these are odd lengths.

`generateCloaks(count = 10, minLength = 9, maxLength = 9, minGap = 3, maxGap = 12)`

Returns an array using the same settings. `count` must be an integer from `0` to `1000`.
A count of `0` returns an empty array without checking the cloak settings.
The limits keep individual calls from requesting excessive work.

Generation builds each string directly, without enumerating layouts or retrying rejected strings.
Hyphen layouts are not equally likely, and random strings are not guaranteed to be unique.

Importing the package does not print or generate anything.

## Console display

```js
import {consoleLogCloaks} from '@createdbyjurand/cloak';

consoleLogCloaks(); // Fill the terminal with aligned columns of 36-character cloaks.
consoleLogCloaks(5, 2, 12, 16, 3, 6); // Rows, spaces between columns, then length and gap settings.
```

Columns fit the terminal width, with at least one cloak per row.
Shorter cloaks are padded so columns stay aligned.
Without terminal dimensions, the display uses 80 columns and 24 rows.
The total number of cloaks must not exceed 1000, matching `generateCloaks`.

Run directly from the repository root:

```sh
node cloak/src/console-log-cloaks.ts
```

## License

ISC
