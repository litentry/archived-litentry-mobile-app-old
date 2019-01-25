import { update, set } from 'lodash/fp';
import _ from 'lodash';
import { walletActionType } from '../actions/walletAction';

//we use lodash fp function to create immutable state, refer here
//https://github.com/lodash/lodash/wiki/FP-Guide

const INITIAL_STATE = {
  nes: null,
  eth: null,
};

export const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case walletActionType.TEST_ADD_ETH:
      return update('eth', v => v + 1, state);
    case walletActionType.UPDATE_ETH:
      return set('eth', action.eth, state);
    case walletActionType.UPDATE_NES:
      return set('nes', action.nes, state);
    case walletActionType.UPDATE_BALANCES:
      return _.merge(state, action.balances);
    default:
      return state;
  }
};
