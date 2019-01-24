import { unlockActionType } from '../unlockAction';

const INITIAL_STATE = {
  animatedValue: 0, //TODO to test in unlock screen animations
  pincode: '',
  pincodeToBeConfirm: '',
};

export const unlockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case unlockActionType.ADD_ONE_PINCODE:
      if (state.pincode.length === 4) {
        return state;
      }
      return {
        ...state,
        pincode: state.pincode + action.key,
      };
    case unlockActionType.RESET_PINCODE:
      return {
        ...state,
        pincode: '',
        pincodeToBeConfirm: '',
      };
    case unlockActionType.SET_PINCODE_TO_BE_CONFIRM:
      return {
        ...state,
        pincodeToBeConfirm: action.pincodeToBeConfirm,
        pincode: '',
      };
    case unlockActionType.DELETE_ONE_PINCODE:
      return {
        ...state,
        pincode: state.pincode.slice(0, -1),
      };
    default:
      return state;
  }
};
