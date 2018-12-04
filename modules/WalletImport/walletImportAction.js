export const walletImportActionType = {
  SET_TITLE: 'WALLET_IMPORT_SET_TITLE',
  SET_PRIVATE_KEY: 'WALLET_IMPORT_SET_PRIVATE_KEY',
  SET_FOCUS_FIELD: 'WALLET_IMPORT_SET_FOCUS_FIELD',
};

export const walletImportAction = {
  setTitle: title => ({ type: walletImportActionType.SET_TITLE, title }),
  setPrivateKey: privateKey => ({ type: walletImportActionType.SET_PRIVATE_KEY, privateKey }),
  setFocusField: focusField => ({ type: walletImportActionType.SET_FOCUS_FIELD, focusField }),
};
