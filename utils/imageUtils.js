// Given length of a base64-encoded object, calculate decoded size of the
// pbject in bytes.

import _ from 'lodash';
import { imageConfig } from '../config';
import Images from '../commons/Images';

export function validateImageSize(n) {
  return Math.floor(n / 4) * 3 < imageConfig.MAX_PHOTO_SIZE;
}

export function renderImageSource(imageBase64Data) {
  return _.isEmpty(imageBase64Data) ? Images.blankProfile : { uri: imageBase64Data };
}
