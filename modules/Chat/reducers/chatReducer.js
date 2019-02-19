import _ from 'lodash';
import set from 'lodash/fp/set';
import { chatActionType } from '../actions/chatAction';

const INITIAL_STATE = {
  locksMap: {},
};

export const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chatActionType.UPDATE_LOCKS_MAP: {
      const topicId = action.data.id;
      return {
        ...state,
        locksMap: set(topicId, action.data, state.locksMap),
      };
    }
    case chatActionType.UNSUBSCRIBE_CHAT:
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
