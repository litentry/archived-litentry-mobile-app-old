import update from 'lodash/fp/update';
import flow from 'lodash/fp/flow';
import { topicsActionType } from '../actions/topicsAction';

const INITIAL_STATE = {
  topicsMap: {},
};

export const topicsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case topicsActionType.UPDATE_TOPIC_MESSAGES: {
      const topicsMap = update(
        `${action.topicName}.messages`,
        action.topicMessages,
        state.topicsMap
      );
      return {
        ...state,
        topicsMap,
      };
    }
    case topicsActionType.UPDATE_TOPIC_TITLE: {
      const updateName = topicsMap =>
        update(`${action.topicName}.title`, action.topicTitle, topicsMap);
      const updateAvatar = topicsMap =>
        update(`${action.topicName}.avatar`, action.topicAvatar, topicsMap);
      const topicsMap = flow(
        updateName,
        updateAvatar
      )(state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    case topicsActionType.UPDATE_TOPIC_SUBS: {
      const topicsMap = update(`${action.topicName}.subs`, action.topicSubs, state.topicsMap);
      return {
        ...state,
        topicsMap,
      };
    }
    default:
      return state;
  }
};
