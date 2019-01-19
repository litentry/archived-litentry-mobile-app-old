import walletUtils from 'ethereumjs-wallet';

export const getPublicKey = (privateKey) => {
  const wallet = walletUtils.fromPrivateKey(privateKey)
  return wallet.getPublicKeyString()
}