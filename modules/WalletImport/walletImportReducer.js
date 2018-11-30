import set from 'lodash/fp/set';
import { walletImportActionType } from './walletImportAction';

const INITIAL_STATE = {
  title: ``,
  privateKey: '',
  loading: false,
  finished: false,
  focusField: '',
};

export const walletImportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case walletImportActionType.SET_PRIVATE_KEY:
      // return state
      return set('privateKey', action.privateKey, state);
    case walletImportActionType.SET_TITLE:
      return set('title', action.title, state);
    case walletImportActionType.SET_FOCUS_FIELD:
      return set('focusField', action.focusField, state);
    default:
      return state;
  }
};
