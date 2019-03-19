import request from 'request';

const util = require('ethereumjs-util');
let privateKey = '0x8fc43c1919a58f1baf255c8a3ac93e439adbce42816601b80862c584c725e0e6';
let mnenomic = [
  'culture',
  'auction',
  'casino',
  'hammer',
  'rotate',
  'together',
  'slide',
  'pen',
  'narrow',
  'lucky',
  'suit',
  'cream',
];

const options = {
  url: 'http://139.198.191.254:7545',
  method: 'post',
  json: {
    jsonrpc: '2.0',
    method: 'jt_getBalance',
    params: ['j9VSrHSiZPiJBPUS6iwYiT8yfy8iFbeR4E', 'validated'],
    id: 1,
  },
};

export const testScript = () => {
  request(options, (err, result)=> {
    console.log('err', err, 'result', result)
  })
  // console.log('address is', getPublicKeyFromMnemonic(mnenomic))
};
