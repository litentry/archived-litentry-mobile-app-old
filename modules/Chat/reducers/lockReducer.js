import _ from 'lodash';
import set from 'lodash/fp/set';
import { lockActionType } from '../actions/lockAction';

const INITIAL_STATE = {
  locksMap: {},
};

export const lockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case lockActionType.UPDATE_LOCKS_MAP: {
      const topicId = action.data.id;
      return {
        ...state,
        locksMap: set(topicId, action.data, state.locksMap),
      };
    }
    case lockActionType.UNSUBSCRIBE_CHAT:
      return {
        ...state,
        locksMap: set(
          action.chatId,
          {
            isSubscribed: false,
            seq: -1,
          },
          state.locksMap
        ),
      };

    default:
      return state;
  }
};
