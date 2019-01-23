const util = require('ethereumjs-util')
let privateKey = '0x8fc43c1919a58f1baf255c8a3ac93e439adbce42816601b80862c584c725e0e6'
import {getPublicKeyFromPrivateKey} from "./utils/ethereumUtils";

export const testScript = () => {
  console.log('address is', getPublicKeyFromPrivateKey(privateKey))
}
