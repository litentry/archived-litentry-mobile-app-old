// Given length of a base64-encoded object, calculate decoded size of the
// pbject in bytes.

import _ from 'lodash';
import { imageConfig } from '../config';
import Images from '../commons/Images';
import { makeImageUrl } from '../modules/Chat/lib/blob-helpers';

export function validateImageSize(imageBase64DataLength) {
  return Math.floor(imageBase64DataLength / 4) * 3 < imageConfig.MAX_PHOTO_SIZE;
}

export function renderImageSource(imageObject) {
  return _.isEmpty(imageObject) ? Images.blankProfile : { uri: makeImageUrl(imageObject) };
}
