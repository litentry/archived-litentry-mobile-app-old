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
    case topicsActionType.UPDATE_TOPIC_META: {
      const updateName = topicsMap =>
        set(`${action.topicName}.public.fn`, action.topicTitle, topicsMap);
      const updateAvatar = topicsMap =>
        set(`${action.topicName}.public.photo`, action.topicAvatar, topicsMap);
      const updateDescription = topicsMap =>
        set(`${action.topicName}.private.comment`, action.description, topicsMap)
      const updateFunction = _.flow(
        updateDescription,
        updateAvatar,
        updateName,
      )
      const topicsMap = updateFunction(state.topicsMap);
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
