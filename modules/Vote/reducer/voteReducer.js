import _ from 'lodash';
import { voteActionType } from '../voteAction';

const INIT_VALUE = {
  origin: {},
  cached: {},
};

export const voteReducer = (state = INIT_VALUE, action) => {
  switch (action.type) {
    case voteActionType.INIT:
      return {
        ...state,
        origin: action.data,
        cached: action.data,
      };
    case voteActionType.SET: {
      return {
        ...state,
        cached: _.assign({}, state.origin, action.data),
      };
    }
    case voteActionType.RESET: {
      return {
        ...state,
        cached: state.origin,
      };
    }
    case voteActionType.SUBMITED: {
      return {
        ...state,
        origin: state.cached,
      };
    }
    default:
      return state;
  }
};
