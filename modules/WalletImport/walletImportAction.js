export const walletImportActionType = {
  SET_TITLE: 'WALLET_IMPORT_SET_TITLE',
  SET_ADDRESS: 'WALLET_IMPORT_SET_ADDRESS',
  SET_FOCUS_FIELD: 'WALLET_IMPORT_SET_FOCUS_FIELD',
};

export const walletImportAction = {
  setTitle: title => ({ type: walletImportActionType.SET_TITLE, title }),
  setAddress: address => ({ type: walletImportActionType.SET_ADDRESS, address }),
  setFocusField: fieldName => ({ type: walletImportActionType.SET_FOCUS_FIELD, fieldName }),
};
