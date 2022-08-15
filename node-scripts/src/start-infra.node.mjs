import {display, displayInTheMiddle, run} from './@shared/index.node.mjs';

displayInTheMiddle('start-infra.node.mjs version 2.0.1');

process.chdir('../../../../../../../wpfe-infra/global-router/local');
// run('dir /b');
// run('git status');
// run('git remote update');
// run('git status');
// run('git pull');
// run('git status');
// run('mvn clean install -U -DskipTests -T 1C');
run('npm run start');

display('Script ended', '[  DONE  ]');
