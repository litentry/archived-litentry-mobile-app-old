import { chatActionType } from '../chatAction';

const INITIAL_STATE = {
  connected: false,
  chatList: [],
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
      }
    default:
      return state;
  }
};
