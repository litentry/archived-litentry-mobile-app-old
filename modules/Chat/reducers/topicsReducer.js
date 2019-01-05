import set from 'lodash/fp/set';
import _ from 'lodash';
import concat from 'lodash/fp/concat';
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
    case topicsActionType.UPDATE_TOPIC_TITLE: {
      const updateName = topicsMap =>
        set(`${action.topicName}.title`, action.topicTitle, topicsMap);
      const updateAvatar = topicsMap =>
        set(`${action.topicName}.avatar`, action.topicAvatar, topicsMap);
      const topicsMap = updateAvatar(updateName(state.topicsMap));
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
    default:
      return state;
  }
};
