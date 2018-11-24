import set from 'lodash/fp/set';
import { walletImportActionType } from './walletImportAction';

const INITIAL_STATE = {
  title: ``,
  address: '',
  loading: false,
  finished: false,
  focusField: '',
};

export const walletImportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case walletImportActionType.SET_ADDRESS:
      // return state
      return set('address', action.address, state);
    case walletImportActionType.SET_TITLE:
      return set('title', action.title, state);
    case walletImportActionType.SET_FOCUS_FIELD:
      return set('focusField', action.focusField, state);
    default:
      return state;
  }
};
