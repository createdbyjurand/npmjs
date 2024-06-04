#!/usr/bin/env node

import crypto from 'crypto';
import fs from 'fs';
import imageSize from 'image-size';
import {
  argumentWithValueExists,
  display,
  displayArguments,
  displayHeaderCBJ,
  displayInTheMiddle,
  displayJSON,
  displayLogoCBJ,
  displayValue,
  getArgumentValueOrCrash,
  isImage,
  throwError,
} from '../@shared/index.node.mjs';
import packageJson from '../package.json' assert {type: 'json'};

displayInTheMiddle(`update-assets.node.mjs version ${packageJson.version}`);

displayLogoCBJ();
displayHeaderCBJ();

display('');
displayArguments(process.argv);

const source = getArgumentValueOrCrash(process.argv, 'source'); // src/assets || public
const target = getArgumentValueOrCrash(process.argv, 'target'); // src/app/db/assets.json || src/app/db/assets.ts

const variable_exists = argumentWithValueExists(process.argv, 'variable');
const variable = variable_exists ? getArgumentValueOrCrash(process.argv, 'variable') : null;

const thumb_width_exists = argumentWithValueExists(process.argv, 'thumb_width');
const thumb_height_exists = argumentWithValueExists(process.argv, 'thumb_height'); // 170

if (thumb_width_exists && thumb_height_exists)
  throwError('Only thumb_width or thumb_height can be specified, not both');
else if (!thumb_width_exists && !thumb_height_exists) throwError('thumb_width or thumb_height has to be specified');

const thumb_width = thumb_width_exists ? +getArgumentValueOrCrash(process.argv, 'thumb_width') : null;
const thumb_height = thumb_height_exists ? +getArgumentValueOrCrash(process.argv, 'thumb_height') : null;

const dirSync = fs.readdirSync(source, {
  withFileTypes: true,
  recursive: true,
});

const assetsJson = {};

for (const [i, dirEnt] of dirSync.entries()) {
  if (!dirEnt.isDirectory() && dirEnt.path !== source && isImage(dirEnt.name)) {
    // https://github.com/image-size/image-size
    const dimensions = imageSize(`${dirEnt.path}\\${dirEnt.name}`);
    const relativePath = dirEnt.path.split('\\').join('/');
    const src = `${relativePath.replace(/^src\//g, '')}/${dirEnt.name}`;
    const folder = relativePath.replace(source + '/', '');
    const folderParts = folder.split('/');

    const element = {
      src,
      width: dimensions.width,
      height: dimensions.height,
      thumbWidth: thumb_height_exists ? Math.round((dimensions.width * thumb_height) / dimensions.height) : thumb_width,
      thumbHeight: thumb_height_exists
        ? thumb_height
        : Math.round((dimensions.height * thumb_width) / dimensions.width),
      id: i,
      name: dirEnt.name,
      folder,
      hash: crypto
        .createHash('sha256')
        .update(fs.readFileSync(`${relativePath}/${dirEnt.name}`))
        .digest('hex'),
    };

    let currentObject = assetsJson;
    folderParts.reduce((acc, part) => {
      if (!acc[part]) acc[part] = {};
      return acc[part];
    }, currentObject)[dirEnt.name] = element;
  }
}

displayJSON(assetsJson, 'assets');

const extension = target.split('.').pop();
display('');
displayValue('extension', extension);

if (extension === 'json') {
  /**
   * JSON.stringify(parsedReleaseVersionNumberJson, null, 4);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 4 - represents the spaces to indent.
   */
  const stringified = JSON.stringify(assetsJson, null, 4);
  fs.writeFileSync(target, stringified, 'utf-8');
} else if (
  extension === 'ts' ||
  extension === 'js' ||
  extension === 'mjs' ||
  extension === 'cjs' ||
  extension === 'tsx' ||
  extension === 'jsx'
) {
  /**
   * JSON.stringify(parsedReleaseVersionNumberJson, null, 4);
   * @param null - represents the replacer function. (in this case we don't want to alter the process)
   * @param 4 - represents the spaces to indent.
   */
  const stringified = JSON.stringify(assetsJson, null, 2);
  const srcDir = source.split('/').pop();
  const ts = `export const ${variable || srcDir} = ${stringified}`;
  fs.writeFileSync(target, ts, 'utf-8');
}

display('');
display('update-assets.node.mjs script reached end', '[  DONE  ]');
