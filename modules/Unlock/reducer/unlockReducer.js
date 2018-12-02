import set from 'lodash/fp/set';
import { unlockActionType } from '../unlockAction';

const INITIAL_STATE = {
  animatedValue: 0,
  pincode: [],
  pinConfirm: '',
};

export const unlockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case unlockActionType.SET_PRIVATE_KEY:
      // return state
      return set('privateKey', action.privateKey, state);
    case unlockActionType.ON_KEY_PRESS:
      if (state.pincode.length === 6) {
        return state
      }
      const pinData = state.pincode + action.key
    default:
      return state;
  }
};
