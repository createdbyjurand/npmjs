import {run} from './run.node.mjs';
import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`bash.node.mjs version 0.0.0`);

const handleArgs = args => (args === '' ? '' : ` ${args}`);

/**
 * nullglob        off
 */
export const shoptNullglob = (args = '') => `shopt${handleArgs(args)} nullglob`;

/**
 * failglob        off
 */
export const shoptFailglob = (args = '') => `shopt${handleArgs(args)} failglob`;

/**
 * extglob         off
 */
export const shoptExtglob = (args = '') => `shopt${handleArgs(args)} extglob`;

/**
 * bash: shopt: globstar: invalid shell option name
 */
export const shoptGlobstar = (args = '') => `shopt${handleArgs(args)} globstar`;

/**
 * GNU bash, version 3.2.57(1)-release (x86_64-apple-darwin15)
 * Copyright (C) 2007 Free Software Foundation, Inc.
 */
export const bashVersion = `bash --version`;

run(shoptNullglob());
run(shoptFailglob());
run(shoptExtglob());
run(shoptGlobstar());
run(bashVersion);

export const executeCommandOnAllFilesInADirectory = path => {
  const p = path || `./*`;

  run(`
shopt globstar
shopt nullglob

shopt -s globstar
shopt -s nullglob

 for file in ./*; do
     cmdToRun [option] -- "$file"
 done

for i in *.js; do echo "hello $i"; done

shopt -u nullglob
`);
};
