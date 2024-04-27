import {displayInTheMiddle} from './display.node.mjs';

displayInTheMiddle(`images.node.mjs version 1.0.0`);

export const isImage = fileName => {
  const fileExtension = fileName.slice(fileName.lastIndexOf('.') + 1);
  const imageSizeSupportedFormats = [
    'BMP',
    'CUR',
    'DDS',
    'GIF',
    'ICNS',
    'ICO',
    'J2C',
    'JP2',
    'JPEG',
    'JPG',
    'KTX',
    'PAM',
    'PBM',
    'PFM',
    'PGM',
    'PNG',
    'PNM',
    'PPM',
    'PSD',
    'SVG',
    'TGA',
    'TIF',
    'TIFF',
    'WebP',
  ];
  for (const supportedFormat of imageSizeSupportedFormats) {
    if (
      fileExtension.localeCompare(supportedFormat, undefined, {
        sensitivity: 'base',
      }) === 0
    )
      return true;
  }
  return false;
};
