export const unlockActionType = {
  ON_KEY_PRESS: 'UNLOCK_ON_KEY_PRESS',
  RESET_PINCODE: 'UNLOCK_RESET_PINCODE',
  SET_PINCODE_TO_BE_CONFIRM: 'UNLOCK_SET_PINCODE_TO_BE_CONFIRM',
  DELETE_ONE_PINCODE: 'UNLOCK_DELETE_ONE_PINCODE',
};

export const unlockAction = {
  onKeyPress: key => ({ type: unlockActionType.ON_KEY_PRESS, key }),
  resetPincode: key => ({ type: unlockActionType.RESET_PINCODE }),
  setPincodeToBeConfirm: pincodeToBeConfirm => ({
    type: unlockActionType.SET_PINCODE_TO_BE_CONFIRM,
    pincodeToBeConfirm,
  }),
  deleteOnePincode: () => ({ type: unlockActionType.DELETE_ONE_PINCODE }),
};
