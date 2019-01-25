import update from 'lodash/fp/update';
import set from 'lodash/fp/set';
import { walletActionType } from '../actions/walletAction';

//we use lodash fp function to create immutable state, refer here
//https://github.com/lodash/lodash/wiki/FP-Guide

const INITIAL_STATE = {
  nes: 0,
  eth: null,
  swtc: 0,
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case walletActionType.TEST_ADD_ETH:
      // return state
      return update('eth', v => v + 1, state);
    case walletActionType.UPDATE_ETH:
      return set('eth', action.eth, state);
    default:
      return state;
  }
};
