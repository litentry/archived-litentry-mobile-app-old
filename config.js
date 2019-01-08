export const environment = {
  disableQRScan: true,
};

export const aboutInfo = {
  appName: 'Genesis Space Client',
  date: '2019-01-30',
  designer: ['历', 'Alex'],
  developer: ['Han', '丁', '傻米'],
  contact: ['nycloud@gmail.com'],
};

export const wsInfo = {
  appName: 'TinodeWeb/0.15.11-rc2',
  // serverAddress: 'dusai.de:6060/webapp-master',
  serverAddress: 'api.tinode.co',
  apiKey: 'AQEAAAABAAD_rAp4DJh05a1HAwFT3A6K',
  isHttps: true,
  // Network transport to use, either `ws`/`wss` for websocket or `lp` for long polling.
  transport: null,
  // one of 'web'/'ios'/'android'
  platform: 'web',
};

export const voteInfo = {
  rulesDescription: '(Join/Quit/Tax/Vote/Status)',
};

export const imageConfig = {
  /** Maximum in-band (included directly into the message) attachment size which fits into
   * a message of 256K in size, assuming base64 encoding and 1024 bytes of overhead.
   * This is size of an object *before* base64 encoding is applied.
   * Increase this limit to a greater value in production, if desired. Also increase
   * max_message_size in server config.
   * MAX_INBAND_ATTACHMENT_SIZE = base64DecodedLen(max_message_size - overhead);**/
  MAX_INBAND_ATTACHMENT_SIZE: 195840,
  /** Maximum allowed linear dimension of an inline image in pixels. You may want
   * to adjust it to 1600 or 2400 for production.**/
  MAX_IMAGE_DIM: 768,
};

export const chatConfig = {
  messagePerPage: 20,
  online_now: {
    id: 'online_now',
    defaultMessage: 'online now',
    description: 'Indicator that the user or topic is currently online',
  },
  last_seen: {
    id: 'last_seen_timestamp',
    defaultMessage: 'Last seen',
    description: 'Label for the timestamp of when the user or topic was last online',
  },
  not_found: {
    id: 'title_not_found',
    defaultMessage: 'Not found',
    description: 'Title shown when topic is not found',
  },
};
