import update from 'lodash/fp/update';
import { walletImportActionType } from './walletImportAction';

const INITIAL_STATE = {
  customTitle: ``,
  walletAddress: '',
  loading: false,
  finished: false,
  focusField: '',
};

export const walletImportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case walletImportActionType.SET_TITLE:
      // return state
      return update('eth', v => v + 1, state);
    default:
      return state;
  }
};
