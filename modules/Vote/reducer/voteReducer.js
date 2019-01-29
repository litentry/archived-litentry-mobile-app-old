import _ from 'lodash';
import { voteActionType } from '../voteAction';

const INIT_VALUE = {
  origin: {
    // Information extracted from topic
    countryName: 'New Country',
    description: 'A brand new country.',
    profile: {},

    // Information related to smart contract
    economicRule: 'Standard plan',
    treasury: '1000',
    requiredApproved: 50,
    requiredHour: 168,
    groupWebsitePrefix: 'Https://www.bacaoke.com/',
    entryCost: 100,
    exitCost: 50,
    voteCost: 1000,
    memberRules: {
      default: [150, 150, 10, 1, 1],
    },
  },
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
        cached: _.merge({}, state.origin, action.data),
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
