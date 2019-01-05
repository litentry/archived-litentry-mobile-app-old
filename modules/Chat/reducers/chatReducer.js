import { chatActionType } from '../actions/chatAction';

const INITIAL_STATE = {
  connected: false,
  chatList: [],
  chatId: '',
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
    case chatActionType.UPDATE_CHAT_LIST:
      return {
        ...state,
        chatList: action.chatList,
      };
    case chatActionType.SET_ID:
      return {
        ...state,
        userId: action.userId,
      };
    case chatActionType.SUBSCRIBE_CHAT:
      return {
        ...state,
        subscribedChatId: action.chatId,
      };
    default:
      return state;
  }
};
