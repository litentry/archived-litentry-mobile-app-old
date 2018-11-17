import {walletActionType} from "../actions/wallet";
import update from 'lodash/fp/update';

//we use lodash fp function to create immutable state, refer here
//https://github.com/lodash/lodash/wiki/FP-Guide

const INITIAL_STATE = {
  nes: 0,
  eth: 0,
  swtc: 0,
};

const reducer = (state = INITIAL_STATE , action) => {
  switch (action.type) {
    case walletActionType.TEST_ADD_ETH:
      // return state
      return update('eth', v => v+1 ,state)
    default:
      return state
  }
};

export default reducer