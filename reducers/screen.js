import set from 'lodash/fp/set';
import { screenActionType } from '../actions/screenAction';

const INIT_STATE = {
  shouldLockScreen: false,
};

export const screenReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case screenActionType.LOCK_SCREEN:
      return {...state,
        shouldLockScreen: true};
    default:
      return state;
  }
};
