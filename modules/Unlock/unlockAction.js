export const unlockActionType = {
  ADD_ONE_PINCODE: 'UNLOCK_ADD_ONE_PINCODE',
  RESET_PINCODE: 'UNLOCK_RESET_PINCODE',
  SET_PINCODE_TO_BE_CONFIRM: 'UNLOCK_SET_PINCODE_TO_BE_CONFIRM',
  DELETE_ONE_PINCODE: 'UNLOCK_DELETE_ONE_PINCODE',
};

export const unlockAction = {
  addOnePincode: key => ({ type: unlockActionType.ADD_ONE_PINCODE, key }),
  resetPincode: () => ({ type: unlockActionType.RESET_PINCODE }),
  setPincodeToBeConfirm: pincodeToBeConfirm => ({
    type: unlockActionType.SET_PINCODE_TO_BE_CONFIRM,
    pincodeToBeConfirm,
  }),
  deleteOnePincode: () => ({ type: unlockActionType.DELETE_ONE_PINCODE }),
};
