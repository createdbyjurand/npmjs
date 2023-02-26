#!/usr/bin/env node

import {displayInTheMiddle} from '../@shared';
import packageJson from '../package.json' assert {type: 'json'};

displayInTheMiddle(`update-release-version-number.node.mjs version ${packageJson.version}`);
