export const walletImportActionType = {
  SET_PRIVATE_KEY: 'WALLET_IMPORT_SET_PRIVATE_KEY',
};

export const walletImportAction = {
  setPrivateKey: privateKey => ({ type: walletImportActionType.SET_PRIVATE_KEY, privateKey }),
};
