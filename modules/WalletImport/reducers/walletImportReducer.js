import set from 'lodash/fp/set';
import { walletImportActionType } from '../walletImportAction';

const INITIAL_STATE = {
  privateKey: '',
  finished: false,
};

export const walletImportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case walletImportActionType.SET_PRIVATE_KEY:
      // return state
      return set('privateKey', action.privateKey, state);
    default:
      return state;
  }
};
