import set from 'lodash/fp/set';
import _ from 'lodash';
import { topicsActionType } from '../actions/topicsAction';

const INITIAL_STATE = {
  topicsMap: {},
};

export const topicsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case topicsActionType.UPDATE_TOPIC_MESSAGES: {
      const topicMessages = action.topicMessages;
      // const topicMessages = concat(action.topicMessages, existMessages)
      const topicsMap = set(`${action.topicName}.messages`, topicMessages, state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    //first fetch function to be called in the app
    case topicsActionType.UPDATE_TOPIC_META: {
      const initTopicData = { userInput: '', messages: [] };
      const newTopicData = _.merge(
        {},
        _.get(state.topicsMap, action.topicName, initTopicData),
        action.topicData
      );
      const topicsMap = set(action.topicName, newTopicData, state.topicsMap);
      console.log('topics map is', topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    case topicsActionType.UPDATE_TOPIC_SUBS: {
      const topicsMap = set(`${action.topicName}.subs`, action.topicSubs, state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    case topicsActionType.UPDATE_TOPIC_USER_INPUT: {
      const topicsMap = set(`${action.topicName}.userInput`, action.userInput, state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    default:
      return state;
  }
};
