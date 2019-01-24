import util from 'ethereumjs-util';
import { Wallet } from 'ethers';

const path = "m/44'/60'/0'/0/index";

export const getPublicKeyFromPrivateKey = privateKey => {
  if (privateKey.indexOf('0x') === 0) {
    privateKey = privateKey.slice(2);
  }
  const privateBuffer = global.Buffer.from(privateKey, 'hex');
  if (!util.isValidPrivate(privateBuffer)) return false;

  try {
    return new Wallet(privateKey);
  } catch (e) {
    console.log(t.WALLET_ERROR, e);
    return false;
  }
};

export const getPublicKeyFromMnemonic = mnemonic => {
  mnemonic = mnemonic.trim();
  if (mnemonic.split(' ').length !== 12) return false;
  try {
    return Wallet.fromMnemonic(mnemonic);
  } catch (e) {
    console.log(t.WALLET_ERROR, e);
    return false;
  }
};

const t = {
  WALLET_ERROR: '[Wallet Create Error in EthereumUtils.js]:',
};
