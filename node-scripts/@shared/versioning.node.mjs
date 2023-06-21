import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`versioning.node.mjs version  1.0.0`);

/////////////////////////// VERSION UPDATERS ///////////////////////////

/**
 * @param {string | number} version
 * @param {string | number} setVersion
 * @returns {string}
 */
export const increaseOrSetVersion = (version, setVersion = '') => {
  const prefixEnd = version.search(/\d/);
  const postfixStart = version.search(/\D/);

  let prefix = '';
  let postfix = '';
  let sliceStart = 0;
  let sliceEnd = version.length;
  let versionNumber = '';

  if (prefixEnd > 0) {
    prefix = version.slice(0, prefixEnd);
    sliceStart = prefixEnd;
  }

  if (postfixStart > 0) {
    postfix = version.slice(postfixStart);
    sliceEnd = postfixStart;
  }

  if (setVersion !== '') {
    versionNumber = setVersion;
  } else {
    versionNumber = +version.slice(sliceStart, sliceEnd) + 1;
  }

  return `${prefix}${versionNumber}${postfix}`;
};

export const increaseMajorVersion = version => {
  const splitVersion = version.split('.');

  splitVersion[0] = increaseOrSetVersion(splitVersion[0]);
  splitVersion[1] = increaseOrSetVersion(splitVersion[1], 0);
  splitVersion[2] = increaseOrSetVersion(splitVersion[2], 0);

  return splitVersion.join('.');
};

export const increaseMinorVersion = version => {
  const splitVersion = version.split('.');

  splitVersion[1] = increaseOrSetVersion(splitVersion[1]);
  splitVersion[2] = increaseOrSetVersion(splitVersion[2], 0);

  return splitVersion.join('.');
};

export const increasePatchVersion = version => {
  const splitVersion = version.split('.');

  splitVersion[2] = increaseOrSetVersion(splitVersion[2]);

  return splitVersion.join('.');
};
