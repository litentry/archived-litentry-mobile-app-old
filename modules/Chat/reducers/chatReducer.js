import _ from 'lodash';
import set from 'lodash/fp/set';
import { chatActionType } from '../actions/chatAction';

const INITIAL_STATE = {
  connected: false,
  chatMap: {},
  userId: '',
  userInfo: {
    name: '',
    avatar: '',
  },
  rawPublicData: {},
  subscribedChatId: null,
};

export const chatReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case chatActionType.LOGIN: {
      return state;
    }
    case chatActionType.CONNECTED:
      return {
        ...state,
        connected: true,
      };
    case chatActionType.UPDATE_CHAT_MAP: {
      const topicId = action.data.topic || action.data.name;
      const oldSeq = _.get(state.chatMap, `${topicId}.seq`, -1);
      const currentSeq = _.get(action.data, 'seq', -1);
      if (currentSeq < oldSeq) {
        return state;
      } else {
        action.data.isSubscribed = currentSeq > -1;
        return {
          ...state,
          chatMap: set(topicId, action.data, state.chatMap),
        };
      }
    }
    case chatActionType.SET_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case chatActionType.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
        rawPublicData: action.rawPublicData,
      };
    case chatActionType.SUBSCRIBE_CHAT:
      return {
        ...state,
        subscribedChatId: action.chatId,
      };
    case chatActionType.UNSUBSCRIBE_CHAT:
      return {
        ...state,
        chatMap: set(
          action.chatId,
          {
            isSubscribed: false,
            seq: -1,
          },
          state.chatMap
        ),
      };

    default:
      return state;
  }
};
