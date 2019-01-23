import util from 'ethereumjs-util'

const path = "m/44'/60'/0'/0/index";

export const getPublicKeyFromPrivateKey = privateKey => {
  if (privateKey.indexOf('0x') === 0) {
    privateKey = privateKey.slice(2)
  }
  const privateBuffer = Buffer.from(privateKey, 'hex')
  if( !util.isValidPrivate(privateBuffer))
    return false
  const publicKeyBuffer = util.privateToAddress(privateBuffer);
  return util.bufferToHex(publicKeyBuffer)
};

export const getPublicKeyFromMnemonic = mnemonic => {

}
